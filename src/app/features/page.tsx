import { Zap, Brain, GitBranch, Terminal, Eye, Sparkles } from "lucide-react";

const features = [
  { icon: Brain, title: "AI-Powered Completions", desc: "Context-aware code suggestions that understand your entire project." },
  { icon: Zap, title: "Instant Responses", desc: "Sub-100ms latency for completions. Your flow never breaks." },
  { icon: GitBranch, title: "Built-in Git", desc: "Visual diff, branch management, and conflict resolution." },
  { icon: Terminal, title: "Integrated Terminal", desc: "Run commands, scripts, and tests without leaving the editor." },
  { icon: Eye, title: "Live Preview", desc: "See your changes in real-time with hot reload." },
  { icon: Sparkles, title: "Refactoring AI", desc: "Restructure code safely with AI-assisted refactoring." },
];

export default function FeaturesPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold">Features</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to build faster, smarter, and with more confidence.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f) => (
            <div key={f.title} className="rounded-xl border p-6 hover:shadow-lg transition-shadow">
              <f.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
