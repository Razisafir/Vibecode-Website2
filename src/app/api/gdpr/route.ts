import { NextRequest, NextResponse } from 'next/server';
import { getSubmissionsByEmail, deleteSubmissionsByEmail } from '@/lib/db';
import { decryptSubmission } from '@/lib/encryption';

// POST - Request data export (GDPR right to access)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required.' },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email address.' },
                { status: 400 }
            );
        }

        // Retrieve all submissions for this email
        const submissions = getSubmissionsByEmail(email);

        // Decrypt data for the user
        const decryptedSubmissions = submissions.map(sub => ({
            id: sub.id,
            type: sub.type,
            data: decryptSubmission(JSON.parse(sub.data)),
            createdAt: sub.created_at,
        }));

        return NextResponse.json({
            success: true,
            email,
            submissions: decryptedSubmissions,
            count: decryptedSubmissions.length,
        });
    } catch (error) {
        console.error('GDPR data export error:', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred. Please try again.' },
            { status: 500 }
        );
    }
}

// DELETE - Request data deletion (GDPR right to be forgotten)
export async function DELETE(request: NextRequest) {
    try {
        const body = await request.json();
        const { email } = body;

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required.' },
                { status: 400 }
            );
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email address.' },
                { status: 400 }
            );
        }

        const deletedCount = deleteSubmissionsByEmail(email);

        return NextResponse.json({
            success: true,
            email,
            deletedCount,
            message: `All data associated with ${email} has been deleted.`,
        });
    } catch (error) {
        console.error('GDPR data deletion error:', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred. Please try again.' },
            { status: 500 }
        );
    }
}
