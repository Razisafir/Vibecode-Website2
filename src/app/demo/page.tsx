import { Play, Code2 } from "lucide-react";

export default function DemoPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold">Live Demo</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Try VibeCode right in your browser. No download required.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="rounded-xl border bg-muted/30 p-8 text-center">
            <Code2 className="h-16 w-16 text-primary mx-auto mb-4" />
            <p className="text-lg text-muted-foreground mb-6">
              Interactive demo coming soon. In the meantime, download VibeCode to try it locally.
            </p>
            <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
              <Play className="h-4 w-4" />
              Launch Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
