import { Calendar } from "lucide-react";

const posts = [
  { title: "Introducing VibeCode 2.0", date: "2025-05-15", excerpt: "A complete rewrite with AI at the core." },
  { title: "How We Built Our AI Pipeline", date: "2025-04-28", excerpt: "Deep dive into our ML infrastructure." },
  { title: "Open Source by Default", date: "2025-04-10", excerpt: "Why we chose to open source VibeCode." },
  { title: "5 Tips for Faster Coding", date: "2025-03-22", excerpt: "Productivity hacks from the VibeCode team." },
];

export default function BlogPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold">Blog</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            News, updates, and insights from the VibeCode team.
          </p>
        </div>
        <div className="max-w-3xl mx-auto space-y-6">
          {posts.map((post) => (
            <article key={post.title} className="rounded-xl border p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Calendar className="h-4 w-4" />
                {post.date}
              </div>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
