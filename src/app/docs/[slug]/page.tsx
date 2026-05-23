import Link from 'next/link';
import { getDocBySlug, getAllDocSlugs, getDocsByCategory } from '@/data/docs';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { DocsChatWidget } from '@/components/docs-chat-widget';

interface DocPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllDocSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: DocPageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDocBySlug(slug);
  if (!doc) return { title: 'Not Found' };
  return {
    title: `${doc.title} - VibeCode Docs`,
    description: doc.description,
  };
}

export default async function DocDetailPage({ params }: DocPageProps) {
  const { slug } = await params;
  const doc = getDocBySlug(slug);
  
  if (!doc) {
    notFound();
  }

  const docsByCategory = getDocsByCategory();
  const allDocs = Object.values(docsByCategory).flat();

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
              <Link href="/docs" className="text-sm text-zinc-400 hover:text-purple-400 transition-colors">
                Documentation
              </Link>
              <span className="text-sm text-zinc-500">/</span>
              <span className="text-sm text-white">{doc.title}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <nav className="sticky top-24 space-y-6">
              {Object.entries(docsByCategory).map(([category, docs]) => (
                <div key={category}>
                  <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                    {category}
                  </h3>
                  <ul className="space-y-1">
                    {docs.map((d) => (
                      <li key={d.slug}>
                        <Link
                          href={`/docs/${d.slug}`}
                          className={`block text-sm px-3 py-1.5 rounded-lg transition-colors ${
                            d.slug === slug
                              ? 'bg-purple-500/10 text-purple-400 font-medium'
                              : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                          }`}
                        >
                          {d.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <article className="prose prose-invert max-w-none">
              <div 
                className="doc-content"
                dangerouslySetInnerHTML={{ __html: markdownToHtml(doc.content) }}
              />
            </article>

            {/* Navigation between docs */}
            <div className="mt-12 pt-8 border-t border-[#27272a] flex justify-between">
              {(() => {
                const currentIndex = allDocs.findIndex(d => d.slug === slug);
                const prev = currentIndex > 0 ? allDocs[currentIndex - 1] : null;
                const next = currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null;
                return (
                  <>
                    {prev ? (
                      <Link href={`/docs/${prev.slug}`} className="text-sm text-zinc-400 hover:text-purple-400 transition-colors">
                        &larr; {prev.title}
                      </Link>
                    ) : <span />}
                    {next ? (
                      <Link href={`/docs/${next.slug}`} className="text-sm text-zinc-400 hover:text-purple-400 transition-colors">
                        {next.title} &rarr;
                      </Link>
                    ) : <span />}
                  </>
                );
              })()}
            </div>
          </main>
        </div>
      </div>

      {/* AI Chat Widget */}
      <DocsChatWidget />
    </div>
  );
}

/** Simple markdown-to-HTML converter (basic, no external deps) */
function markdownToHtml(md: string): string {
  let html = md
    // Headers
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // List items
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    // Numbered list items
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    // Horizontal rules
    .replace(/^---$/gm, '<hr class="border-zinc-700 my-6" />')
    // Table rows
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(c => c.trim());
      if (cells.every(c => /^[\s-]+$/.test(c))) return '';
      const isHeader = match.includes('---');
      if (isHeader) return '';
      const tds = cells.map(c => `<td class="px-3 py-2 border border-zinc-700">${c.trim()}</td>`).join('');
      return `<tr>${tds}</tr>`;
    });

  // Wrap consecutive <li> in <ul>
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul class="list-disc pl-6 space-y-1 my-2">$1</ul>');

  // Wrap consecutive <tr> in <table>
  html = html.replace(/((?:<tr>.*<\/tr>\n?)+)/g, '<table class="w-full border-collapse my-4">$1</table>');

  // Paragraphs: wrap lines that aren't already wrapped in HTML tags
  const lines = html.split('\n');
  const result: string[] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      result.push('');
    } else if (/^<(h[1-6]|ul|ol|li|table|tr|td|hr|pre|blockquote)/.test(trimmed)) {
      result.push(trimmed);
    } else {
      result.push(`<p class="my-2 text-zinc-300">${trimmed}</p>`);
    }
  }

  return result.join('\n');
}
