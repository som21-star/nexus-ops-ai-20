import { createFileRoute } from "@tanstack/react-router";
import { anomalies } from "@/lib/mockData";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceDot } from "recharts";
import { AlertOctagon, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/anomaly")({
  component: Anomaly,
});

const series = Array.from({ length: 60 }).map((_, i) => {
  const v = 100 + Math.sin(i / 5) * 12 + (Math.random() - 0.5) * 6;
  const spike = i === 38 ? v + 60 : i === 22 ? v - 35 : v;
  return { i, v: Math.round(spike) };
});

const sevCls: Record<string,string> = {
  critical: "bg-destructive text-destructive-foreground",
  high: "bg-destructive/80 text-destructive-foreground",
  medium: "bg-warning text-background",
  low: "bg-muted text-muted-foreground",
};

function Anomaly() {
  return (
    <div className="space-y-6">
      <header>
        <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Anomaly detection</div>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">Always-on operational monitors</h1>
        <p className="mt-1 text-sm text-muted-foreground">Statistical + AI-driven detection across sales, stock and returns.</p>
      </header>

      <div className="rounded-2xl border border-border bg-surface/40 p-5">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Sales pulse</div>
            <div className="mt-1 text-lg font-medium flex items-center gap-2"><AlertOctagon className="h-4 w-4 text-destructive" /> 2 anomalies in last 60 days</div>
          </div>
          <div className="text-xs text-muted-foreground">Z-score &gt; 3.0 · model: nexora-detect-1</div>
        </div>
        <div className="mt-4 h-72">
          <ResponsiveContainer>
            <LineChart data={series}>
              <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
              <XAxis dataKey="i" stroke="oklch(0.68 0.01 260)" fontSize={10} axisLine={false} tickLine={false} />
              <YAxis stroke="oklch(0.68 0.01 260)" fontSize={10} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "oklch(0.22 0.006 260)", border: "1px solid oklch(0.30 0.006 260)", borderRadius: 8, fontSize: 11 }} />
              <Line type="monotone" dataKey="v" stroke="oklch(0.65 0.18 250)" strokeWidth={2} dot={false} />
              <ReferenceDot x={38} y={series[38].v} r={6} fill="oklch(0.62 0.23 25)" stroke="oklch(0.62 0.23 25)" />
              <ReferenceDot x={22} y={series[22].v} r={6} fill="oklch(0.78 0.16 75)" stroke="oklch(0.78 0.16 75)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-surface/40 p-5">
          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Anomaly timeline</div>
          <ul className="mt-4 space-y-2.5">
            {anomalies.map((a) => (
              <li key={a.id} className="rounded-xl border border-border/60 bg-background/40 p-4 flex items-center gap-4">
                <span className={cn("h-2.5 w-2.5 rounded-full", a.severity === "critical" && "bg-destructive pulse-ring", a.severity === "high" && "bg-destructive", a.severity === "medium" && "bg-warning", a.severity === "low" && "bg-muted-foreground")} />
                <div className="flex-1">
                  <div className="text-sm font-medium">{a.type}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{a.region} · {a.id}</div>
                </div>
                <div className="text-sm tabular-nums">{a.delta}</div>
                <span className={cn("rounded-full px-2 py-0.5 text-[10px] uppercase tracking-[0.15em]", sevCls[a.severity])}>{a.severity}</span>
                <div className="text-xs text-muted-foreground w-20 text-right">{a.time}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-gold/30 bg-gradient-to-br from-surface-elevated to-surface p-5">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-gold"><Sparkles className="h-3.5 w-3.5" /> AI root-cause</div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            The Delhi WH-2 stock break correlates with a 9-day lead-time slip from supplier <span className="text-foreground">VND-204</span>.
            Suggested action: switch 30% of NX-AERO-01 to backup supplier VND-118 for the next replenishment cycle.
          </p>
          <button className="mt-4 w-full rounded-md bg-foreground text-background py-2 text-xs font-medium hover:opacity-90 transition">Apply recommendation</button>
        </div>
      </div>
    </div>
  );
}
