import { createFileRoute, Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight, ArrowDownRight, Sparkles, Activity, TrendingUp,
  AlertOctagon, Boxes, Wrench, ChevronRight,
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip,
  CartesianGrid, PieChart, Pie, Cell,
} from "recharts";
import { kpis, revenueSeries, categoryMix, skuForecast, anomalies } from "@/lib/mockData";

export const Route = createFileRoute("/app/")({
  component: Dashboard,
});

const GOLD = "#B8924A";
const GOLD_LIGHT = "#D4A96A";
const PIE_COLORS = [GOLD, "#6B8CFF", "#4CAF8A", "#E8A44A", "#888888"];

function KpiCard({ label, value, delta, tone }: { label: string; value: string; delta: string; tone: string }) {
  const up = !delta.startsWith("-");
  const isGold = tone === "gold";
  const isWarning = tone === "warning";
  const isSuccess = tone === "success";
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 hover:border-[#B8924A]/20 hover:bg-white/[0.03] transition-all">
      <div className="text-[10px] uppercase tracking-[0.22em] text-[#B0B0B0] mb-3">{label}</div>
      <div className={cn(
        "text-2xl font-semibold tracking-[-0.02em]",
        isGold ? "text-[#B8924A]" : isWarning ? "text-amber-400" : isSuccess ? "text-emerald-400" : "text-[#F2F0EB]"
      )}>
        {value}
      </div>
      <div className={cn(
        "mt-1.5 flex items-center gap-1 text-xs",
        up ? "text-emerald-400/80" : "text-red-400/80"
      )}>
        {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
        {delta}
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="space-y-6 max-w-7xl">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-[#B8924A] mb-1">Overview</div>
          <h1 className="text-2xl font-semibold text-[#F2F0EB] tracking-[-0.01em]">Operations Intelligence</h1>
          <p className="text-sm text-[#B0B0B0] mt-1">All channels · Real-time · Last updated 2 min ago</p>
        </div>
        <Link
          to="/app/copilot"
          className="inline-flex items-center gap-2 rounded-lg bg-[#B8924A] text-[#0A0A0A] text-xs font-semibold px-4 py-2.5 hover:bg-[#D4A96A] transition-colors shadow-glow-gold-sm"
        >
          <Sparkles className="h-3.5 w-3.5" /> Ask AI Copilot
        </Link>
      </div>

      {/* KPI grid */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {kpis.map((k) => (
          <KpiCard key={k.label} {...k} />
        ))}
      </section>

      {/* Main charts */}
      <section className="grid lg:grid-cols-3 gap-4">
        {/* Revenue + forecast chart */}
        <div className="lg:col-span-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-[#B0B0B0]">Revenue & forecast</div>
              <div className="mt-1 text-base font-semibold text-[#F2F0EB]">Next 60 days · all channels</div>
            </div>
            <div className="flex items-center gap-4 text-[10px] text-[#B0B0B0]">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#B8924A]" /> Actual
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#D4A96A]/50 border border-dashed border-[#D4A96A]" /> Forecast
              </span>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer>
              <AreaChart data={revenueSeries} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="gActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={GOLD} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={GOLD} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gForecast" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={GOLD_LIGHT} stopOpacity={0.2} />
                    <stop offset="100%" stopColor={GOLD_LIGHT} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="date" stroke="#B0B0B0" fontSize={10} axisLine={false} tickLine={false} minTickGap={40} />
                <YAxis stroke="#B0B0B0" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "#1C1C1C", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, fontSize: 11 }}
                  labelStyle={{ color: "#B0B0B0" }}
                />
                <Area type="monotone" dataKey="upper" stroke="none" fill={GOLD_LIGHT} fillOpacity={0.05} />
                <Area type="monotone" dataKey="lower" stroke="none" fill="#0A0A0A" fillOpacity={1} />
                <Area type="monotone" dataKey="actual" stroke={GOLD} strokeWidth={2} fill="url(#gActual)" dot={false} />
                <Area type="monotone" dataKey="forecast" stroke={GOLD_LIGHT} strokeWidth={2} strokeDasharray="5 3" fill="url(#gForecast)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category mix */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
          <div className="text-[10px] uppercase tracking-[0.22em] text-[#B0B0B0]">Category mix</div>
          <div className="mt-1 text-base font-semibold text-[#F2F0EB]">Demand share · 30d</div>
          <div className="mt-3 h-52">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={categoryMix} dataKey="value" innerRadius={52} outerRadius={80} paddingAngle={2}>
                  {categoryMix.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "#1C1C1C", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, fontSize: 11 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-2 space-y-1.5 text-xs">
            {categoryMix.map((c, i) => (
              <li key={c.name} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full shrink-0" style={{ background: PIE_COLORS[i] }} />
                <span className="flex-1 text-[#B0B0B0]">{c.name}</span>
                <span className="text-[#F2F0EB] tabular-nums">{c.value}%</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SKU watch + Anomaly pulse */}
      <section className="grid lg:grid-cols-3 gap-4">
        {/* SKU table */}
        <div className="lg:col-span-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-[#B0B0B0]">SKU watch</div>
              <div className="mt-1 text-base font-semibold text-[#F2F0EB]">Top forecast deltas</div>
            </div>
            <Link to="/app/forecasting" className="text-xs text-[#B8924A] hover:text-[#D4A96A] flex items-center gap-1 transition-colors">
              View all <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="overflow-hidden rounded-lg border border-white/[0.05]">
            <table className="w-full text-sm">
              <thead className="bg-white/[0.02]">
                <tr className="text-left">
                  <th className="py-2.5 px-3 text-[10px] uppercase tracking-[0.18em] text-[#B0B0B0] font-normal">SKU</th>
                  <th className="py-2.5 px-3 text-[10px] uppercase tracking-[0.18em] text-[#B0B0B0] font-normal">Region</th>
                  <th className="py-2.5 px-3 text-[10px] uppercase tracking-[0.18em] text-[#B0B0B0] font-normal text-right">Current</th>
                  <th className="py-2.5 px-3 text-[10px] uppercase tracking-[0.18em] text-[#B0B0B0] font-normal text-right">Predicted</th>
                  <th className="py-2.5 px-3 text-[10px] uppercase tracking-[0.18em] text-[#B0B0B0] font-normal">Risk</th>
                  <th className="py-2.5 px-3 text-[10px] uppercase tracking-[0.18em] text-[#B0B0B0] font-normal text-right">Conf.</th>
                </tr>
              </thead>
              <tbody>
                {skuForecast.map((r) => (
                  <tr key={r.sku} className="border-t border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                    <td className="py-2.5 px-3 font-medium text-[#F2F0EB]">{r.sku}</td>
                    <td className="py-2.5 px-3 text-[#B0B0B0]">{r.region}</td>
                    <td className="py-2.5 px-3 text-right tabular-nums text-[#B0B0B0]">{r.current.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right tabular-nums text-[#F2F0EB]">{r.predicted.toLocaleString()}</td>
                    <td className="py-2.5 px-3">
                      <span className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] border",
                        r.risk === "stockout" && "text-red-400 border-red-400/30 bg-red-400/[0.08]",
                        r.risk === "overstock" && "text-amber-400 border-amber-400/30 bg-amber-400/[0.08]",
                        r.risk === "healthy" && "text-emerald-400 border-emerald-400/30 bg-emerald-400/[0.08]",
                      )}>
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {r.risk}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right tabular-nums text-[#B0B0B0]">{(r.confidence * 100).toFixed(0)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Anomaly pulse */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-[#B0B0B0]">Live anomalies</div>
              <div className="mt-1 text-base font-semibold text-[#F2F0EB] flex items-center gap-2">
                <Activity className="h-4 w-4 text-red-400" /> Pulse
              </div>
            </div>
            <Link to="/app/anomaly" className="text-xs text-[#B8924A] hover:text-[#D4A96A] flex items-center gap-1 transition-colors">
              All <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <ul className="space-y-2">
            {anomalies.slice(0, 5).map((a) => (
              <li key={a.id} className="rounded-lg border border-white/[0.05] bg-white/[0.01] p-3 hover:border-white/[0.08] transition-colors">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "h-1.5 w-1.5 rounded-full shrink-0",
                    a.severity === "critical" && "bg-red-500 pulse-ring",
                    a.severity === "high" && "bg-red-400",
                    a.severity === "medium" && "bg-amber-400",
                    a.severity === "low" && "bg-[#B0B0B0]",
                  )} />
                  <div className="text-sm text-[#F2F0EB]">{a.type}</div>
                  <div className="ml-auto text-[10px] text-[#B0B0B0]">{a.time}</div>
                </div>
                <div className="mt-1 flex items-center justify-between text-xs text-[#B0B0B0]">
                  <span>{a.region}</span>
                  <span className="tabular-nums text-[#F2F0EB]/70">{a.delta}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* AI Weekly Insight banner */}
      <section className="rounded-xl border border-[#B8924A]/25 bg-[#B8924A]/[0.05] p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid pointer-events-none opacity-30 [mask-image:radial-gradient(ellipse_50%_50%_at_80%_50%,black,transparent)]" />
        <div className="relative flex flex-wrap items-center gap-6">
          <div className="rounded-lg border border-[#B8924A]/20 bg-[#B8924A]/[0.1] p-2.5">
            <Sparkles className="h-5 w-5 text-[#B8924A]" />
          </div>
          <div className="flex-1 min-w-[260px]">
            <div className="text-[10px] uppercase tracking-[0.22em] text-[#B8924A] mb-1">Weekly AI insight</div>
            <div className="text-base font-medium text-[#F2F0EB]">
              Festive demand is forming 3 weeks early in the South cluster — consider pulling forward 14% of allocation for Personal Care.
            </div>
          </div>
          <div className="flex gap-2">
            <button className="rounded-lg border border-white/[0.1] bg-white/[0.03] px-3 py-2 text-xs text-[#F2F0EB] hover:border-white/[0.2] transition-all">
              Dismiss
            </button>
            <Link
              to="/app/simulator"
              className="rounded-lg bg-[#B8924A] text-[#0A0A0A] px-3 py-2 text-xs font-semibold hover:bg-[#D4A96A] transition-colors shadow-glow-gold-sm"
            >
              Simulate impact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
