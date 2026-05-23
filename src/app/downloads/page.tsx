import { Download, Monitor, Apple, Smartphone, ArrowRight, Terminal, Package, CheckCircle2 } from "lucide-react";

const GITHUB_REPO = "Razisafir/Real-vibecode";
const GITHUB_RELEASES = `https://github.com/${GITHUB_REPO}/releases/latest`;
const VERSION = "1.121.1";

const PLATFORMS = [
  {
    icon: Monitor,
    platform: "Windows",
    version: "Windows 10+",
    size: "~80 MB",
    ext: "exe",
    filename: `VibeCode-Setup-${VERSION}-x64.exe`,
    arch: "x64",
    directUrl: `https://github.com/${GITHUB_REPO}/releases/latest/download/VibeCode-Setup-${VERSION}-x64.exe`,
    installSteps: [
      "Download and run the .exe installer",
      "If Windows shows a SmartScreen warning, click \"More info\" → \"Run anyway\"",
      "Follow the installation wizard — choose install location and options",
      "Launch VibeCode from the Start Menu or Desktop shortcut",
    ],
  },
  {
    icon: Apple,
    platform: "macOS",
    version: "macOS 12+ (Monterey)",
    size: "~89 MB",
    ext: "dmg",
    filename: `VibeCode-${VERSION}-mac-x64.dmg`,
    arch: "Universal (x64 + ARM64)",
    directUrl: `https://github.com/${GITHUB_REPO}/releases/latest/download/VibeCode-${VERSION}-mac-x64.dmg`,
    installSteps: [
      "Download and open the .dmg file",
      "Drag VibeCode to the Applications folder",
      "Right-click the app and select \"Open\" the first time",
      "If blocked, go to System Settings → Privacy & Security → click \"Open Anyway\"",
    ],
  },
  {
    icon: Smartphone,
    platform: "Linux",
    version: "Ubuntu 20.04+ / Fedora 36+",
    size: "~90 MB",
    ext: "AppImage",
    filename: `VibeCode-${VERSION}-linux-x64.AppImage`,
    arch: "x64",
    directUrl: `https://github.com/${GITHUB_REPO}/releases/latest/download/VibeCode-${VERSION}-linux-x64.AppImage`,
    installSteps: [
      "Download the .AppImage file",
      "Make it executable: chmod +x VibeCode-*.AppImage",
      "Run it: ./VibeCode-*.AppImage",
      "Optionally, install the .deb or .rpm package from GitHub Releases",
    ],
  },
];

const ALT_DOWNLOADS = [
  { label: "Windows ARM64 (.exe)", url: `https://github.com/${GITHUB_REPO}/releases/latest` },
  { label: "macOS ZIP archive", url: `https://github.com/${GITHUB_REPO}/releases/latest` },
  { label: "Linux .deb (Debian/Ubuntu)", url: `https://github.com/${GITHUB_REPO}/releases/latest` },
  { label: "Linux .rpm (Fedora/RHEL)", url: `https://github.com/${GITHUB_REPO}/releases/latest` },
];

export default function DownloadsPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight">Download VibeCode</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            AI-native code editing, available on all platforms. Free to use — no subscriptions, no hidden fees.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Version {VERSION} &middot; Built from VS Code source &middot; May 2026
          </p>
        </div>

        {/* Primary downloads */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {PLATFORMS.map((item) => (
            <div
              key={item.platform}
              className="rounded-xl border p-6 text-center hover:shadow-lg transition-shadow flex flex-col"
            >
              <item.icon className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold">{item.platform}</h3>
              <p className="text-sm text-muted-foreground mt-1">{item.version}</p>
              <p className="text-sm text-muted-foreground">
                {item.size} &middot; {item.arch}
              </p>

              <a
                href={item.directUrl}
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Download className="h-4 w-4" />
                Download .{item.ext}
              </a>

              {/* Installation steps */}
              <div className="mt-5 text-left flex-1">
                <p className="text-xs font-medium uppercase text-muted-foreground tracking-wide mb-2">
                  Install Steps
                </p>
                <ol className="space-y-1.5">
                  {item.installSteps.map((step, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ))}
        </div>

        {/* Alternative downloads */}
        <div className="mt-12 max-w-3xl mx-auto">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4 text-center">
            Alternative Downloads
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ALT_DOWNLOADS.map((alt) => (
              <a
                key={alt.label}
                href={alt.url}
                className="flex items-center gap-2 rounded-lg border px-4 py-3 text-sm hover:bg-muted/50 transition-colors"
              >
                <Package className="h-4 w-4 text-muted-foreground" />
                <span>{alt.label}</span>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground ml-auto" />
              </a>
            ))}
          </div>
        </div>

        {/* Important notes */}
        <div className="mt-12 text-center text-sm text-muted-foreground max-w-2xl mx-auto space-y-4">
          <div className="rounded-lg border bg-muted/30 p-4 text-left">
            <p className="font-semibold text-foreground mb-2">Important Notes</p>
            <ul className="space-y-2">
              <li>
                <strong>Windows SmartScreen:</strong> The app is not code-signed yet. You will see a
                &quot;Windows protected your PC&quot; warning. Click <strong>&quot;More info&quot;</strong> then{" "}
                <strong>&quot;Run anyway&quot;</strong> to proceed. This is safe.
              </li>
              <li>
                <strong>macOS Gatekeeper:</strong> Right-click the app and select <strong>&quot;Open&quot;</strong>{" "}
                the first time. If blocked, go to <strong>System Settings → Privacy &amp; Security</strong> and
                click <strong>&quot;Open Anyway&quot;</strong>.
              </li>
              <li>
                <strong>Auto-updates:</strong> VibeCode will automatically check for updates on launch.
                New versions are downloaded and installed in the background.
              </li>
              <li>
                <strong>vibecode:// protocol:</strong> The installer registers the <code className="rounded bg-muted px-1 py-0.5 text-xs">vibecode://</code> URL
                protocol for deep linking from browsers and other apps.
              </li>
              <li>
                <strong>Extensions:</strong> VibeCode uses the Open VSX marketplace for extensions. Most VS Code
                extensions are available and can be installed from the Extensions panel.
              </li>
            </ul>
          </div>
        </div>

        {/* CLI install */}
        <div className="mt-8 max-w-2xl mx-auto">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <Terminal className="h-4 w-4" />
              Install via Command Line
            </p>
            <div className="space-y-3 text-xs">
              <div>
                <p className="text-muted-foreground mb-1">Windows (PowerShell):</p>
                <code className="block rounded bg-zinc-900 text-zinc-100 px-3 py-2 font-mono">
                  {`Invoke-WebRequest -Uri "https://github.com/${GITHUB_REPO}/releases/latest/download/VibeCode-Setup-${VERSION}-x64.exe" -OutFile "VibeCode-Setup.exe"; .\\VibeCode-Setup.exe`}
                </code>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">macOS (Terminal):</p>
                <code className="block rounded bg-zinc-900 text-zinc-100 px-3 py-2 font-mono">
                  {`curl -L -o VibeCode.dmg "https://github.com/${GITHUB_REPO}/releases/latest/download/VibeCode-${VERSION}-mac-x64.dmg" && open VibeCode.dmg`}
                </code>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Linux (bash):</p>
                <code className="block rounded bg-zinc-900 text-zinc-100 px-3 py-2 font-mono">
                  {`curl -L -o VibeCode.AppImage "https://github.com/${GITHUB_REPO}/releases/latest/download/VibeCode-${VERSION}-linux-x64.AppImage" && chmod +x VibeCode.AppImage && ./VibeCode.AppImage`}
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* All releases link */}
        <div className="mt-8 text-center">
          <a
            href={GITHUB_RELEASES}
            className="text-sm text-primary hover:underline inline-flex items-center gap-1"
          >
            View all releases on GitHub
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
