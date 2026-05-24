import { Check, Sparkles } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    description: "Perfect for individual developers and hobbyists. Full IDE capabilities at zero cost.",
    features: ["AI completions & suggestions", "Full Git integration", "Open VSX extensions", "Integrated terminal", "Community support", "Auto-updates"],
    cta: "Download Free",
    ctaLink: "/downloads",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "/month",
    description: "For professional developers who need priority AI and advanced features. Coming soon.",
    features: ["Everything in Free", "Priority AI model (faster, smarter)", "Unlimited AI execution runs", "Private repository support", "Email support", "Custom AI workflows"],
    cta: "Coming Soon",
    ctaLink: "/careers",
    highlighted: true,
  },
  {
    name: "Team",
    price: "$29",
    period: "/seat/month",
    description: "For teams that need collaboration, shared settings, and enterprise features. Coming soon.",
    features: ["Everything in Pro", "Team collaboration tools", "Shared settings & extensions", "Admin dashboard", "SSO & SAML integration", "Dedicated support"],
    cta: "Coming Soon",
    ctaLink: "/careers",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white">Pricing</h1>
          <p className="mt-4 text-lg text-gray-400">
            Start free. Scale when you&apos;re ready. No surprises.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl border p-6 bg-[#12121a] ${
                plan.highlighted
                  ? "border-emerald-500/30 shadow-lg shadow-emerald-500/5 scale-105"
                  : "border-white/5 hover:border-emerald-500/20"
              } transition-all`}
            >
              {plan.highlighted && (
                <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400 mb-3">
                  <Sparkles className="h-3 w-3" />
                  Most Popular
                </div>
              )}
              <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
              <p className="text-sm text-gray-400 mt-1">{plan.description}</p>
              <div className="mt-4">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-gray-400">{plan.period}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                    <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.ctaLink}
                className={`mt-8 block w-full rounded-lg py-2.5 text-sm font-semibold text-center transition-colors ${
                  plan.highlighted
                    ? "bg-emerald-500 text-black hover:bg-emerald-400"
                    : "border border-white/10 text-white hover:border-emerald-500/20 hover:bg-emerald-500/5"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-gray-400 max-w-2xl mx-auto">
          <p>
            VibeCode is and will always be free and open source. Pro and Team plans add
            premium AI features and collaboration tools. No feature from the Free tier will ever be paywalled.
          </p>
        </div>
      </div>
    </div>
  );
}
