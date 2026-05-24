'use client';

import { useState } from 'react';
import { Briefcase, MapPin, Bell, CheckCircle2, ArrowRight, Users, Rocket, Heart, Globe } from 'lucide-react';

const OPEN_POSITIONS = [
  {
    id: 'senior-frontend',
    title: 'Senior Frontend Engineer',
    team: 'Engineering',
    location: 'Remote',
    description: 'Build the next generation of editor UI with React, TypeScript, and WebAssembly. Work on performance-critical rendering and developer experience.',
  },
  {
    id: 'ai-ml-engineer',
    title: 'AI/ML Engineer',
    team: 'AI Research',
    location: 'Remote',
    description: 'Design and implement AI models for code completion, refactoring, and autonomous execution. Push the boundaries of AI-assisted development.',
  },
  {
    id: 'product-designer',
    title: 'Product Designer',
    team: 'Design',
    location: 'Remote',
    description: 'Shape the user experience of an AI-native code editor. Create intuitive workflows that make complex AI features feel effortless.',
  },
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    team: 'Infrastructure',
    location: 'Remote',
    description: 'Build and scale our CI/CD pipelines, release infrastructure, and cloud services. Ensure reliable delivery to thousands of developers.',
  },
  {
    id: 'security-engineer',
    title: 'Security Engineer',
    team: 'Security',
    location: 'Remote',
    description: 'Protect our users and infrastructure. Implement code signing, vulnerability scanning, and security best practices across the platform.',
  },
  {
    id: 'developer-advocate',
    title: 'Developer Advocate',
    team: 'Community',
    location: 'Remote',
    description: 'Build and nurture our developer community. Create content, run events, and be the voice of VibeCode to the world.',
  },
];

const NOTIFY_POSITIONS = [
  'Backend Engineer',
  'Mobile Engineer (iOS/Android)',
  'Data Engineer',
  'Technical Writer',
  'QA Engineer',
  'Solutions Architect',
  'Product Manager',
  'Growth Marketing',
];

interface FormState {
  loading: boolean;
  success: string | null;
  error: string | null;
}

export default function CareersPage() {
  const [notifyEmail, setNotifyEmail] = useState('');
  const [selectedNotifyPositions, setSelectedNotifyPositions] = useState<string[]>([]);
  const [formState, setFormState] = useState<FormState>({ loading: false, success: null, error: null });

  const toggleNotifyPosition = (position: string) => {
    setSelectedNotifyPositions(prev =>
      prev.includes(position)
        ? prev.filter(p => p !== position)
        : [...prev, position]
    );
  };

  const handleNotifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifyEmail) return;

    setFormState({ loading: true, success: null, error: null });
    try {
      const res = await fetch('/api/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Notification Request',
          email: notifyEmail,
          position: `Notify me when: ${selectedNotifyPositions.length > 0 ? selectedNotifyPositions.join(', ') : 'Any new position'}`,
          type: 'notify',
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setFormState({
        loading: false,
        success: `You're on the list! We'll notify you at ${notifyEmail} when positions you're interested in open up.`,
        error: null,
      });
      setNotifyEmail('');
      setSelectedNotifyPositions([]);
    } catch (err) {
      setFormState({ loading: false, success: null, error: err instanceof Error ? err.message : 'Something went wrong' });
    }
  };

  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-sm text-emerald-400 mb-6">
            <Users className="h-4 w-4" />
            We&apos;re Hiring
          </div>
          <h1 className="text-4xl font-bold text-white">Careers at VibeCode</h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Help us build the future of coding. Remote-first, globally distributed, and passionate about
            making developers more productive through AI-powered tools.
          </p>
        </div>

        {/* Perks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          {[
            { icon: Globe, title: 'Remote First', desc: 'Work from anywhere in the world. We believe great talent isn\'t limited by geography.' },
            { icon: Rocket, title: 'Ship Fast', desc: 'Small team, big impact. Your code reaches thousands of developers within days, not months.' },
            { icon: Heart, title: 'Open Source', desc: 'Work in the open. Contribute to a project that\'s free for everyone and built with the community.' },
          ].map((perk) => (
            <div key={perk.title} className="rounded-xl border border-white/5 bg-[#12121a] p-6 text-center">
              <perk.icon className="h-8 w-8 text-emerald-400 mx-auto mb-3" />
              <h3 className="text-sm font-semibold text-white">{perk.title}</h3>
              <p className="mt-1 text-xs text-gray-400">{perk.desc}</p>
            </div>
          ))}
        </div>

        {/* Open Positions */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Open Positions</h2>
          <div className="space-y-4">
            {OPEN_POSITIONS.map((job) => (
              <div
                key={job.id}
                className="rounded-xl border border-white/5 bg-[#12121a] p-5 hover:border-emerald-500/20 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{job.title}</h3>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-3.5 w-3.5" />
                        {job.team}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {job.location}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-400">{job.description}</p>
                  </div>
                  <a
                    href={`mailto:careers@vibecode.dev?subject=Application: ${job.title}`}
                    className="shrink-0 rounded-lg border border-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                  >
                    Apply
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notify Me Section */}
        <div className="max-w-2xl mx-auto">
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-8">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="h-6 w-6 text-emerald-400" />
              <h2 className="text-xl font-bold text-white">Get Notified When Positions Open</h2>
            </div>
            <p className="text-sm text-gray-400 mb-6">
              Don&apos;t see the role you&apos;re looking for? Enter your email and select the positions you&apos;re
              interested in. We&apos;ll notify you as soon as they become available.
            </p>

            <form onSubmit={handleNotifySubmit} className="space-y-4">
              <div>
                <label className="text-sm text-gray-300 block mb-1.5">Email Address *</label>
                <input
                  type="email"
                  required
                  value={notifyEmail}
                  onChange={(e) => setNotifyEmail(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-[#12121a] px-4 py-2.5 text-white placeholder-gray-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300 block mb-2">
                  Which positions are you interested in?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {NOTIFY_POSITIONS.map((position) => (
                    <button
                      key={position}
                      type="button"
                      onClick={() => toggleNotifyPosition(position)}
                      className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                        selectedNotifyPositions.includes(position)
                          ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400'
                          : 'border-white/10 bg-[#12121a] text-gray-400 hover:border-white/20'
                      }`}
                    >
                      {selectedNotifyPositions.includes(position) && (
                        <CheckCircle2 className="h-3 w-3 inline mr-1" />
                      )}
                      {position}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={formState.loading}
                className="w-full rounded-lg bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-black hover:bg-emerald-400 disabled:opacity-50 transition-colors"
              >
                {formState.loading ? 'Subscribing...' : 'Notify Me When Positions Open'}
                <ArrowRight className="inline h-4 w-4 ml-1" />
              </button>

              {formState.success && (
                <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3 text-sm text-emerald-400">
                  <CheckCircle2 className="h-4 w-4 inline mr-1" />
                  {formState.success}
                </div>
              )}
              {formState.error && (
                <p className="text-red-400 text-sm text-center">{formState.error}</p>
              )}
            </form>
          </div>
        </div>

        {/* General Application */}
        <div className="max-w-lg mx-auto mt-16">
          <h2 className="text-2xl font-bold text-white mb-2 text-center">General Application</h2>
          <p className="text-sm text-gray-400 text-center mb-6">
            Don&apos;t see a fit? Send us your info and we&apos;ll reach out when there&apos;s a match.
          </p>
          <form className="space-y-4" action="mailto:careers@vibecode.dev" method="POST">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1.5">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full rounded-lg border border-white/10 bg-[#12121a] px-4 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full rounded-lg border border-white/10 bg-[#12121a] px-4 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-1.5">Role Interested In</label>
              <input
                type="text"
                id="role"
                name="role"
                className="w-full rounded-lg border border-white/10 bg-[#12121a] px-4 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                placeholder="e.g. Frontend Engineer"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg border border-emerald-500/20 px-6 py-2.5 text-sm font-semibold text-emerald-400 hover:bg-emerald-500/10 transition-colors"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
