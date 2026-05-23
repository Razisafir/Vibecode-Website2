export default function PrivacyPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
          <p className="text-muted-foreground">Last updated: May 2025</p>

          <h2 className="text-xl font-semibold">1. Information We Collect</h2>
          <p className="text-muted-foreground">
            VibeCode is designed with privacy in mind. We collect minimal data necessary to provide our services.
            When you use VibeCode locally, your code stays on your machine and is never sent to our servers.
          </p>

          <h2 className="text-xl font-semibold">2. How We Use Your Information</h2>
          <p className="text-muted-foreground">
            Any data collected is used solely to improve our services. We do not sell, rent, or share
            your personal information with third parties.
          </p>

          <h2 className="text-xl font-semibold">3. Data Storage</h2>
          <p className="text-muted-foreground">
            All local code and project data remains on your device. Cloud sync features are opt-in only
            and encrypted end-to-end.
          </p>

          <h2 className="text-xl font-semibold">4. Your Rights</h2>
          <p className="text-muted-foreground">
            You have the right to access, modify, or delete your personal data at any time.
            Visit our <a href="/privacy/data-deletion" className="text-primary hover:underline">Data Deletion</a> page
            to request data removal.
          </p>

          <h2 className="text-xl font-semibold">5. Contact</h2>
          <p className="text-muted-foreground">
            For privacy-related inquiries, please contact us at privacy@vibecode.dev.
          </p>
        </div>
      </div>
    </div>
  );
}
