import { NextRequest, NextResponse } from 'next/server';
import { getSubmissionStats, getRecentSubmissions, getTotalSubmissionCount } from '@/lib/db';
import { decryptSubmission } from '@/lib/encryption';

const ADMIN_API_KEY = process.env.ADMIN_API_KEY || 'vibecode-admin-change-me';

export async function GET(request: NextRequest) {
    try {
        // Verify admin API key
        const apiKey = request.headers.get('x-admin-api-key') || request.headers.get('authorization')?.replace('Bearer ', '');
        
        if (!apiKey || apiKey !== ADMIN_API_KEY) {
            return NextResponse.json(
                { error: 'Unauthorized. Valid API key required.' },
                { status: 401 }
            );
        }

        // Get stats
        const stats = getSubmissionStats();
        const total = getTotalSubmissionCount();

        // Get recent submissions with decrypted data
        const recentEncrypted = getRecentSubmissions(10);
        const recent = recentEncrypted.map(sub => ({
            id: sub.id,
            type: sub.type,
            email: sub.email,
            data: decryptSubmission(JSON.parse(sub.data)),
            createdAt: sub.created_at,
        }));

        return NextResponse.json({
            success: true,
            stats,
            total,
            recent,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('Admin stats error:', error);
        return NextResponse.json(
            { error: 'An unexpected error occurred.' },
            { status: 500 }
        );
    }
}
