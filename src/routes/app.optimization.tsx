import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Wrench, Sparkles, Check, ChevronRight, ArrowRight, Zap } from "lucide-react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";
import { optimizations } from "@/lib/mockData";

export const Route = createFileRoute("/app/optimization")({
  component: OptimizationPage,
});

const GOLD = "#B8924A";

const savingsData = [
  { month: "Jan", savings: 180000 },
  { month: "Feb", savings: 210000 },
  { month: "Mar", savings: 195000 },
  { month: "Apr", savings: 260000 },
  { month: "May", savings: 310000 },
  { month: "Jun", savings: 285000 },
];

const categories = [
  { label: "Reorder Recommendations", count: 12, saving: "$48,200", priority: "high" },
  { label: "Warehouse Rebalancing", count: 7, saving: "$22,400", priority: "medium" },
  { label: "Safety Stock Adjustments", count: 5, saving: "$15,800", priority: "medium" },
  { label: "Expedited Shipments", count: 3, saving: "$8,600", priority: "low" },
];

function OptimizationPage() {
  const [approved, setApproved] = useState<Set<number>>(new Set());

  const toggleApprove = (i: number) => {
    setApproved((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-[#B8924A] mb-1">Intelligence · Optimization</div>
          <h1 className="text-2xl font-semibold text-[#F2F0EB] tracking-[-0.01em] flex items-center gap-2">
            <Wrench className="h-5 w-5 text-[#B8924A]" />
            Optimization Engine
          </h1>
          <p className="text-sm text-[#B0B0B0] mt-1">Reorder, allocation and safety-stock recommendations</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setApproved(new Set(optimizations.map((_, i) => i)))}
            className="inline-flex items-center gap-2 rounded-lg border border-[#B8924A]/30 bg-[#B8924A]/[0.06] px-3 py-2 text-xs text-[#B8924A] hover:bg-[#B8924A]/[0.1] transition-all"
          >
            <Check className="h-3.5 w-3.5" /> Approve all
          </button>
          <Link
            to="/app/copilot"
            className="inline-flex items-center gap-2 rounded-lg bg-[#B8924A] text-[#0A0A0A] text-xs font-semibold px-3 py-2 hover:bg-[#D4A96A] transition-colors shadow-glow-gold-sm"
          >
            <Sparkles className="h-3.5 w-3.5" /> AI recommendations
          </Link>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total potential savings", value: "$94,960", sub: "27 recommendations", color: "gold" },
          { label: "Stockout risk reduction", value: "−38%", sub: "After applying all", color: "success" },
          { label: "Capital freed", value: "$1.2M", sub: "Overstock rebalancing", color: "default" },
          { label: "Fill rate improvement", value: "+4.1%", sub: "Projected 30-day", color: "default" },
        ].map((k) => (
          <div key={k.label} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
            <div className="text-[10px] uppercase tracking-[0.18em] text-[#B0B0B0] mb-2">{k.label}</div>
            <div className={cn(
              "text-2xl font-semibold tracking-[-0.02em]",
              k.color === "gold" && "text-[#B8924A]",
              k.color === "success" && "text-emerald-400",
              k.color === "default" && "text-[#F2F0EB]",
            )}>{k.value}</div>
            <div className="text-[10px] text-[#B0B0B0] mt-1">{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Savings trend + category breakdown */}
      <div className="grid lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
          <div className="text-[10px] uppercase tracking-[0.22em] text-[#B0B0B0] mb-1">Savings realised</div>
          <div className="text-base font-semibold text-[#F2F0EB] mb-4">Monthly optimization impact</div>
          <div className="h-52">
            <ResponsiveContainer>
              <BarChart data={savingsData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="month" stroke="#B0B0B0" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis stroke="#B0B0B0" fontSize={10} axisLine={false} tickLine={false}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ background: "#1C1C1C", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, fontSize: 11 }}
                  formatter={(v: number) => [`$${(v / 1000).toFixed(0)}k`, "Savings"]}
                />
                <Bar dataKey="savings" fill={GOLD} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="lg:col-span-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
          <div className="text-[10px] uppercase tracking-[0.22em] text-[#B0B0B0] mb-1">By category</div>
          <div className="text-base font-semibold text-[#F2F0EB] mb-4">Recommendation breakdown</div>
          <ul className="space-y-3">
            {categories.map((c) => (
              <li key={c.label} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[#F2F0EB]">{c.label}</span>
                    <span className="text-[#B8924A] font-medium">{c.saving}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#B8924A]"
                      style={{ width: `${(parseInt(c.saving.replace(/[^0-9]/g, "")) / 50000) * 100}%` }}
                    />
                  </div>
                </div>
                <span className={cn(
                  "text-[10px] rounded-full px-2 py-0.5 border shrink-0",
                  c.priority === "high" && "text-red-400 border-red-400/30 bg-red-400/[0.08]",
                  c.priority === "medium" && "text-amber-400 border-amber-400/30 bg-amber-400/[0.08]",
                  c.priority === "low" && "text-[#B0B0B0] border-white/[0.1] bg-white/[0.02]",
                )}>{c.count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommendations table */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-[#B0B0B0]">Action queue</div>
            <div className="text-base font-semibold text-[#F2F0EB]">Pending recommendations</div>
          </div>
          <span className="text-xs text-[#B0B0B0]">{approved.size} of {optimizations.length} approved</span>
        </div>
        <div className="space-y-3">
          {optimizations.map((o, i) => (
            <div
              key={i}
              className={cn(
                "rounded-xl border p-4 transition-all",
                approved.has(i)
                  ? "border-emerald-400/20 bg-emerald-400/[0.04]"
                  : "border-white/[0.06] bg-white/[0.01] hover:border-[#B8924A]/20"
              )}
            >
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-[200px]">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className={cn("h-3.5 w-3.5", approved.has(i) ? "text-emerald-400" : "text-[#B8924A]")} />
                    <span className="text-sm font-medium text-[#F2F0EB]">{o.sku}</span>
                    <span className="text-xs text-[#B0B0B0]">·</span>
                    <span className="text-xs text-[#B0B0B0]">{o.action}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#B0B0B0]">
                    <span>{o.from}</span>
                    <ArrowRight className="h-3 w-3" />
                    <span>{o.to}</span>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-sm font-semibold text-[#B8924A]">{o.saving}</div>
                    <div className="text-[10px] text-[#B0B0B0]">savings</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-[#F2F0EB]">{o.impact}</div>
                    <div className="text-[10px] text-[#B0B0B0]">impact</div>
                  </div>
                  <button
                    onClick={() => toggleApprove(i)}
                    className={cn(
                      "rounded-lg px-3 py-1.5 text-xs font-medium transition-all",
                      approved.has(i)
                        ? "bg-emerald-400/10 text-emerald-400 border border-emerald-400/20"
                        : "bg-[#B8924A] text-[#0A0A0A] hover:bg-[#D4A96A] shadow-glow-gold-sm"
                    )}
                  >
                    {approved.has(i) ? "✓ Approved" : "Approve"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
