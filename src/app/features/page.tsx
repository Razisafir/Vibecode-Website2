import { Zap, Brain, GitBranch, Terminal, Eye, Sparkles, Shield, Globe, Cpu, Code2, Layers, Workflow } from "lucide-react";

const features = [
  { icon: Brain, title: "AI-Powered Completions", desc: "Context-aware code suggestions that understand your entire project. VibeCode's AI analyzes your codebase, dependencies, and patterns to provide intelligent completions that go beyond simple text prediction." },
  { icon: Zap, title: "Instant Responses", desc: "Sub-100ms latency for completions. Your flow never breaks. We've optimized the AI pipeline from model inference to UI rendering to ensure suggestions appear the moment you need them." },
  { icon: GitBranch, title: "Built-in Git", desc: "Visual diff, branch management, and conflict resolution. Manage your entire Git workflow without leaving the editor, with clear visual indicators and one-click operations." },
  { icon: Terminal, title: "Integrated Terminal", desc: "Run commands, scripts, and tests without leaving the editor. Multiple terminal instances, split views, and persistent sessions keep you productive." },
  { icon: Eye, title: "Live Preview", desc: "See your changes in real-time with hot reload. Perfect for web development — edit HTML, CSS, and JavaScript and watch your app update instantly in the preview pane." },
  { icon: Sparkles, title: "AI Refactoring", desc: "Restructure code safely with AI-assisted refactoring. Select a block of code, describe what you want to change, and VibeCode's AI will apply the transformation while preserving behavior." },
  { icon: Shield, title: "Privacy First", desc: "Your code stays on your machine. Zero telemetry, zero tracking. VibeCode never sends your code to external servers without your explicit permission. Privacy is not optional." },
  { icon: Globe, title: "Cross-Platform", desc: "Available on Windows, macOS, and Linux. Same experience everywhere, with native installers and automatic updates for every platform." },
  { icon: Cpu, title: "AI Execution Kernel", desc: "Go beyond completions. The AI Execution Kernel can autonomously perform multi-step operations — from adding authentication to generating tests — with safety guardrails and human review." },
  { icon: Code2, title: "Open VSX Extensions", desc: "Access thousands of extensions through the Open VSX marketplace. Most popular VS Code extensions are available, from themes and language support to debuggers and linters." },
  { icon: Layers, title: "Multi-Agent Orchestration", desc: "Complex tasks are broken down and distributed across specialized AI agents that collaborate in real-time. Each agent focuses on what it does best, producing higher quality results faster." },
  { icon: Workflow, title: "Custom Workflows", desc: "Define and automate repetitive development workflows. From scaffolding new projects to deploying updates, create custom commands that chain AI operations together." },
];

export default function FeaturesPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white">Features</h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Everything you need to build faster, smarter, and with more confidence.
            VibeCode combines the power of VS Code with cutting-edge AI capabilities.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.title} className="rounded-xl border border-white/5 bg-[#12121a] p-6 hover:border-emerald-500/20 transition-all">
              <f.icon className="h-8 w-8 text-emerald-400 mb-4" />
              <h3 className="text-lg font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-sm text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
