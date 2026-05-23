import Link from 'next/link';
import { getDocsByCategory } from '@/data/docs';
import { DocsChatWidget } from '@/components/docs-chat-widget';

export default function DocsPage() {
  const docsByCategory = getDocsByCategory();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-[#27272a] bg-[#0a0a0f]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-xl font-bold text-white hover:text-purple-400 transition-colors">
                VibeCode
              </Link>
              <span className="text-sm text-zinc-500">|</span>
              <span className="text-sm text-zinc-400">Documentation</span>
            </div>
            <nav className="flex items-center gap-6">
              <Link href="/docs" className="text-sm text-purple-400 font-medium">Docs</Link>
              <a href="https://vibecode.dev" className="text-sm text-zinc-400 hover:text-white transition-colors">Website</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Documentation</h1>
          <p className="text-lg text-zinc-400 max-w-2xl">
            Everything you need to know about VibeCode, the AI-native IDE that supercharges your development workflow.
          </p>
        </div>

        {/* Docs Grid */}
        <div className="space-y-12">
          {Object.entries(docsByCategory).map(([category, docs]) => (
            <section key={category}>
              <h2 className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-4">
                {category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {docs.map((doc) => (
                  <Link
                    key={doc.slug}
                    href={`/docs/${doc.slug}`}
                    className="group block p-6 rounded-xl border border-[#27272a] bg-[#12121a] hover:border-purple-500/50 hover:bg-[#1a1a2e] transition-all duration-200"
                  >
                    <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors mb-2">
                      {doc.title}
                    </h3>
                    <p className="text-sm text-zinc-400">
                      {doc.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* AI Chat Widget */}
      <DocsChatWidget />
    </div>
  );
}
