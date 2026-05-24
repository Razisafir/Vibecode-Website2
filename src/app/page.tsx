'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Code2, Zap, Shield, Globe, Brain, Terminal, ChevronRight, Mail, Users, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';

interface FormState {
  loading: boolean;
  success: string | null;
  error: string | null;
}

export default function HomePage() {
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [formState, setFormState] = useState<FormState>({ loading: false, success: null, error: null });

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState({ loading: true, success: null, error: null });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setFormState({ loading: false, success: 'Message sent! We\'ll get back to you soon.', error: null });
      setContactForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setFormState({ loading: false, success: null, error: err instanceof Error ? err.message : 'Something went wrong' });
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState({ loading: true, success: null, error: null });
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setFormState({ loading: false, success: 'Subscribed! Welcome aboard.', error: null });
      setNewsletterEmail('');
    } catch (err) {
      setFormState({ loading: false, success: null, error: err instanceof Error ? err.message : 'Something went wrong' });
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-purple-500/5" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-sm text-emerald-400 mb-8">
            <Sparkles className="h-4 w-4" />
            Now in Public Beta
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white">
            Code at the Speed of
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"> Thought</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            VibeCode is the AI-powered code editor that understands your intent and
            helps you ship faster. Built for the next generation of developers.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/downloads"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-6 py-3 text-sm font-semibold text-black hover:bg-emerald-400 transition-colors"
            >
              Download Free
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
            <a
              href="#ai"
              className="inline-flex items-center justify-center rounded-lg border border-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/5 transition-colors"
            >
              Explore AI Features
            </a>
          </div>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-emerald-500" />
              Free &amp; Open Source
            </span>
            <span className="flex items-center gap-1.5">
              <Globe className="h-4 w-4 text-emerald-500" />
              Windows, Mac, Linux
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-emerald-500" />
              AI-Powered
            </span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-[#0d0d15]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Why VibeCode?</h2>
            <p className="mt-4 text-gray-400">Everything you need, nothing you don&apos;t.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: 'Lightning Fast',
                desc: 'AI completions in under 100ms. Never break your flow state. VibeCode is built for speed from the ground up, with a responsive UI and intelligent caching that keeps you in the zone.',
                color: 'text-amber-400',
              },
              {
                icon: Shield,
                title: 'Secure by Default',
                desc: 'Your code stays on your machine. Zero telemetry, zero tracking. VibeCode respects your privacy completely and never sends your code to any server without your explicit permission.',
                color: 'text-emerald-400',
              },
              {
                icon: Globe,
                title: 'Free to Use',
                desc: 'Powerful IDE at zero cost. No subscriptions, no hidden fees, no feature gates. VibeCode is open source and free forever, because great developer tools should be accessible to everyone.',
                color: 'text-cyan-400',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-white/5 bg-[#12121a] p-6 hover:border-white/10 transition-all hover:shadow-lg hover:shadow-black/20"
              >
                <feature.icon className={`h-10 w-10 ${feature.color} mb-4`} />
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Engine Section */}
      <section id="ai" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-4 py-1.5 text-sm text-cyan-400 mb-6">
                <Brain className="h-4 w-4" />
                AI Execution Kernel
              </div>
              <h2 className="text-3xl font-bold text-white">
                An editor that <span className="text-emerald-400">thinks</span> with you
              </h2>
              <p className="mt-4 text-gray-400">
                VibeCode&apos;s AI Execution Kernel goes beyond simple autocomplete. It understands your codebase,
                anticipates your intent, and can execute multi-step operations autonomously. From refactoring
                entire modules to generating boilerplate and running tests, the AI kernel handles the heavy lifting
                so you can focus on what matters most: building great software.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Multi-agent orchestration for complex tasks',
                  'Autonomous execution with safety guardrails',
                  'Context-aware code generation & refactoring',
                  'Real-time collaboration between AI agents',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-300">
                    <Terminal className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  href="/features"
                  className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  See all features
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="rounded-xl border border-white/5 bg-[#12121a] p-6 font-mono text-sm">
              <div className="flex items-center gap-2 mb-4 text-gray-500">
                <div className="h-3 w-3 rounded-full bg-red-500/60" />
                <div className="h-3 w-3 rounded-full bg-amber-500/60" />
                <div className="h-3 w-3 rounded-full bg-emerald-500/60" />
                <span className="ml-2 text-xs">VibeCode AI Terminal</span>
              </div>
              <div className="space-y-1">
                <p className="text-emerald-400">$ vibecode run &quot;Add auth to the API&quot;</p>
                <p className="text-gray-500">→ Analyzing codebase structure...</p>
                <p className="text-gray-500">→ Found 12 API routes without auth</p>
                <p className="text-gray-500">→ Generating JWT middleware...</p>
                <p className="text-gray-500">→ Applying changes with safety checks...</p>
                <p className="text-emerald-400">✓ Auth middleware added to 12 routes</p>
                <p className="text-emerald-400">✓ 3 tests updated, all passing</p>
                <p className="text-cyan-400">$ <span className="animate-pulse">_</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 bg-[#0d0d15] border-y border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '50K+', label: 'Active Developers' },
              { value: '<100ms', label: 'AI Latency' },
              { value: '99.9%', label: 'Uptime' },
              { value: '200+', label: 'AI Commands' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl sm:text-3xl font-bold text-emerald-400">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to Vibe?</h2>
          <p className="mt-4 text-gray-400 text-lg">
            Download VibeCode for free and experience the future of coding today.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/downloads"
              className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-8 py-3 text-sm font-semibold text-black hover:bg-emerald-400 transition-colors"
            >
              Download for Free
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
            <Link
              href="/careers"
              className="inline-flex items-center justify-center rounded-lg border border-white/10 px-8 py-3 text-sm font-semibold text-white hover:bg-white/5 transition-colors"
            >
              Join Our Team
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20 bg-[#0d0d15]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-sm text-emerald-400 mb-6">
                <Mail className="h-4 w-4" />
                Get in Touch
              </div>
              <h2 className="text-3xl font-bold text-white">Contact Us</h2>
              <p className="mt-4 text-gray-400">
                Have questions about VibeCode? Want to integrate it into your workflow or explore enterprise solutions?
                We&apos;d love to hear from you. Our team typically responds within 24 hours.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <Users className="h-5 w-5 text-emerald-400" />
                  <span className="text-sm">Community Support via GitHub &amp; Discord</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <TrendingUp className="h-5 w-5 text-emerald-400" />
                  <span className="text-sm">Enterprise Solutions &amp; Custom Integrations</span>
                </div>
              </div>
            </div>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 block mb-1.5">Name *</label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-[#12121a] px-4 py-2.5 text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 block mb-1.5">Email *</label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full rounded-lg border border-white/10 bg-[#12121a] px-4 py-2.5 text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-1.5">Subject</label>
                <input
                  type="text"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-[#12121a] px-4 py-2.5 text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="What's this about?"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-1.5">Message *</label>
                <textarea
                  required
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-[#12121a] px-4 py-2.5 text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
                  placeholder="Tell us more..."
                />
              </div>
              <button
                type="submit"
                disabled={formState.loading}
                className="w-full rounded-lg bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-black hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {formState.loading ? 'Sending...' : 'Send Message'}
              </button>
              {formState.success && (
                <p className="text-emerald-400 text-sm text-center">{formState.success}</p>
              )}
              {formState.error && (
                <p className="text-red-400 text-sm text-center">{formState.error}</p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section id="newsletter" className="py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 text-center">
          <Mail className="h-8 w-8 text-emerald-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white">Stay in the Loop</h2>
          <p className="mt-2 text-gray-400 text-sm">
            Get updates on new features, AI capabilities, and developer stories. No spam, ever.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 rounded-lg border border-white/10 bg-[#12121a] px-4 py-2.5 text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              placeholder="you@example.com"
            />
            <button
              type="submit"
              disabled={formState.loading}
              className="rounded-lg bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-black hover:bg-emerald-400 disabled:opacity-50 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
