import { Check, X } from "lucide-react";

const comparisons = [
  { feature: "AI Completions", vibecode: true, cursor: true, copilot: true, vscode: false },
  { feature: "Local-First Privacy", vibecode: true, cursor: false, copilot: false, vscode: true },
  { feature: "Open Source", vibecode: true, cursor: false, copilot: false, vscode: true },
  { feature: "Multi-LLM Support", vibecode: true, cursor: true, copilot: false, vscode: false },
  { feature: "Free Tier", vibecode: true, cursor: true, copilot: true, vscode: true },
  { feature: "Extension Ecosystem", vibecode: true, cursor: true, copilot: true, vscode: true },
  { feature: "Built-in Terminal", vibecode: true, cursor: true, copilot: false, vscode: true },
];

export default function ComparePage() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold">Compare VibeCode</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            See how VibeCode stacks up against the competition.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Feature</th>
                <th className="text-center py-3 px-4 text-primary font-bold">VibeCode</th>
                <th className="text-center py-3 px-4">Cursor</th>
                <th className="text-center py-3 px-4">Copilot</th>
                <th className="text-center py-3 px-4">VS Code</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row) => (
                <tr key={row.feature} className="border-b">
                  <td className="py-3 px-4 text-sm">{row.feature}</td>
                  {[row.vibecode, row.cursor, row.copilot, row.vscode].map((val, i) => (
                    <td key={i} className="py-3 px-4 text-center">
                      {val ? (
                        <Check className="h-5 w-5 text-primary mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-muted-foreground mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
