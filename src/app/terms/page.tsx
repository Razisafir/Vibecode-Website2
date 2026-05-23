export default function TermsPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
          <p className="text-muted-foreground">Last updated: May 2025</p>

          <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground">
            By using VibeCode, you agree to these terms of service. If you do not agree, please do not use our services.
          </p>

          <h2 className="text-xl font-semibold">2. Use of Service</h2>
          <p className="text-muted-foreground">
            VibeCode is provided as-is for software development purposes. You are responsible for
            the code you write and the content you create using our tools.
          </p>

          <h2 className="text-xl font-semibold">3. Open Source License</h2>
          <p className="text-muted-foreground">
            The VibeCode editor is released under the MIT License. Extensions and plugins may
            have their own licenses.
          </p>

          <h2 className="text-xl font-semibold">4. Prohibited Uses</h2>
          <p className="text-muted-foreground">
            You may not use VibeCode for any illegal activities, to create malware, or to
            infringe on the intellectual property rights of others.
          </p>

          <h2 className="text-xl font-semibold">5. Limitation of Liability</h2>
          <p className="text-muted-foreground">
            VibeCode is provided without warranty. We are not liable for any damages arising
            from the use of our software.
          </p>

          <h2 className="text-xl font-semibold">6. Contact</h2>
          <p className="text-muted-foreground">
            For questions about these terms, please contact legal@vibecode.dev.
          </p>
        </div>
      </div>
    </div>
  );
}
