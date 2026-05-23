import { NextRequest, NextResponse } from 'next/server';
import { getAllDocsContent } from '@/data/docs';

// Simple in-memory rate limiting
const rateLimiter = new Map<string, { count: number; resetAt: number }>();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question } = body;

    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    if (question.length > 500) {
      return NextResponse.json({ error: 'Question too long (max 500 chars)' }, { status: 400 });
    }

    // Rate limit: 10 questions per hour per IP
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    const limiter = rateLimiter.get(ip);
    if (limiter && limiter.resetAt > now && limiter.count >= 10) {
      return NextResponse.json({ error: 'Rate limited. Try again later.' }, { status: 429 });
    }

    if (!limiter || limiter.resetAt <= now) {
      rateLimiter.set(ip, { count: 1, resetAt: now + 3600000 });
    } else {
      limiter.count++;
    }

    // Load docs content for context
    const docsContext = getAllDocsContext();

    // Call LLM using z-ai-web-dev-sdk
    const ZAI = (await import('z-ai-web-dev-sdk')).default;
    const zai = await ZAI.create();

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant for VibeCode documentation. Answer questions based on the following documentation. If the answer isn't in the docs, say so honestly and suggest where the user might find more information. Keep your answers concise and practical.\n\nDocumentation:\n${docsContext}`,
        },
        {
          role: 'user',
          content: question,
        },
      ],
      temperature: 0.3,
      max_tokens: 500,
    });

    const answer =
      completion.choices?.[0]?.message?.content ||
      'Sorry, I could not generate an answer.';

    return NextResponse.json({ answer });
  } catch (error: unknown) {
    console.error('[Docs Chat] Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate answer' },
      { status: 500 }
    );
  }
}

function getAllDocsContext(): string {
  try {
    return getAllDocsContent();
  } catch {
    return `
VibeCode is an AI-native IDE forked from VS Code. Key topics:

INSTALLATION: Download from vibecode.dev/downloads. Available for Windows (.exe), macOS (.dmg), Linux (AppImage/DEB/RPM). Version v1.121.1.

API KEY SETUP: Go to AI sidebar → Click gear icon → Select provider (OpenAI, Anthropic, Google, OpenRouter) → Enter API key → Validate. Keyboard shortcut: Ctrl+Shift+J opens Jarvis.

AI FEATURES:
- Jarvis Chat: AI assistant with LLM integration (Ctrl+Shift+J)
- Autonomous Execution: AI plans and executes multi-step code changes
- Execution Graph: Visual DAG of all workspace operations
- Knowledge Graph: Interactive visualization of code relationships
- Visual Memory: Obsidian-like memory system for AI context
- Rollback Engine: 5 strategies (InverseEdit, SnapshotRestore, EditorUndo, CustomUndo, Irreversible)
- Provider Health: Monitor LLM provider status
- Cost Governor: Track LLM spending with budgets and alerts
- AI Commit/Branch/PR: AI-powered git operations

THEMES: VibeCode Dark 2026 and Light 2026 themes. Change via Ctrl+K Ctrl+T.

KEYBOARD SHORTCUTS:
- Ctrl+Shift+J: Open Jarvis Chat
- Ctrl+Shift+K: Open Knowledge Graph
- Ctrl+Shift+M: Open Memory
- Ctrl+Shift+A: Open AI Workflow
- Ctrl+Shift+U: Browse URL
- Ctrl+Alt+Shift+C: AI Commit
- Ctrl+Alt+Shift+B: AI Branch

PRICING: Free to use currently. Pro and Enterprise tiers planned.

MULTI-PROVIDER LLM: Supports OpenAI, Anthropic, Google Gemini, OpenRouter, Ollama (local), LM Studio (local).
    `.trim();
  }
}
