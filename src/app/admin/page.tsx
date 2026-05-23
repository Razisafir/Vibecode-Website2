'use client';

import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HealthStatus {
    status: string;
    timestamp: string;
    uptime: number;
    database: { connected: boolean; totalSubmissions: number };
    version: string;
}

interface SubmissionStats {
    stats: Record<string, number>;
    total: number;
    recent: Array<{
        id: number;
        type: string;
        email: string;
        data: Record<string, unknown>;
        createdAt: string;
    }>;
    timestamp: string;
}

function getStoredKey(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('vibecode-admin-key');
}

export default function AdminPage() {
    const [authenticated, setAuthenticated] = useState(() => !!getStoredKey());
    const [apiKey, setApiKey] = useState(() => getStoredKey() || '');
    const [health, setHealth] = useState<HealthStatus | null>(null);
    const [stats, setStats] = useState<SubmissionStats | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchHealth = useCallback(async () => {
        try {
            const res = await fetch('/api/health');
            const data = await res.json();
            setHealth(data);
        } catch {
            setHealth({ status: 'error', timestamp: new Date().toISOString(), uptime: 0, database: { connected: false, totalSubmissions: 0 }, version: 'unknown' });
        }
    }, []);

    const fetchStats = useCallback(async (key: string) => {
        if (!key) return;
        setLoading(true);
        setError('');
        try {
            const res = await fetch('/api/admin/stats', {
                headers: { 'x-admin-api-key': key },
            });
            if (!res.ok) {
                throw new Error('Failed to fetch stats. Check your API key.');
            }
            const data = await res.json();
            setStats(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch stats');
        } finally {
            setLoading(false);
        }
    }, []);

    const handleRefresh = useCallback(() => {
        void fetchHealth();
        void fetchStats(apiKey);
    }, [fetchHealth, fetchStats, apiKey]);

    const handleLogin = () => {
        const trimmed = apiKey.trim();
        if (trimmed) {
            localStorage.setItem('vibecode-admin-key', trimmed);
            setApiKey(trimmed);
            setAuthenticated(true);
            // Fetch data after login
            setTimeout(() => {
                void fetchHealth();
                void fetchStats(trimmed);
            }, 0);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('vibecode-admin-key');
        setApiKey('');
        setAuthenticated(false);
        setStats(null);
        setHealth(null);
    };

    const formatUptime = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        return `${hrs}h ${mins}m`;
    };

    // Auto-fetch on mount if already authenticated
    if (authenticated && !health) {
        void fetchHealth();
    }
    if (authenticated && !stats && !loading) {
        void fetchStats(apiKey);
    }

    // Login screen
    if (!authenticated) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
                <Card className="w-full max-w-md bg-gray-900 border-gray-800">
                    <CardHeader>
                        <CardTitle className="text-white text-center">VibeCode Admin</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Input
                            type="password"
                            placeholder="Enter Admin API Key"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                            className="bg-gray-800 border-gray-700 text-white"
                        />
                        <Button onClick={handleLogin} className="w-full bg-emerald-600 hover:bg-emerald-700">
                            Login
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white p-4 md:p-8">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-white">VibeCode Admin Dashboard</h1>
                        <p className="text-gray-400 text-sm">Monitoring &amp; Management</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm" onClick={handleRefresh} className="border-gray-700 text-gray-300 hover:text-white">
                            Refresh
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleLogout} className="border-gray-700 text-gray-300 hover:text-white">
                            Logout
                        </Button>
                    </div>
                </div>

                {/* System Health */}
                <Card className="bg-gray-900 border-gray-800">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg text-white flex items-center gap-2">
                            <span className={`inline-block w-3 h-3 rounded-full ${health?.status === 'healthy' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                            System Health
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {health ? (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                    <p className="text-gray-400 text-xs uppercase tracking-wider">Status</p>
                                    <Badge variant={health.status === 'healthy' ? 'default' : 'destructive'} className={health.status === 'healthy' ? 'bg-emerald-600' : ''}>
                                        {health.status}
                                    </Badge>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs uppercase tracking-wider">Uptime</p>
                                    <p className="text-white font-mono">{formatUptime(health.uptime)}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs uppercase tracking-wider">Database</p>
                                    <Badge variant={health.database.connected ? 'default' : 'destructive'} className={health.database.connected ? 'bg-emerald-600' : ''}>
                                        {health.database.connected ? 'Connected' : 'Disconnected'}
                                    </Badge>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs uppercase tracking-wider">Version</p>
                                    <p className="text-white font-mono">{health.version}</p>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-500">Loading health data...</p>
                        )}
                    </CardContent>
                </Card>

                {/* Submission Stats */}
                <Card className="bg-gray-900 border-gray-800">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg text-white">Submission Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading && !stats ? (
                            <p className="text-gray-500">Loading stats...</p>
                        ) : error ? (
                            <p className="text-red-400">{error}</p>
                        ) : stats ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                    <div className="bg-gray-800 rounded-lg p-3 text-center">
                                        <p className="text-2xl font-bold text-white">{stats.total}</p>
                                        <p className="text-gray-400 text-xs">Total</p>
                                    </div>
                                    {Object.entries(stats.stats).map(([type, count]) => (
                                        <div key={type} className="bg-gray-800 rounded-lg p-3 text-center">
                                            <p className="text-2xl font-bold text-emerald-400">{count}</p>
                                            <p className="text-gray-400 text-xs capitalize">{type}</p>
                                        </div>
                                    ))}
                                </div>
                                {Object.keys(stats.stats).length === 0 && (
                                    <p className="text-gray-500 text-center py-4">No submissions yet</p>
                                )}
                            </div>
                        ) : null}
                    </CardContent>
                </Card>

                {/* Recent Submissions */}
                <Card className="bg-gray-900 border-gray-800">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg text-white">Recent Submissions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading && !stats ? (
                            <p className="text-gray-500">Loading submissions...</p>
                        ) : stats?.recent.length ? (
                            <div className="max-h-96 overflow-y-auto space-y-3 pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#374151 #1f2937' }}>
                                {stats.recent.map((sub) => (
                                    <div key={sub.id} className="bg-gray-800 rounded-lg p-3">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <Badge variant="outline" className="border-emerald-600 text-emerald-400 capitalize">
                                                    {sub.type}
                                                </Badge>
                                                <span className="text-gray-400 text-xs">#{sub.id}</span>
                                            </div>
                                            <span className="text-gray-500 text-xs">
                                                {new Date(sub.createdAt).toLocaleString()}
                                            </span>
                                        </div>
                                        <p className="text-gray-300 text-sm">
                                            <span className="text-gray-500">Email:</span> {sub.email}
                                        </p>
                                        <div className="mt-1 text-xs text-gray-400">
                                            {Object.entries(sub.data)
                                                .filter(([, v]) => v && typeof v === 'string' && v.length > 0)
                                                .slice(0, 3)
                                                .map(([key, val]) => (
                                                    <span key={key} className="mr-3">
                                                        <span className="text-gray-500">{key}:</span>{' '}
                                                        {String(val).length > 40 ? String(val).substring(0, 40) + '...' : String(val)}
                                                    </span>
                                                ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-4">No recent submissions</p>
                        )}
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="bg-gray-900 border-gray-800">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg text-white">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-3">
                            <a href="/api/health" target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:text-white">
                                    Health Check API
                                </Button>
                            </a>
                            <a href="/" target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:text-white">
                                    View Website
                                </Button>
                            </a>
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-gray-700 text-gray-300 hover:text-white"
                                onClick={handleRefresh}
                            >
                                Refresh Data
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
