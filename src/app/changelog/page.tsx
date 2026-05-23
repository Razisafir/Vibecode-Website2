import { Tag } from "lucide-react";

const releases = [
  { version: "2.1.0", date: "2025-05-10", changes: ["Added multi-agent execution engine", "New knowledge graph visualization", "Improved AI completion latency by 40%"] },
  { version: "2.0.0", date: "2025-04-01", changes: ["Complete rewrite with AI-first architecture", "New UI with dark/light themes", "Electron-based desktop app"] },
  { version: "1.5.0", date: "2025-02-15", changes: ["Added streaming AI responses", "Git integration improvements", "Bug fixes and performance"] },
  { version: "1.0.0", date: "2024-12-01", changes: ["Initial release", "Basic AI completions", "Extension system"] },
];

export default function ChangelogPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold">Changelog</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            What&apos;s new in VibeCode.
          </p>
        </div>
        <div className="space-y-8">
          {releases.map((release) => (
            <div key={release.version} className="rounded-xl border p-6">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">v{release.version}</h2>
                <span className="text-sm text-muted-foreground">{release.date}</span>
              </div>
              <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                {release.changes.map((change) => (
                  <li key={change}>{change}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
