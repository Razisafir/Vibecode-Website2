// Careers page for VibeCode

const openings = [
  { title: "Senior Frontend Engineer", team: "Engineering", location: "Remote" },
  { title: "AI/ML Engineer", team: "AI Research", location: "Remote" },
  { title: "Product Designer", team: "Design", location: "Remote" },
  { title: "DevOps Engineer", team: "Infrastructure", location: "Remote" },
];

export default function CareersPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold">Careers at VibeCode</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Help us build the future of coding. Remote-first, globally.
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6">Open Positions</h2>
          <div className="space-y-4">
            {openings.map((job) => (
              <div key={job.title} className="rounded-xl border p-5 hover:shadow-lg transition-shadow flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{job.title}</h3>
                  <p className="text-sm text-muted-foreground">{job.team} &middot; {job.location}</p>
                </div>
                <button className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-accent transition-colors">
                  Apply
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">General Application</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
              <input type="text" id="name" name="name" required className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Your name" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
              <input type="email" id="email" name="email" required className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="you@example.com" />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium mb-2">Role Interested In</label>
              <input type="text" id="role" name="role" className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g. Frontend Engineer" />
            </div>
            <button type="submit" className="w-full rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
