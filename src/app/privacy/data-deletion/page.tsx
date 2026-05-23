export default function DataDeletionPage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Data Deletion Request</h1>
        <div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
          <p className="text-muted-foreground">
            At VibeCode, we respect your right to control your personal data. You can request deletion
            of all your personal data from our systems at any time.
          </p>

          <h2 className="text-xl font-semibold">What Data Will Be Deleted</h2>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Account information (email, name, preferences)</li>
            <li>Sync settings and cloud-stored configurations</li>
            <li>Usage analytics and telemetry data</li>
            <li>Support tickets and correspondence</li>
          </ul>

          <h2 className="text-xl font-semibold">What Data Is Retained</h2>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Anonymized, aggregated analytics (cannot identify you)</li>
            <li>Financial records required by law</li>
          </ul>

          <h2 className="text-xl font-semibold">How to Request Deletion</h2>
          <p className="text-muted-foreground">
            Send an email to <span className="text-primary">privacy@vibecode.dev</span> with the subject line
            &quot;Data Deletion Request&quot; from the email address associated with your account.
            We will process your request within 30 days.
          </p>
        </div>
      </div>
    </div>
  );
}
