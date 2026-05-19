import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart2, Download } from "lucide-react";

export const Route = createFileRoute("/app/reports")({
  component: Reports,
});

const reports = [
  { name: "Weekly operations digest", date: "Generated 4h ago", size: "1.2 MB" },
  { name: "Festive demand outlook · Q4", date: "Yesterday", size: "3.4 MB" },
  { name: "Inventory health · WH network", date: "2d ago", size: "880 KB" },
  { name: "Anomaly review · September", date: "5d ago", size: "1.6 MB" },
];

function Reports() {
  return (
    <div className="space-y-6">
      <header>
        <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Reports</div>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">AI-generated operational reports</h1>
        <p className="mt-1 text-sm text-muted-foreground">Pre-built narratives for your team and leadership.</p>
      </header>
      <div className="rounded-2xl border border-border bg-surface/40 divide-y divide-border/60">
        {reports.map((r) => (
          <div key={r.name} className="flex items-center gap-4 p-5 hover:bg-surface-elevated/40 transition">
            <div className="h-10 w-10 rounded-lg border border-border bg-background/40 grid place-items-center">
              <FileBarChart2 className="h-4 w-4 text-gold" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">{r.name}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{r.date} · {r.size}</div>
            </div>
            <button className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-xs hover:border-gold/40 transition">
              <Download className="h-3.5 w-3.5" /> PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
