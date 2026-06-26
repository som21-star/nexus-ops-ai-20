import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { AlertOctagon, Sparkles, Filter, ChevronRight, Activity } from "lucide-react";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip,
  CartesianGrid, ReferenceLine,
} from "recharts";
import { revenueSeries, anomalies } from "@/lib/mockData";

export const Route = createFileRoute("/app/anomaly")({
  component: AnomalyPage,
});

const GOLD = "#B8924A";

const severityFilters = ["All", "Critical", "High", "Medium", "Low"];

// Generate anomaly timeline data
const timelineData = revenueSeries.slice(60, 120).map((d, i) => ({
  ...d,
  zscore: Math.sin(i * 0.4) * 1.8 + Math.cos(i * 0.7) * 0.9,
  threshold: 2.5,
  threshold_neg: -2.5,
}));

function AnomalyPage() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<string | null>("A-1041");

  const filtered = filter === "All"
    ? anomalies
    : anomalies.filter((a) => a.severity.toLowerCase() === filter.toLowerCase());

  const sel = anomalies.find((a) => a.id === selected);

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-[#B8924A] mb-1">Intelligence · Anomaly</div>
          <h1 className="text-2xl font-semibold text-[#F2F0EB] tracking-[-0.01em] flex items-center gap-2">
            <Activity className="h-5 w-5 text-red-400" />
            Anomaly Detection
          </h1>
          <p className="text-sm text-[#B0B0B0] mt-1">Always-on monitors · Z-score + ML classification</p>
        </div>
        <Link
          to="/app/copilot"
          className="inline-flex items-center gap-2 rounded-lg bg-[#B8924A] text-[#0A0A0A] text-xs font-semibold px-3 py-2 hover:bg-[#D4A96A] transition-colors shadow-glow-gold-sm"
        >
          <Sparkles className="h-3.5 w-3.5" /> Investigate with AI
        </Link>
      </div>

      {/* Status KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Active anomalies", value: "5", sub: "2 critical", color: "red" },
          { label: "Detection latency", value: "< 15m", sub: "Real-time stream", color: "gold" },
          { label: "False positive rate", value: "2.1%", sub: "Below 5% target", color: "success" },
          { label: "Auto-resolved (7d)", value: "18", sub: "72% resolution rate", color: "default" },
        ].map((k) => (
          <div key={k.label} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <div className="text-[10px] uppercase tracking-[0.18em] text-[#B0B0B0] mb-2">{k.label}</div>
            <div className={cn(
              "text-2xl font-semibold tracking-[-0.02em]",
              k.color === "red" && "text-red-400",
              k.color === "gold" && "text-[#B8924A]",
              k.color === "success" && "text-emerald-400",
              k.color === "default" && "text-[#F2F0EB]",
            )}>{k.value}</div>
            <div className="text-[10px] text-[#B0B0B0] mt-1">{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Z-score timeline */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-[#B0B0B0]">Anomaly signal</div>
            <div className="text-base font-semibold text-[#F2F0EB]">Z-score over time · all channels</div>
          </div>
          <div className="flex items-center gap-4 text-[10px] text-[#B0B0B0]">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#B8924A]" /> Z-score</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-red-400/50" /> ±2.5σ threshold</span>
          </div>
        </div>
        <div className="h-56">
          <ResponsiveContainer>
            <LineChart data={timelineData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="date" stroke="#B0B0B0" fontSize={10} axisLine={false} tickLine={false} minTickGap={40} />
              <YAxis stroke="#B0B0B0" fontSize={10} axisLine={false} tickLine={false} domain={[-4, 4]} />
              <Tooltip
                contentStyle={{ background: "#1C1C1C", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, fontSize: 11 }}
                labelStyle={{ color: "#B0B0B0" }}
              />
              <ReferenceLine y={2.5} stroke="rgba(239,68,68,0.4)" strokeDasharray="4 3" />
              <ReferenceLine y={-2.5} stroke="rgba(239,68,68,0.4)" strokeDasharray="4 3" />
              <ReferenceLine y={0} stroke="rgba(255,255,255,0.08)" />
              <Line type="monotone" dataKey="zscore" stroke={GOLD} strokeWidth={1.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Anomaly list + detail */}
      <div className="grid lg:grid-cols-5 gap-4">
        {/* List */}
        <div className="lg:col-span-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="text-base font-semibold text-[#F2F0EB]">Active alerts</div>
            <div className="flex gap-1.5">
              {severityFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "rounded-md px-2 py-1 text-[10px] transition-all",
                    filter === f
                      ? "bg-[#B8924A]/20 text-[#B8924A] border border-[#B8924A]/30"
                      : "text-[#B0B0B0] hover:text-[#F2F0EB] border border-transparent"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <ul className="space-y-2">
            {filtered.map((a) => (
              <li
                key={a.id}
                onClick={() => setSelected(a.id)}
                className={cn(
                  "rounded-lg border p-3.5 cursor-pointer transition-all",
                  selected === a.id
                    ? "border-[#B8924A]/30 bg-[#B8924A]/[0.06]"
                    : "border-white/[0.05] bg-white/[0.01] hover:border-white/[0.08]"
                )}
              >
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "h-2 w-2 rounded-full shrink-0",
                    a.severity === "critical" && "bg-red-500 pulse-ring",
                    a.severity === "high" && "bg-red-400",
                    a.severity === "medium" && "bg-amber-400",
                    a.severity === "low" && "bg-[#B0B0B0]",
                  )} />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-[#F2F0EB]">{a.type}</div>
                    <div className="text-[10px] text-[#B0B0B0] mt-0.5">{a.region}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-[#F2F0EB]">{a.delta}</div>
                    <div className="text-[10px] text-[#B0B0B0]">{a.time}</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Detail panel */}
        <div className="lg:col-span-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
          {sel ? (
            <>
              <div className="flex items-start justify-between mb-5">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-[#B0B0B0] mb-1">Anomaly · {sel.id}</div>
                  <div className="text-xl font-semibold text-[#F2F0EB]">{sel.type}</div>
                  <div className="text-sm text-[#B0B0B0] mt-1">{sel.region}</div>
                </div>
                <span className={cn(
                  "rounded-full px-2.5 py-1 text-xs border",
                  sel.severity === "critical" && "text-red-400 border-red-400/30 bg-red-400/[0.08]",
                  sel.severity === "high" && "text-red-400 border-red-400/30 bg-red-400/[0.08]",
                  sel.severity === "medium" && "text-amber-400 border-amber-400/30 bg-amber-400/[0.08]",
                  sel.severity === "low" && "text-[#B0B0B0] border-white/[0.1] bg-white/[0.02]",
                )}>
                  {sel.severity}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-5">
                {[
                  { label: "Deviation", value: sel.delta },
                  { label: "Detected", value: sel.time },
                  { label: "Confidence", value: "0.94" },
                  { label: "Affected units", value: "~2,400" },
                ].map((d) => (
                  <div key={d.label} className="rounded-lg border border-white/[0.05] bg-white/[0.01] p-3">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-[#B0B0B0]">{d.label}</div>
                    <div className="text-base font-semibold text-[#F2F0EB] mt-1">{d.value}</div>
                  </div>
                ))}
              </div>
              <div className="rounded-lg border border-[#B8924A]/20 bg-[#B8924A]/[0.04] p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-3.5 w-3.5 text-[#B8924A]" />
                  <span className="text-[10px] uppercase tracking-[0.18em] text-[#B8924A]">AI root-cause analysis</span>
                </div>
                <p className="text-sm text-[#F2F0EB]/80 leading-relaxed">
                  The {sel.type.toLowerCase()} in {sel.region} is likely driven by a combination of seasonal demand acceleration
                  and a 3-day supplier lead-time slip. Historical patterns suggest a {sel.delta} deviation is expected
                  to persist for 4–6 days without intervention. Recommend immediate reorder trigger.
                </p>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 rounded-lg border border-white/[0.1] bg-white/[0.02] py-2 text-xs text-[#F2F0EB] hover:border-white/[0.2] transition-all">
                  Acknowledge
                </button>
                <Link
                  to="/app/optimization"
                  className="flex-1 rounded-lg bg-[#B8924A] text-[#0A0A0A] py-2 text-xs font-semibold text-center hover:bg-[#D4A96A] transition-colors shadow-glow-gold-sm"
                >
                  Create optimization
                </Link>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-[#B0B0B0] text-sm">
              Select an anomaly to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
