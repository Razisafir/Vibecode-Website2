import { NextRequest, NextResponse } from 'next/server';
import { insertSubmission, checkRateLimit, recordRateLimit } from '@/lib/db';
import { encryptSubmission } from '@/lib/encryption';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, position, resume, linkedin, portfolio, coverLetter } = body;

        // Validate required fields
        if (!name || !email || !position) {
            return NextResponse.json(
                { error: 'Name, email, and position are required.' },
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

        // Check rate limit (3 per hour for careers)
        if (!checkRateLimit(email, 'careers', 3)) {
            return NextResponse.json(
                { error: 'Rate limit exceeded. Please try again later.' },
                { status: 429 }
            );
        }

        // Encrypt sensitive data
        const encryptedData = encryptSubmission({
            name,
            email,
            position,
            resume: resume || '',
            linkedin: linkedin || '',
            portfolio: portfolio || '',
            coverLetter: coverLetter || '',
        });

        // Store in SQLite
        const id = insertSubmission('careers', encryptedData, email);
        recordRateLimit(email, 'careers');

        return NextResponse.json(
            { success: true, id, message: 'Your application has been submitted. We will review it shortly.' },
            { status: 201 }
        );
    } catch (error) {
        console.error('Careers submission error:', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred. Please try again.' },
            { status: 500 }
        );
    }
}
