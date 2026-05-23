import { NextResponse } from 'next/server';
import { getTotalSubmissionCount, cleanupRateLimits } from '@/lib/db';

export async function GET() {
    try {
        const totalSubmissions = getTotalSubmissionCount();
        
        // Clean up old rate limit records on health check
        const cleanedUp = cleanupRateLimits();

        return NextResponse.json({
            status: 'healthy',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            database: {
                connected: true,
                totalSubmissions,
            },
            rateLimitsCleaned: cleanedUp,
            version: '1.0.0',
        });
    } catch (error) {
        console.error('Health check error:', error);
        return NextResponse.json(
            {
                status: 'unhealthy',
                timestamp: new Date().toISOString(),
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 503 }
        );
    }
}
