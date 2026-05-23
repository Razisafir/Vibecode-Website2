import { Shield, Lock, Eye } from "lucide-react";

export default function SecurityPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold">Security</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Your code is your business. Security is our top priority.
          </p>
        </div>
        <div className="space-y-8">
          <div className="rounded-xl border p-6">
            <Shield className="h-8 w-8 text-primary mb-4" />
            <h2 className="text-xl font-semibold">Local-First Architecture</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Your code never leaves your machine unless you explicitly choose to sync it.
              All AI processing can run locally with compatible models.
            </p>
          </div>
          <div className="rounded-xl border p-6">
            <Lock className="h-8 w-8 text-primary mb-4" />
            <h2 className="text-xl font-semibold">End-to-End Encryption</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              When you use cloud features, all data is encrypted in transit and at rest
              using industry-standard AES-256 encryption.
            </p>
          </div>
          <div className="rounded-xl border p-6">
            <Eye className="h-8 w-8 text-primary mb-4" />
            <h2 className="text-xl font-semibold">Zero Telemetry by Default</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              VibeCode does not collect any usage data by default. Optional telemetry
              is opt-in and fully transparent about what is collected.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
