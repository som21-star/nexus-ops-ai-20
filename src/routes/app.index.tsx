import { createFileRoute, Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, BarChart, Bar, RadialBarChart, RadialBar,
} from "recharts";
import { ArrowUpRight, ArrowDownRight, Sparkles, Activity } from "lucide-react";
import { kpis, revenueSeries, categoryMix, anomalies, skuForecast } from "@/lib/mockData";

export const Route = createFileRoute("/app/")({
  component: Overview,
});

const toneCls: Record<string, string> = {
  gold: "text-gold", electric: "text-electric", warning: "text-warning", success: "text-success",
};

function Overview() {
  return (
    <div className="space-y-7">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Operational Intelligence</div>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">Good evening, operator.</h1>
          <p className="mt-1 text-sm text-muted-foreground">Here is what Nexora is watching across your network.</p>
        </div>
        <Link to="/app/copilot" className="inline-flex items-center gap-2 rounded-md border border-gold/40 bg-surface px-3.5 py-2 text-sm hover:bg-surface-elevated transition">
          <Sparkles className="h-4 w-4 text-gold" /> Ask the Copilot
        </Link>
      </header>

      <section className="grid grid-cols-2 lg:grid-cols-6 gap-3">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-xl border border-border bg-surface/50 p-4 hover:border-gold/30 transition">
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{k.label}</div>
            <div className={cn("mt-2 text-2xl font-semibold tracking-tight", toneCls[k.tone])}>{k.value}</div>
            <div className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
              {k.delta.startsWith("-") ? <ArrowDownRight className="h-3 w-3" /> : <ArrowUpRight className="h-3 w-3" />}
              {k.delta}
            </div>
          </div>
        ))}
      </section>

      <section className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-surface/40 p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Revenue & forecast</div>
              <div className="mt-1 text-lg font-medium">Next 60 days · all channels</div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-electric" /> Actual</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-gold" /> Forecast</span>
            </div>
          </div>
          <div className="mt-4 h-80">
            <ResponsiveContainer>
              <AreaChart data={revenueSeries}>
                <defs>
                  <linearGradient id="a1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.65 0.18 250)" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="oklch(0.65 0.18 250)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="a2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.82 0.13 85)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="oklch(0.82 0.13 85)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
                <XAxis dataKey="date" stroke="oklch(0.68 0.01 260)" fontSize={10} axisLine={false} tickLine={false} minTickGap={40} />
                <YAxis stroke="oklch(0.68 0.01 260)" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "oklch(0.22 0.006 260)", border: "1px solid oklch(0.30 0.006 260)", borderRadius: 8, fontSize: 11 }} />
                <Area type="monotone" dataKey="upper" stroke="none" fill="oklch(0.82 0.13 85)" fillOpacity={0.06} />
                <Area type="monotone" dataKey="lower" stroke="none" fill="oklch(0.16 0.005 260)" fillOpacity={1} />
                <Area type="monotone" dataKey="actual" stroke="oklch(0.65 0.18 250)" strokeWidth={2} fill="url(#a1)" />
                <Area type="monotone" dataKey="forecast" stroke="oklch(0.82 0.13 85)" strokeWidth={2} strokeDasharray="5 3" fill="url(#a2)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface/40 p-5">
          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Category mix</div>
          <div className="mt-1 text-lg font-medium">Demand share · 30d</div>
          <div className="mt-2 h-56">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={categoryMix} dataKey="value" innerRadius={55} outerRadius={85} paddingAngle={2}>
                  {categoryMix.map((_, i) => (
                    <Cell key={i} fill={["oklch(0.82 0.13 85)","oklch(0.65 0.18 250)","oklch(0.72 0.16 155)","oklch(0.78 0.16 75)","oklch(0.55 0.02 260)"][i]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "oklch(0.22 0.006 260)", border: "1px solid oklch(0.30 0.006 260)", borderRadius: 8, fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-3 space-y-1.5 text-xs">
            {categoryMix.map((c, i) => (
              <li key={c.name} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: ["oklch(0.82 0.13 85)","oklch(0.65 0.18 250)","oklch(0.72 0.16 155)","oklch(0.78 0.16 75)","oklch(0.55 0.02 260)"][i] }} />
                <span className="flex-1 text-muted-foreground">{c.name}</span>
                <span>{c.value}%</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-surface/40 p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">SKU watch</div>
              <div className="mt-1 text-lg font-medium">Top forecast deltas</div>
            </div>
            <Link to="/app/forecasting" className="text-xs text-muted-foreground hover:text-foreground">View all →</Link>
          </div>
          <div className="mt-4 overflow-hidden rounded-lg border border-border/60">
            <table className="w-full text-sm">
              <thead className="bg-background/40 text-xs text-muted-foreground">
                <tr className="text-left">
                  <th className="py-2.5 px-3 font-normal">SKU</th>
                  <th className="py-2.5 px-3 font-normal">Region</th>
                  <th className="py-2.5 px-3 font-normal text-right">Current</th>
                  <th className="py-2.5 px-3 font-normal text-right">Predicted</th>
                  <th className="py-2.5 px-3 font-normal">Risk</th>
                  <th className="py-2.5 px-3 font-normal text-right">Conf.</th>
                </tr>
              </thead>
              <tbody>
                {skuForecast.map((r) => (
                  <tr key={r.sku} className="border-t border-border/60 hover:bg-surface-elevated/40 transition">
                    <td className="py-2.5 px-3 font-medium">{r.sku}</td>
                    <td className="py-2.5 px-3 text-muted-foreground">{r.region}</td>
                    <td className="py-2.5 px-3 text-right tabular-nums text-muted-foreground">{r.current.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right tabular-nums">{r.predicted.toLocaleString()}</td>
                    <td className="py-2.5 px-3">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] border",
                        r.risk === "stockout" && "text-destructive border-destructive/40 bg-destructive/10",
                        r.risk === "overstock" && "text-warning border-warning/40 bg-warning/10",
                        r.risk === "healthy" && "text-success border-success/40 bg-success/10",
                      )}>
                        <span className="h-1.5 w-1.5 rounded-full bg-current" /> {r.risk}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right tabular-nums text-muted-foreground">{(r.confidence * 100).toFixed(0)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface/40 p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Live anomalies</div>
              <div className="mt-1 text-lg font-medium flex items-center gap-2">
                <Activity className="h-4 w-4 text-destructive" /> Pulse
              </div>
            </div>
            <Link to="/app/anomaly" className="text-xs text-muted-foreground hover:text-foreground">All →</Link>
          </div>
          <ul className="mt-4 space-y-2.5">
            {anomalies.slice(0, 5).map((a) => (
              <li key={a.id} className="rounded-lg border border-border/60 bg-background/40 p-3">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "h-1.5 w-1.5 rounded-full",
                    a.severity === "critical" && "bg-destructive pulse-ring",
                    a.severity === "high" && "bg-destructive",
                    a.severity === "medium" && "bg-warning",
                    a.severity === "low" && "bg-muted-foreground",
                  )} />
                  <div className="text-sm">{a.type}</div>
                  <div className="ml-auto text-xs text-muted-foreground">{a.time}</div>
                </div>
                <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{a.region}</span>
                  <span className="tabular-nums">{a.delta}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-2xl border border-gold/30 bg-gradient-to-br from-surface-elevated to-surface p-6 shadow-glow-gold/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_50%_50%_at_80%_50%,black,transparent)] pointer-events-none" />
        <div className="relative flex flex-wrap items-center gap-6">
          <Sparkles className="h-8 w-8 text-gold" />
          <div className="flex-1 min-w-[260px]">
            <div className="text-xs uppercase tracking-[0.22em] text-gold">Weekly AI insight</div>
            <div className="mt-1.5 text-lg font-medium">
              Festive demand is forming 3 weeks early in the South cluster — consider pulling forward 14% of allocation for Personal Care.
            </div>
          </div>
          <div className="flex gap-2">
            <button className="rounded-md border border-border bg-background/40 px-3 py-2 text-xs hover:border-gold/40 transition">Dismiss</button>
            <Link to="/app/simulator" className="rounded-md bg-foreground text-background px-3 py-2 text-xs font-medium hover:opacity-90 transition">Simulate impact</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
