import { NextRequest, NextResponse } from 'next/server';
import { insertSubmission, checkRateLimit, recordRateLimit } from '@/lib/db';
import { encryptSubmission } from '@/lib/encryption';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email } = body;

        // Validate required fields
        if (!email) {
            return NextResponse.json(
                { error: 'Email is required.' },
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

        // Check rate limit (3 per hour for newsletter)
        if (!checkRateLimit(email, 'newsletter', 3)) {
            return NextResponse.json(
                { error: 'Rate limit exceeded. Please try again later.' },
                { status: 429 }
            );
        }

        // Encrypt sensitive data
        const encryptedData = encryptSubmission({ email });

        // Store in SQLite
        const id = insertSubmission('newsletter', encryptedData, email);
        recordRateLimit(email, 'newsletter');

        return NextResponse.json(
            { success: true, id, message: 'You have been subscribed to our newsletter!' },
            { status: 201 }
        );
    } catch (error) {
        console.error('Newsletter subscription error:', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred. Please try again.' },
            { status: 500 }
        );
    }
}
