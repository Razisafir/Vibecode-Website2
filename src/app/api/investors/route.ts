import { NextRequest, NextResponse } from 'next/server';
import { insertSubmission, checkRateLimit, recordRateLimit } from '@/lib/db';
import { encryptSubmission } from '@/lib/encryption';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, company, investmentRange, message, accredited } = body;

        // Validate required fields
        if (!name || !email) {
            return NextResponse.json(
                { error: 'Name and email are required.' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email address.' },
                { status: 400 }
            );
        }

        // Check rate limit (2 per hour for investors)
        if (!checkRateLimit(email, 'investors', 2)) {
            return NextResponse.json(
                { error: 'Rate limit exceeded. Please try again later.' },
                { status: 429 }
            );
        }

        // Encrypt sensitive data
        const encryptedData = encryptSubmission({
            name,
            email,
            company: company || '',
            investmentRange: investmentRange || '',
            message: message || '',
            accredited: accredited || false,
        });

        // Store in SQLite
        const id = insertSubmission('investors', encryptedData, email);
        recordRateLimit(email, 'investors');

        return NextResponse.json(
            { success: true, id, message: 'Thank you for your interest. Our investor relations team will contact you.' },
            { status: 201 }
        );
    } catch (error) {
        console.error('Investors submission error:', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred. Please try again.' },
            { status: 500 }
        );
    }
}
