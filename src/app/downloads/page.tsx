import { Download, Monitor, Apple, Smartphone } from "lucide-react";

const GITHUB_RELEASES = "https://github.com/Razisafir/Real-vibecode/releases/latest";

const PLATFORMS = [
  {
    icon: Monitor,
    platform: "Windows",
    version: "Windows 10+",
    size: "~80 MB",
    ext: "exe",
    filename: "RealVibecode-Setup-1.121.1-x64.exe",
    arch: "x64",
  },
  {
    icon: Apple,
    platform: "macOS",
    version: "macOS 12+",
    size: "~89 MB",
    ext: "dmg",
    filename: "RealVibecode-1.121.1-mac-x64.dmg",
    arch: "x64",
  },
  {
    icon: Smartphone,
    platform: "Linux",
    version: "Ubuntu 20.04+",
    size: "~90 MB",
    ext: "AppImage",
    filename: "RealVibecode-1.121.1-linux-x64.AppImage",
    arch: "x64",
  },
];

export default function DownloadsPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold">Download VibeCode</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Available on all platforms. Free to use — no subscriptions, no hidden fees.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Version 1.121.1 &middot; Released May 2026
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {PLATFORMS.map((item) => (
            <div key={item.platform} className="rounded-xl border p-6 text-center hover:shadow-lg transition-shadow">
              <item.icon className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold">{item.platform}</h3>
              <p className="text-sm text-muted-foreground mt-1">{item.version}</p>
              <p className="text-sm text-muted-foreground">{item.size} ({item.arch})</p>
              <a
                href={`${GITHUB_RELEASES}`}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Download className="h-4 w-4" />
                Download .{item.ext}
              </a>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground max-w-2xl mx-auto">
          <p className="mb-4">
            <strong>Windows users:</strong> You may see a &quot;Windows protected your PC&quot; warning because
            the app is not code-signed yet. Click &quot;More info&quot; then &quot;Run anyway&quot; to proceed.
            We are working on getting a code-signing certificate.
          </p>
          <p className="mb-4">
            <strong>macOS users:</strong> Right-click the app and select &quot;Open&quot; the first time.
            You may need to allow it in System Settings &gt; Privacy &amp; Security.
          </p>
          <p>
            Looking for other architectures (ARM64) or formats (DEB, RPM)? Visit our{" "}
            <a href={GITHUB_RELEASES} className="text-primary hover:underline">
              GitHub Releases page
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}
