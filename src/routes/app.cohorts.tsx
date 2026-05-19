import { createFileRoute } from "@tanstack/react-router";
import { cohorts } from "@/lib/mockData";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/app/cohorts")({
  component: Cohorts,
});

function heatColor(v: number) {
  const t = Math.min(1, v / 100);
  // gold scale with low-end charcoal
  return `oklch(${0.22 + t * 0.55} ${0.02 + t * 0.13} ${260 - t * 175})`;
}

function Cohorts() {
  const months = ["M0","M1","M2","M3","M4","M5","M6","M7"];
  return (
    <div className="space-y-6">
      <header>
        <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Cohort analytics</div>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">Retention & churn intelligence</h1>
        <p className="mt-1 text-sm text-muted-foreground">Repeat behaviour, decay curves and churn probability by acquisition cohort.</p>
      </header>

      <div className="grid lg:grid-cols-4 gap-3">
        {[
          { l: "Avg M1 retention", v: "62%" },
          { l: "Avg M3 retention", v: "34%" },
          { l: "Churn probability", v: "0.21" },
          { l: "Repeat rate", v: "48%" },
        ].map((k) => (
          <div key={k.l} className="rounded-xl border border-border bg-surface/50 p-4">
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{k.l}</div>
            <div className="mt-2 text-2xl font-semibold tracking-tight text-gradient-gold">{k.v}</div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-surface/40 p-5 overflow-x-auto">
        <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Retention heatmap</div>
        <table className="mt-4 w-full text-xs min-w-[640px]">
          <thead>
            <tr className="text-muted-foreground">
              <th className="text-left font-normal py-2 px-2">Cohort</th>
              <th className="text-left font-normal py-2 px-2">Size</th>
              {months.map((m) => <th key={m} className="text-center font-normal py-2 px-2">{m}</th>)}
            </tr>
          </thead>
          <tbody>
            {cohorts.map((row) => (
              <tr key={row.cohort} className="border-t border-border/60">
                <td className="py-2 px-2 font-medium">{row.cohort}</td>
                <td className="py-2 px-2 text-muted-foreground tabular-nums">{row.size.toLocaleString()}</td>
                {months.map((_, i) => {
                  const v = row.values[i];
                  return (
                    <td key={i} className="py-1 px-1">
                      {v != null ? (
                        <div className="h-9 rounded-md grid place-items-center text-foreground font-medium tabular-nums" style={{ background: heatColor(v) }}>
                          {v}%
                        </div>
                      ) : (
                        <div className="h-9 rounded-md bg-background/20 border border-border/40" />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-2xl border border-gold/30 bg-gradient-to-br from-surface-elevated to-surface p-5">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-gold"><Sparkles className="h-3.5 w-3.5" /> Segment insight</div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          The <span className="text-foreground">Jun</span> cohort decays 14% faster than the trailing average — driven by a lower second-order rate
          in Personal Care. Recommend a targeted winback at M2 with a 7% discount.
        </p>
      </div>
    </div>
  );
}
