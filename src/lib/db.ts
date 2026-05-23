import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_DIR = path.join(process.cwd(), 'data');
const DB_PATH = path.join(DB_DIR, 'vibecode.db');

let db: Database.Database | null = null;

function getDb(): Database.Database {
    if (db) return db;
    
    // Ensure data directory exists
    if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
    }
    
    db = new Database(DB_PATH);
    
    // Enable WAL mode for better concurrency
    db.pragma('journal_mode = WAL');
    
    // Create tables if they don't exist
    db.exec(`
        CREATE TABLE IF NOT EXISTS submissions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT NOT NULL,
            data TEXT NOT NULL,
            email TEXT NOT NULL,
            created_at TEXT NOT NULL DEFAULT (datetime('now'))
        );
        CREATE INDEX IF NOT EXISTS idx_submissions_type ON submissions(type);
        CREATE INDEX IF NOT EXISTS idx_submissions_email ON submissions(email);
        CREATE INDEX IF NOT EXISTS idx_submissions_created ON submissions(created_at);
        
        CREATE TABLE IF NOT EXISTS rate_limits (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL,
            type TEXT NOT NULL,
            created_at TEXT NOT NULL DEFAULT (datetime('now'))
        );
        CREATE INDEX IF NOT EXISTS idx_rate_limits_lookup ON rate_limits(email, type, created_at);
    `);
    
    return db;
}

export interface SubmissionRecord {
    id: number;
    type: string;
    data: string; // JSON string of encrypted submission data
    email: string;
    created_at: string;
}

export function insertSubmission(type: string, data: Record<string, unknown>, email: string): number {
    const database = getDb();
    const stmt = database.prepare('INSERT INTO submissions (type, data, email) VALUES (?, ?, ?)');
    const result = stmt.run(type, JSON.stringify(data), email);
    return result.lastInsertRowid as number;
}

export function getSubmissions(type: string, limit?: number): SubmissionRecord[] {
    const database = getDb();
    const limitClause = limit ? `LIMIT ${limit}` : '';
    const stmt = database.prepare(`SELECT * FROM submissions WHERE type = ? ORDER BY created_at DESC ${limitClause}`);
    return stmt.all(type) as SubmissionRecord[];
}

export function getSubmissionsByEmail(email: string): SubmissionRecord[] {
    const database = getDb();
    const stmt = database.prepare('SELECT * FROM submissions WHERE email = ? ORDER BY created_at DESC');
    return stmt.all(email) as SubmissionRecord[];
}

export function deleteSubmissionsByEmail(email: string): number {
    const database = getDb();
    const stmt = database.prepare('DELETE FROM submissions WHERE email = ?');
    const result = stmt.run(email);
    return result.changes;
}

export function checkRateLimit(email: string, type: string, maxPerHour: number): boolean {
    const database = getDb();
    const oneHourAgo = new Date(Date.now() - 3600000).toISOString();
    const stmt = database.prepare('SELECT COUNT(*) as count FROM rate_limits WHERE email = ? AND type = ? AND created_at > ?');
    const result = stmt.get(email, type, oneHourAgo) as { count: number };
    return result.count < maxPerHour;
}

export function recordRateLimit(email: string, type: string): void {
    const database = getDb();
    const stmt = database.prepare('INSERT INTO rate_limits (email, type) VALUES (?, ?)');
    stmt.run(email, type);
}

export function getSubmissionStats(): Record<string, number> {
    const database = getDb();
    const stmt = database.prepare('SELECT type, COUNT(*) as count FROM submissions GROUP BY type');
    const results = stmt.all() as { type: string; count: number }[];
    const stats: Record<string, number> = {};
    for (const r of results) {
        stats[r.type] = r.count;
    }
    return stats;
}

export function getRecentSubmissions(limit: number = 10): SubmissionRecord[] {
    const database = getDb();
    const stmt = database.prepare('SELECT * FROM submissions ORDER BY created_at DESC LIMIT ?');
    return stmt.all(limit) as SubmissionRecord[];
}

export function getTotalSubmissionCount(): number {
    const database = getDb();
    const stmt = database.prepare('SELECT COUNT(*) as count FROM submissions');
    const result = stmt.get() as { count: number };
    return result.count;
}

// Clean up old rate limit records (call periodically)
export function cleanupRateLimits(): number {
    const database = getDb();
    const oneDayAgo = new Date(Date.now() - 86400000).toISOString();
    const stmt = database.prepare('DELETE FROM rate_limits WHERE created_at < ?');
    const result = stmt.run(oneDayAgo);
    return result.changes;
}
