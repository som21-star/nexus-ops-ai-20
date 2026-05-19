import { createFileRoute } from "@tanstack/react-router";
import { optimizations } from "@/lib/mockData";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Sparkles, Wrench } from "lucide-react";

export const Route = createFileRoute("/app/optimization")({
  component: Optimization,
});

const beforeAfter = [
  { k: "Stockout risk", before: 100, after: 62 },
  { k: "Holding cost", before: 100, after: 78 },
  { k: "Fill rate", before: 100, after: 116 },
  { k: "Working capital", before: 100, after: 84 },
];

function Optimization() {
  return (
    <div className="space-y-6">
      <header>
        <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Optimization engine</div>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">Recommended operational actions</h1>
        <p className="mt-1 text-sm text-muted-foreground">Constraint-aware reorder, allocation and safety-stock plans.</p>
      </header>

      <div className="grid lg:grid-cols-3 gap-4">
        {[
          { label: "Projected savings", value: "$20,160", note: "next 30 days" },
          { label: "Stockout risk reduction", value: "-38%", note: "vs current plan" },
          { label: "Actions ready", value: "12", note: "awaiting approval" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-surface/40 p-5">
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{s.label}</div>
            <div className="mt-2 text-3xl font-semibold tracking-tight text-gradient-gold">{s.value}</div>
            <div className="mt-1 text-xs text-muted-foreground">{s.note}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-surface/40 p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Recommendations</div>
              <div className="mt-1 text-lg font-medium flex items-center gap-2"><Wrench className="h-4 w-4 text-gold" /> Action queue</div>
            </div>
            <button className="rounded-md bg-foreground text-background px-3 py-1.5 text-xs font-medium hover:opacity-90 transition">Approve all</button>
          </div>
          <div className="mt-4 space-y-2.5">
            {optimizations.map((o) => (
              <div key={o.sku} className="rounded-xl border border-border/60 bg-background/40 p-4 flex flex-wrap items-center gap-4">
                <div className="min-w-[110px]">
                  <div className="text-sm font-medium">{o.sku}</div>
                  <div className="text-[11px] text-muted-foreground mt-0.5">{o.from} → {o.to}</div>
                </div>
                <div className="flex-1 min-w-[180px] text-sm">{o.action}</div>
                <div className="text-sm text-gold tabular-nums">{o.saving}</div>
                <div className="text-xs text-muted-foreground">{o.impact}</div>
                <div className="flex items-center gap-2">
                  <button className="rounded-md border border-border px-2.5 py-1 text-xs hover:border-gold/40 transition">Snooze</button>
                  <button className="rounded-md bg-electric text-accent-foreground px-2.5 py-1 text-xs font-medium hover:opacity-95 transition">Approve</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface/40 p-5">
          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Before vs after</div>
          <div className="mt-1 text-lg font-medium">Indexed (100 = current)</div>
          <div className="mt-4 h-64">
            <ResponsiveContainer>
              <BarChart data={beforeAfter}>
                <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
                <XAxis dataKey="k" stroke="oklch(0.68 0.01 260)" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis stroke="oklch(0.68 0.01 260)" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "oklch(0.22 0.006 260)", border: "1px solid oklch(0.30 0.006 260)", borderRadius: 8, fontSize: 11 }} />
                <Bar dataKey="before" fill="oklch(0.55 0.02 260)" radius={[4,4,0,0]} />
                <Bar dataKey="after" fill="oklch(0.82 0.13 85)" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 rounded-xl border border-gold/30 bg-surface-elevated p-4 text-sm leading-relaxed">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-gold"><Sparkles className="h-3 w-3" /> AI summary</div>
            <p className="mt-2 text-muted-foreground">Net effect: <span className="text-foreground">+16% fill rate</span>, <span className="text-foreground">−22% holding cost</span> and <span className="text-foreground">$20.1K savings</span> over the next 30 days.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
