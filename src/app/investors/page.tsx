import { TrendingUp, DollarSign, BarChart3 } from "lucide-react";

export default function InvestorsPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold">Investor Relations</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Building the future of AI-powered development tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
          {[
            { icon: TrendingUp, label: "Growth", value: "300% YoY" },
            { icon: DollarSign, label: "Revenue", value: "$5M ARR" },
            { icon: BarChart3, label: "Users", value: "100K+" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border p-6 text-center">
              <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Request Investor Kit</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
              <input type="text" id="name" name="name" required className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
              <input type="email" id="email" name="email" required className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="you@firm.com" />
            </div>
            <div>
              <label htmlFor="firm" className="block text-sm font-medium mb-2">Firm</label>
              <input type="text" id="firm" name="firm" className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Investment firm" />
            </div>
            <button type="submit" className="w-full rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
              Request Kit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
