import { Download, Monitor, Apple, Smartphone } from "lucide-react";
// Downloads page for VibeCode

export default function DownloadsPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold">Download VibeCode</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Available on all platforms. Free and open source.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { icon: Monitor, platform: "Windows", version: "Windows 10+", size: "89 MB" },
            { icon: Apple, platform: "macOS", version: "macOS 12+", size: "102 MB" },
            { icon: Smartphone, platform: "Linux", version: "Ubuntu 20.04+", size: "95 MB" },
          ].map((item) => (
            <div key={item.platform} className="rounded-xl border p-6 text-center hover:shadow-lg transition-shadow">
              <item.icon className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold">{item.platform}</h3>
              <p className="text-sm text-muted-foreground mt-1">{item.version}</p>
              <p className="text-sm text-muted-foreground">{item.size}</p>
              <button className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
                <Download className="h-4 w-4" />
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
