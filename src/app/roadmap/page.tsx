import { CheckCircle, Circle, Clock } from "lucide-react";

const roadmapItems = [
  { status: "done", title: "AI Completions", desc: "Context-aware code suggestions" },
  { status: "done", title: "Git Integration", desc: "Visual diff and branch management" },
  { status: "done", title: "Extension System", desc: "Plugin architecture for custom tools" },
  { status: "progress", title: "Multi-Agent Execution", desc: "Autonomous coding agents" },
  { status: "progress", title: "Cloud Sync", desc: "Settings and preferences sync" },
  { status: "planned", title: "Collaborative Editing", desc: "Real-time multi-player coding" },
  { status: "planned", title: "Mobile App", desc: "Code review on the go" },
  { status: "planned", title: "Voice Commands", desc: "Code with your voice" },
];

export default function RoadmapPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold">Roadmap</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Where VibeCode is headed.
          </p>
        </div>
        <div className="space-y-4">
          {roadmapItems.map((item) => (
            <div key={item.title} className="flex items-start gap-4 rounded-xl border p-5">
              {item.status === "done" && <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />}
              {item.status === "progress" && <Clock className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-0.5" />}
              {item.status === "planned" && <Circle className="h-6 w-6 text-muted-foreground flex-shrink-0 mt-0.5" />}
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
