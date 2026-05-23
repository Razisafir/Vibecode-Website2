import { NextRequest, NextResponse } from 'next/server';
import { insertSubmission, checkRateLimit, recordRateLimit } from '@/lib/db';
import { encryptSubmission } from '@/lib/encryption';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, subject, message } = body;

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Name, email, and message are required.' },
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

        // Check rate limit (5 per hour for contact)
        if (!checkRateLimit(email, 'contact', 5)) {
            return NextResponse.json(
                { error: 'Rate limit exceeded. Please try again later.' },
                { status: 429 }
            );
        }

        // Encrypt sensitive data
        const encryptedData = encryptSubmission({ name, email, subject, message });

        // Store in SQLite
        const id = insertSubmission('contact', encryptedData, email);
        recordRateLimit(email, 'contact');

        return NextResponse.json(
            { success: true, id, message: 'Thank you for your message. We will get back to you soon!' },
            { status: 201 }
        );
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred. Please try again.' },
            { status: 500 }
        );
    }
}
