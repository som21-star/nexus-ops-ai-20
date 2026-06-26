import { createFileRoute } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Users, Sparkles, TrendingDown } from "lucide-react";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip,
  CartesianGrid, BarChart, Bar,
} from "recharts";
import { cohorts } from "@/lib/mockData";

export const Route = createFileRoute("/app/cohorts")({
  component: CohortsPage,
});

const GOLD = "#B8924A";

// Retention decay curve
const retentionCurve = cohorts[0].values.map((v, i) => ({
  month: `M+${i}`,
  retention: v,
  avg: Math.round(100 * Math.exp(-i * 0.25)),
}));

// Churn probability by segment
const churnData = [
  { segment: "New (0-30d)", churn: 42, color: "#E8A44A" },
  { segment: "Active (31-90d)", churn: 18, color: GOLD },
  { segment: "Loyal (91-180d)", churn: 8, color: "#4CAF8A" },
  { segment: "Champion (180d+)", churn: 3, color: "#6B8CFF" },
];

function getRetentionColor(value: number): string {
  if (value >= 80) return "bg-emerald-400/80 text-[#0A0A0A]";
  if (value >= 60) return "bg-emerald-400/50 text-[#F2F0EB]";
  if (value >= 40) return "bg-[#B8924A]/60 text-[#0A0A0A]";
  if (value >= 20) return "bg-[#B8924A]/30 text-[#F2F0EB]";
  if (value >= 10) return "bg-red-400/30 text-[#F2F0EB]";
  return "bg-red-400/15 text-[#B0B0B0]";
}

function CohortsPage() {
  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-[#B8924A] mb-1">Intelligence · Cohorts</div>
          <h1 className="text-2xl font-semibold text-[#F2F0EB] tracking-[-0.01em] flex items-center gap-2">
            <Users className="h-5 w-5 text-[#B8924A]" />
            Cohort & Retention Analysis
          </h1>
          <p className="text-sm text-[#B0B0B0] mt-1">Retention heatmaps, repeat-rate decay and churn probability</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-[#B8924A] text-[#0A0A0A] text-xs font-semibold px-3 py-2 hover:bg-[#D4A96A] transition-colors shadow-glow-gold-sm">
          <Sparkles className="h-3.5 w-3.5" /> Segment insights
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Avg. 90-day retention", value: "62%", sub: "+4% vs prior quarter", color: "gold" },
          { label: "Repeat purchase rate", value: "38%", sub: "All cohorts · 60d", color: "default" },
          { label: "Churn probability (30d)", value: "14%", sub: "High-risk: 2,840 customers", color: "warning" },
          { label: "LTV growth", value: "+18%", sub: "Champion segment", color: "success" },
        ].map((k) => (
          <div key={k.label} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <div className="text-[10px] uppercase tracking-[0.18em] text-[#B0B0B0] mb-2">{k.label}</div>
            <div className={cn(
              "text-2xl font-semibold tracking-[-0.02em]",
              k.color === "gold" && "text-[#B8924A]",
              k.color === "success" && "text-emerald-400",
              k.color === "warning" && "text-amber-400",
              k.color === "default" && "text-[#F2F0EB]",
            )}>{k.value}</div>
            <div className="text-[10px] text-[#B0B0B0] mt-1">{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Retention heatmap */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
        <div className="text-[10px] uppercase tracking-[0.22em] text-[#B0B0B0] mb-1">Retention heatmap</div>
        <div className="text-base font-semibold text-[#F2F0EB] mb-5">Monthly cohort retention · % returning customers</div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr>
                <th className="py-2 px-3 text-left text-[10px] uppercase tracking-[0.18em] text-[#B0B0B0] font-normal w-20">Cohort</th>
                <th className="py-2 px-2 text-center text-[10px] uppercase tracking-[0.18em] text-[#B0B0B0] font-normal">Size</th>
                {Array.from({ length: 8 }, (_, i) => (
                  <th key={i} className="py-2 px-1 text-center text-[10px] uppercase tracking-[0.18em] text-[#B0B0B0] font-normal">
                    M+{i}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cohorts.map((row) => (
                <tr key={row.cohort} className="border-t border-white/[0.04]">
                  <td className="py-2 px-3 font-medium text-[#F2F0EB]">{row.cohort}</td>
                  <td className="py-2 px-2 text-center text-[#B0B0B0] tabular-nums">{row.size.toLocaleString()}</td>
                  {row.values.map((v, i) => (
                    <td key={i} className="py-1.5 px-1">
                      <div className={cn(
                        "rounded-md text-center py-1.5 px-1 font-medium tabular-nums text-[11px] transition-all",
                        getRetentionColor(v)
                      )}>
                        {v}%
                      </div>
                    </td>
                  ))}
                  {/* Pad empty cells */}
                  {Array.from({ length: 8 - row.values.length }, (_, i) => (
                    <td key={`empty-${i}`} className="py-1.5 px-1">
                      <div className="rounded-md py-1.5 px-1 bg-white/[0.01]" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex items-center gap-3 text-[10px] text-[#B0B0B0]">
          <span>Legend:</span>
          {[
            { label: "≥ 80%", cls: "bg-emerald-400/80" },
            { label: "60–79%", cls: "bg-emerald-400/50" },
            { label: "40–59%", cls: "bg-[#B8924A]/60" },
            { label: "20–39%", cls: "bg-[#B8924A]/30" },
            { label: "< 20%", cls: "bg-red-400/30" },
          ].map((l) => (
            <span key={l.label} className="flex items-center gap-1.5">
              <span className={cn("h-3 w-3 rounded-sm", l.cls)} />
              {l.label}
            </span>
          ))}
        </div>
      </div>

      {/* Retention decay + churn */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Retention decay curve */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
          <div className="flex items-center gap-2 mb-1">
            <TrendingDown className="h-4 w-4 text-[#B8924A]" />
            <div className="text-[10px] uppercase tracking-[0.22em] text-[#B0B0B0]">Retention decay</div>
          </div>
          <div className="text-base font-semibold text-[#F2F0EB] mb-4">Jan cohort vs average</div>
          <div className="h-52">
            <ResponsiveContainer>
              <LineChart data={retentionCurve} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="month" stroke="#B0B0B0" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis stroke="#B0B0B0" fontSize={10} axisLine={false} tickLine={false} domain={[0, 100]}
                  tickFormatter={(v) => `${v}%`} />
                <Tooltip
                  contentStyle={{ background: "#1C1C1C", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, fontSize: 11 }}
                  formatter={(v: number) => [`${v}%`]}
                />
                <Line type="monotone" dataKey="retention" stroke={GOLD} strokeWidth={2} dot={{ fill: GOLD, r: 3 }} name="Jan cohort" />
                <Line type="monotone" dataKey="avg" stroke="rgba(255,255,255,0.2)" strokeWidth={1.5} strokeDasharray="4 3" dot={false} name="Average" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Churn by segment */}
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
          <div className="text-[10px] uppercase tracking-[0.22em] text-[#B0B0B0] mb-1">Churn probability</div>
          <div className="text-base font-semibold text-[#F2F0EB] mb-4">30-day churn risk by segment</div>
          <div className="h-52">
            <ResponsiveContainer>
              <BarChart data={churnData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="segment" stroke="#B0B0B0" fontSize={9} axisLine={false} tickLine={false} />
                <YAxis stroke="#B0B0B0" fontSize={10} axisLine={false} tickLine={false}
                  tickFormatter={(v) => `${v}%`} />
                <Tooltip
                  contentStyle={{ background: "#1C1C1C", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, fontSize: 11 }}
                  formatter={(v: number) => [`${v}%`, "Churn risk"]}
                />
                <Bar dataKey="churn" radius={[4, 4, 0, 0]}>
                  {churnData.map((d, i) => (
                    <rect key={i} fill={d.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* AI insight */}
      <div className="rounded-xl border border-[#B8924A]/20 bg-[#B8924A]/[0.04] p-5">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-4 w-4 text-[#B8924A]" />
          <span className="text-[10px] uppercase tracking-[0.18em] text-[#B8924A]">AI cohort insight</span>
        </div>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-[#F2F0EB]/80">
          <div>
            <div className="font-medium text-[#F2F0EB] mb-1">Retention inflection at M+2</div>
            <p className="text-xs leading-relaxed text-[#B0B0B0]">
              Cohorts that receive a personalised reorder nudge at M+2 show 23% higher 90-day retention than those that do not.
            </p>
          </div>
          <div>
            <div className="font-medium text-[#F2F0EB] mb-1">High-risk segment: New customers</div>
            <p className="text-xs leading-relaxed text-[#B0B0B0]">
              42% of customers acquired in the last 30 days are at churn risk. Recommend a targeted win-back campaign within 7 days.
            </p>
          </div>
          <div>
            <div className="font-medium text-[#F2F0EB] mb-1">Champion segment opportunity</div>
            <p className="text-xs leading-relaxed text-[#B0B0B0]">
              Champion customers (180d+) show 18% LTV growth. Expanding this segment by 10% would add ~$340k annual revenue.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
