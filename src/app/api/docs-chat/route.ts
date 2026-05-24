import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory rate limiting
const rateLimiter = new Map<string, { count: number; resetAt: number }>();

const DOCS_CONTEXT = `
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

    // Simple keyword-based response (AI chat feature coming soon)
    const q = question.toLowerCase();
    let answer = '';

    if (q.includes('install') || q.includes('download')) {
      answer = 'You can download VibeCode from our Downloads page at vibecode.dev/downloads. We support Windows (.exe), macOS (.dmg), and Linux (AppImage, .deb, .rpm). The current version is v1.121.1.';
    } else if (q.includes('api key') || q.includes('setup') || q.includes('configure')) {
      answer = 'To set up your AI provider, open VibeCode and go to the AI sidebar (Ctrl+Shift+J). Click the gear icon, select your provider (OpenAI, Anthropic, Google, OpenRouter, Ollama, or LM Studio), and enter your API key. Click Validate to test the connection.';
    } else if (q.includes('theme') || q.includes('dark') || q.includes('light')) {
      answer = 'VibeCode comes with Dark 2026 and Light 2026 themes. Switch themes using Ctrl+K Ctrl+T or go to Settings → Color Theme.';
    } else if (q.includes('shortcut') || q.includes('keybind')) {
      answer = 'Key shortcuts: Ctrl+Shift+J (Jarvis Chat), Ctrl+Shift+K (Knowledge Graph), Ctrl+Shift+M (Memory), Ctrl+Shift+A (AI Workflow), Ctrl+Alt+Shift+C (AI Commit), Ctrl+Alt+Shift+B (AI Branch).';
    } else if (q.includes('price') || q.includes('cost') || q.includes('free')) {
      answer = 'VibeCode is completely free and open source. Pro and Enterprise tiers with advanced AI features are planned for the future, but the core IDE will always remain free.';
    } else if (q.includes('extension') || q.includes('plugin')) {
      answer = 'VibeCode uses the Open VSX marketplace for extensions. Most popular VS Code extensions are available. You can install them from the Extensions panel (Ctrl+Shift+X).';
    } else if (q.includes('smart') || q.includes('smartscreen') || q.includes('warning')) {
      answer = 'Windows SmartScreen warnings are expected since VibeCode is not code-signed yet. Click "More info" → "Run anyway" to proceed. The download is safe. For macOS, right-click the app and select "Open" the first time.';
    } else {
      answer = `Thanks for your question! Here's what I know from our docs: VibeCode is an AI-native IDE forked from VS Code, available for Windows, macOS, and Linux. It features an AI Execution Kernel with multi-agent orchestration, Jarvis Chat, and supports multiple LLM providers. For more details, check our documentation or download page.`;
    }

    return NextResponse.json({ answer });
  } catch (error: unknown) {
    console.error('[Docs Chat] Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate answer' },
      { status: 500 }
    );
  }
}
