import { Users, Target, Heart, ExternalLink, Mail } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white">About VibeCode</h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            We&apos;re on a mission to make coding more intuitive, more creative, and more fun.
            VibeCode is built by developers, for developers — and it&apos;s completely free and open source.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
          {[
            { icon: Target, title: "Our Mission", desc: "Democratize software development by making AI-powered tools accessible to everyone. We believe every developer deserves a world-class IDE without paying a premium. VibeCode removes barriers to entry and empowers coders at every skill level to build their best work." },
            { icon: Users, title: "Our Team", desc: "A passionate group of engineers, designers, and dreamers from around the world. We are remote-first and believe in async communication, deep work, and shipping fast. Our team spans multiple time zones and cultures, united by a love for great developer tools." },
            { icon: Heart, title: "Our Values", desc: "Open source first, privacy by default, and always putting developers first. We will never sell your data, lock features behind paywalls, or compromise on the user experience. VibeCode is built with integrity and transparency at its core." },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-white/5 bg-[#12121a] p-6 text-center">
              <item.icon className="h-10 w-10 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">What is VibeCode?</h2>
          <p className="text-gray-400 mb-4">
            VibeCode is a full-featured code editor forked from VS Code (the world&apos;s most popular IDE) and enhanced
            with AI-powered capabilities. It retains everything you love about VS Code — the extensions ecosystem, the
            keyboard shortcuts, the debugging tools — while adding an AI Execution Kernel that can understand your code,
            generate suggestions, and even execute multi-step operations autonomously.
          </p>
          <p className="text-gray-400 mb-8">
            Unlike other AI coding tools that are locked behind expensive subscriptions, VibeCode is free, open source,
            and runs entirely on your machine. Your code never leaves your computer unless you explicitly choose to share it.
          </p>
          <div className="flex items-center justify-center gap-6">
            <Link
              href="https://github.com/Razisafir/Real-vibecode"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <ExternalLink className="h-5 w-5" />
              GitHub
            </Link>
            <Link
              href="https://x.com/vibecode"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <ExternalLink className="h-5 w-5" />
              X / Twitter
            </Link>
            <Link
              href="mailto:hello@vibecode.dev"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <Mail className="h-5 w-5" />
              Email
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
