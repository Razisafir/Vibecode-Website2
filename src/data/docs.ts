export interface DocSection {
  slug: string;
  title: string;
  description: string;
  content: string;
  category: string;
}

export const docsSections: DocSection[] = [
  {
    slug: 'getting-started',
    title: 'Getting Started',
    description: 'Install and set up VibeCode IDE',
    category: 'Introduction',
    content: `
# Getting Started with VibeCode

VibeCode is an AI-native IDE forked from VS Code, designed to supercharge your development workflow with AI-powered features.

## Installation

Download VibeCode from [vibecode.dev/downloads](https://vibecode.dev/downloads). Available for:

- **Windows**: .exe installer (x64)
- **macOS**: .dmg installer (Apple Silicon & Intel)
- **Linux**: AppImage, DEB, RPM packages

Current version: **v1.121.1**

## First Launch

1. Install VibeCode using the appropriate installer for your platform
2. Launch the application - your existing VS Code extensions will be automatically detected
3. Open the AI sidebar by clicking the sparkle icon or pressing \`Ctrl+Shift+J\`
4. Configure your LLM provider (see API Key Setup)

## API Key Setup

To use AI features, you need to configure at least one LLM provider:

1. Open the AI sidebar (Ctrl+Shift+J)
2. Click the gear icon to open provider settings
3. Select your preferred provider:
   - **OpenAI** - GPT-4o, GPT-4o Mini, o1, o3-mini
   - **Anthropic** - Claude Sonnet 4, Claude 3.5 Sonnet, Claude 3 Haiku
   - **Google Gemini** - Gemini 2.0 Flash, Gemini 1.5 Pro
   - **OpenRouter** - Access to all major models through one API
   - **Ollama** - Run models locally (free, no API key needed)
   - **LM Studio** - Run models locally (free, no API key needed)
4. Enter your API key and click Validate
5. Start chatting with Jarvis!

## Quick Tips

- Use \`Ctrl+Shift+J\` to open Jarvis Chat anytime
- Use \`Ctrl+Shift+K\` to open the Knowledge Graph
- Use \`Ctrl+Shift+M\` to open Visual Memory
- All standard VS Code keyboard shortcuts work in VibeCode
    `.trim(),
  },
  {
    slug: 'jarvis-chat',
    title: 'Jarvis Chat',
    description: 'AI assistant with LLM integration',
    category: 'AI Features',
    content: `
# Jarvis Chat

Jarvis is VibeCode's built-in AI assistant, powered by your choice of LLM provider. It lives in the sidebar and can help you with any coding task.

## Opening Jarvis

- **Keyboard shortcut**: \`Ctrl+Shift+J\` (Windows/Linux) or \`Cmd+Shift+J\` (macOS)
- **Activity bar**: Click the sparkle icon in the left sidebar
- **Command palette**: \`Ctrl+Shift+P\` → "Jarvis: Open Chat"

## Features

### Multi-Turn Conversations
Jarvis maintains conversation context, so you can have extended discussions about your code, architecture decisions, or debugging strategies.

### Code Generation
Ask Jarvis to write code, and it will generate it directly in your editor. You can review and accept/reject changes.

### Autonomous Execution
Jarvis can plan and execute multi-step code changes autonomously, with your approval at each milestone.

## Best Practices

1. Be specific about what you want - context helps Jarvis give better answers
2. Use \`/context\` to add relevant files before asking questions
3. Review all AI-generated code before accepting
4. Use autonomous mode for well-defined tasks, step-by-step for exploratory work
    `.trim(),
  },
  {
    slug: 'autonomous-execution',
    title: 'Autonomous Execution',
    description: 'AI plans and executes multi-step code changes',
    category: 'AI Features',
    content: `
# Autonomous Execution

VibeCode's Autonomous Execution system allows the AI to plan and execute complex, multi-step code changes with minimal human intervention.

## How It Works

1. **Describe your goal** - Tell Jarvis what you want to achieve
2. **AI creates a plan** - The system breaks down your goal into executable steps
3. **Review & approve** - You review and approve the plan before execution begins
4. **Step-by-step execution** - Each step is executed with verification
5. **Milestone checkpoints** - Pause at milestones to review progress
6. **Rollback if needed** - If something goes wrong, rollback to any checkpoint

## Execution Modes

- **Step-by-Step**: Each step requires explicit approval (safest)
- **Milestone Mode**: Approval required at checkpoints
- **Autonomous Mode**: AI executes without stopping (fastest)

## Rollback Engine

VibeCode includes a sophisticated rollback engine with 5 strategies:

1. **InverseEdit** - Reverse an edit by applying the inverse operation
2. **SnapshotRestore** - Restore from a saved file snapshot
3. **EditorUndo** - Use the editor's built-in undo stack
4. **CustomUndo** - Execute custom undo commands
5. **Irreversible** - Mark operations that cannot be undone
    `.trim(),
  },
  {
    slug: 'knowledge-graph',
    title: 'Knowledge Graph',
    description: 'Interactive visualization of code relationships',
    category: 'AI Features',
    content: `
# Knowledge Graph

The Knowledge Graph is an interactive visualization of your codebase's structure, dependencies, and relationships.

## Opening the Knowledge Graph

- **Keyboard shortcut**: \`Ctrl+Shift+K\`
- **Command palette**: "AI: Open Knowledge Graph"

## Features

- Visualize code relationships (imports, calls, inheritance)
- Interactive navigation - click nodes to jump to code
- AI-enhanced insights for refactoring suggestions
- Filter by file type, directory, or dependency depth
- Detect circular dependencies
    `.trim(),
  },
  {
    slug: 'visual-memory',
    title: 'Visual Memory',
    description: 'Obsidian-like memory system for AI context',
    category: 'AI Features',
    content: `
# Visual Memory

VibeCode's Visual Memory system provides an Obsidian-like knowledge management system that helps the AI maintain context across sessions.

## Opening Visual Memory

- **Keyboard shortcut**: \`Ctrl+Shift+M\`
- **Command palette**: "AI: Open Visual Memory"

## Features

- Create and organize memory notes for AI context
- Graph view for visualizing note connections
- Tags and categories for organization
- Auto-memory for AI-discovered patterns
- Memory compaction for large context windows
    `.trim(),
  },
  {
    slug: 'keyboard-shortcuts',
    title: 'Keyboard Shortcuts',
    description: 'All VibeCode keyboard shortcuts',
    category: 'Reference',
    content: `
# Keyboard Shortcuts

All standard VS Code keyboard shortcuts work, plus these AI-specific shortcuts:

| Shortcut | Action |
|----------|--------|
| \`Ctrl+Shift+J\` | Open Jarvis Chat |
| \`Ctrl+Shift+K\` | Open Knowledge Graph |
| \`Ctrl+Shift+M\` | Open Visual Memory |
| \`Ctrl+Shift+A\` | Open AI Workflow |
| \`Ctrl+Shift+U\` | Browse URL |
| \`Ctrl+Alt+Shift+C\` | AI Commit |
| \`Ctrl+Alt+Shift+B\` | AI Branch |
| \`Ctrl+K Ctrl+T\` | Change Theme |
    `.trim(),
  },
  {
    slug: 'multi-provider-llm',
    title: 'Multi-Provider LLM',
    description: 'Using multiple LLM providers in VibeCode',
    category: 'AI Features',
    content: `
# Multi-Provider LLM

VibeCode supports multiple LLM providers, giving you flexibility to choose the best model for each task.

## Supported Providers

### Cloud Providers
- **OpenAI**: GPT-4o, GPT-4o Mini, o1, o3-mini ($0.15-$15/1M tokens)
- **Anthropic**: Claude Sonnet 4, Claude 3.5 Sonnet, Claude 3 Haiku ($0.25-$3/1M tokens)
- **Google Gemini**: Gemini 2.0 Flash, Gemini 1.5 Pro ($0.075-$1.25/1M tokens)
- **OpenRouter**: All major models through one API

### Local Providers (Free)
- **Ollama**: Llama 3, Mistral, Phi-3, etc. (requires Ollama daemon)
- **LM Studio**: Any GGUF model (requires LM Studio)
- **Proxima**: Built-in models (ships with VibeCode)

## Cost Governor

Track and control your LLM spending with budgets, alerts, and auto-switching to cheaper models.
    `.trim(),
  },
  {
    slug: 'pricing',
    title: 'Pricing',
    description: 'VibeCode pricing and plans',
    category: 'About',
    content: `
# Pricing

VibeCode is currently **free to use**. All features are available at no cost.

## Current Plan (Free)
- Full IDE with all VS Code features
- Jarvis AI Chat (bring your own API key)
- Autonomous Execution, Knowledge Graph, Visual Memory
- All themes and keyboard shortcuts
- Community support

## Planned Plans
- **Pro**: Shared API key pool, priority responses, team features
- **Enterprise**: Self-hosted AI, SSO, audit logs, custom deployment

## API Key Costs
VibeCode is free, but LLM providers charge for API usage. Use the Cost Governor to track spending.
    `.trim(),
  },
];

export function getDocBySlug(slug: string): DocSection | undefined {
  return docsSections.find(d => d.slug === slug);
}

export function getAllDocSlugs(): string[] {
  return docsSections.map(d => d.slug);
}

export function getDocsByCategory(): Record<string, DocSection[]> {
  const categories: Record<string, DocSection[]> = {};
  for (const doc of docsSections) {
    if (!categories[doc.category]) {
      categories[doc.category] = [];
    }
    categories[doc.category].push(doc);
  }
  return categories;
}

/** Get all docs content as a single string for LLM context */
export function getAllDocsContent(): string {
  return docsSections.map(d => `## ${d.title}\n${d.content}`).join('\n\n---\n\n');
}
