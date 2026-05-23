/**
 * Legacy JSON file-based submission storage.
 * 
 * @deprecated This module has been superseded by src/lib/db.ts which uses SQLite
 * for better reliability, concurrency, and querying capabilities.
 * 
 * This file is kept for backward compatibility reference only.
 * All new code should use the functions from db.ts instead.
 */

import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'submissions.json');
const RATE_LIMITS_FILE = path.join(DATA_DIR, 'rate_limits.json');

interface LegacySubmission {
    id: string;
    type: string;
    data: Record<string, unknown>;
    email: string;
    createdAt: string;
}

interface LegacyRateLimit {
    email: string;
    type: string;
    timestamp: number;
}

function ensureDataDir(): void {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }
}

function readJsonFile<T>(filePath: string, defaultValue: T): T {
    try {
        ensureDataDir();
        if (!fs.existsSync(filePath)) {
            return defaultValue;
        }
        const content = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(content) as T;
    } catch {
        return defaultValue;
    }
}

function writeJsonFile<T>(filePath: string, data: T): void {
    ensureDataDir();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

/** @deprecated Use insertSubmission() from db.ts instead */
export function writeSubmission(type: string, data: Record<string, unknown>, email: string): string {
    const submissions = readJsonFile<LegacySubmission[]>(SUBMISSIONS_FILE, []);
    const id = `sub_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    submissions.push({ id, type, data, email, createdAt: new Date().toISOString() });
    writeJsonFile(SUBMISSIONS_FILE, submissions);
    return id;
}

/** @deprecated Use getSubmissions() from db.ts instead */
export function readSubmissions(type: string): LegacySubmission[] {
    const submissions = readJsonFile<LegacySubmission[]>(SUBMISSIONS_FILE, []);
    return submissions.filter(s => s.type === type);
}

/** @deprecated Use checkRateLimit() and recordRateLimit() from db.ts instead */
export function isRateLimited(email: string, type: string, maxPerHour: number): boolean {
    const limits = readJsonFile<LegacyRateLimit[]>(RATE_LIMITS_FILE, []);
    const oneHourAgo = Date.now() - 3600000;
    const recentCount = limits.filter(
        l => l.email === email && l.type === type && l.timestamp > oneHourAgo
    ).length;
    return recentCount >= maxPerHour;
}

/** @deprecated Use recordRateLimit() from db.ts instead */
export function recordRateLimitEntry(email: string, type: string): void {
    const limits = readJsonFile<LegacyRateLimit[]>(RATE_LIMITS_FILE, []);
    limits.push({ email, type, timestamp: Date.now() });
    writeJsonFile(RATE_LIMITS_FILE, limits);
}
