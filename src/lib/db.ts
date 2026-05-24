/**
 * Vercel-compatible submission storage.
 * Uses in-memory Maps with JSON file persistence via /tmp.
 * Data persists across warm serverless invocations and resets on cold starts.
 * For production, upgrade to Vercel KV, Vercel Postgres, or a real database.
 */

import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join('/tmp', 'vibecode-data');
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'submissions.json');
const RATE_LIMITS_FILE = path.join(DATA_DIR, 'rate_limits.json');

export interface SubmissionRecord {
  id: number;
  type: string;
  data: string;
  email: string;
  created_at: string;
}

interface RateLimitRecord {
  email: string;
  type: string;
  created_at: string;
}

// In-memory stores
let submissions: SubmissionRecord[] = [];
let rateLimits: RateLimitRecord[] = [];
let nextId = 1;
let initialized = false;

function ensureDataDir(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch {
    // /tmp might not be writable in some environments, that's OK
  }
}

function loadFromDisk(): void {
  if (initialized) return;
  initialized = true;
  try {
    ensureDataDir();
    if (fs.existsSync(SUBMISSIONS_FILE)) {
      const data = JSON.parse(fs.readFileSync(SUBMISSIONS_FILE, 'utf-8'));
      submissions = data.submissions || [];
      nextId = data.nextId || 1;
    }
    if (fs.existsSync(RATE_LIMITS_FILE)) {
      rateLimits = JSON.parse(fs.readFileSync(RATE_LIMITS_FILE, 'utf-8'));
    }
  } catch {
    // If loading fails, start fresh
    submissions = [];
    rateLimits = [];
    nextId = 1;
  }
}

function saveToDisk(): void {
  try {
    ensureDataDir();
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify({ submissions, nextId }), 'utf-8');
    fs.writeFileSync(RATE_LIMITS_FILE, JSON.stringify(rateLimits), 'utf-8');
  } catch {
    // If saving fails, data still lives in memory for this invocation
  }
}

export function insertSubmission(type: string, data: Record<string, unknown>, email: string): number {
  loadFromDisk();
  const id = nextId++;
  const record: SubmissionRecord = {
    id,
    type,
    data: JSON.stringify(data),
    email,
    created_at: new Date().toISOString(),
  };
  submissions.push(record);
  saveToDisk();
  return id;
}

export function getSubmissions(type: string, limit?: number): SubmissionRecord[] {
  loadFromDisk();
  const filtered = submissions.filter(s => s.type === type);
  filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  return limit ? filtered.slice(0, limit) : filtered;
}

export function getSubmissionsByEmail(email: string): SubmissionRecord[] {
  loadFromDisk();
  return submissions.filter(s => s.email === email);
}

export function deleteSubmissionsByEmail(email: string): number {
  loadFromDisk();
  const before = submissions.length;
  submissions = submissions.filter(s => s.email !== email);
  const deleted = before - submissions.length;
  saveToDisk();
  return deleted;
}

export function checkRateLimit(email: string, type: string, maxPerHour: number): boolean {
  loadFromDisk();
  const oneHourAgo = new Date(Date.now() - 3600000).toISOString();
  const count = rateLimits.filter(
    r => r.email === email && r.type === type && r.created_at > oneHourAgo
  ).length;
  return count < maxPerHour;
}

export function recordRateLimit(email: string, type: string): void {
  loadFromDisk();
  rateLimits.push({ email, type, created_at: new Date().toISOString() });
  saveToDisk();
}

export function getSubmissionStats(): Record<string, number> {
  loadFromDisk();
  const stats: Record<string, number> = {};
  for (const s of submissions) {
    stats[s.type] = (stats[s.type] || 0) + 1;
  }
  return stats;
}

export function getRecentSubmissions(limit: number = 10): SubmissionRecord[] {
  loadFromDisk();
  const sorted = [...submissions].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
  return sorted.slice(0, limit);
}

export function getTotalSubmissionCount(): number {
  loadFromDisk();
  return submissions.length;
}

export function cleanupRateLimits(): number {
  loadFromDisk();
  const oneDayAgo = new Date(Date.now() - 86400000).toISOString();
  const before = rateLimits.length;
  rateLimits = rateLimits.filter(r => r.created_at > oneDayAgo);
  const removed = before - rateLimits.length;
  saveToDisk();
  return removed;
}
