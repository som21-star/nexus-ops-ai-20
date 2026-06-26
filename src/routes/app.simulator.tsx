import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { FlaskConical, Sparkles, RotateCcw } from "lucide-react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip,
  CartesianGrid, Legend,
} from "recharts";
import { simulatorBase } from "@/lib/mockData";

export const Route = createFileRoute("/app/simulator")({
  component: SimulatorPage,
});

const GOLD = "#B8924A";

function SimulatorPage() {
  const [price, setPrice] = useState(0);
  const [promo, setPromo] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [leadTime, setLeadTime] = useState(0);
  const [demand, setDemand] = useState(0);

  // simulatorBase: { revenue: 1420000, margin: 0.34, stockRisk: 37, demandIndex: 100 }
  const baseRevenue = simulatorBase.revenue;
  const baseMarginPct = simulatorBase.margin; // 0.34 = 34%
  const baseStockRisk = simulatorBase.stockRisk;
  const baseFillRate = 88; // derived constant

  const revenueMultiplier = 1 + (promo * 0.008) - (price * 0.004) + (demand * 0.005);
  const marginMultiplier = 1 - (promo * 0.003) - (price * 0.002);
  const stockRiskMultiplier = 1 - (inventory * 0.015) - (demand * 0.008) + (leadTime * 0.012);
  const fillRateMultiplier = 1 + (inventory * 0.008) - (leadTime * 0.006);

  const projRevenue = Math.round(baseRevenue * revenueMultiplier);
  const projMarginPct = Math.max(0, parseFloat((baseMarginPct * marginMultiplier * 100).toFixed(1)));
  const projStockRisk = Math.max(0, Math.round(baseStockRisk * stockRiskMultiplier));
  const projFillRate = Math.min(100, Math.round(baseFillRate * fillRateMultiplier));

  const revenueDelta = projRevenue - baseRevenue;
  const marginDelta = parseFloat((projMarginPct - baseMarginPct * 100).toFixed(1));

  const scenarioData = [
    {
      name: "Baseline",
      revenue: Math.round(baseRevenue / 1000),
      margin: Math.round(baseRevenue * baseMarginPct / 1000),
    },
    {
      name: "Scenario",
      revenue: Math.round(projRevenue / 1000),
      margin: Math.round(projRevenue * (projMarginPct / 100) / 1000),
    },
  ];

  const sliders = [
    { label: "Price change", unit: "%", value: price, set: setPrice, min: -20, max: 20, color: "#6B8CFF" },
    { label: "Promo intensity", unit: "%", value: promo, set: setPromo, min: 0, max: 30, color: GOLD },
    { label: "Inventory buffer", unit: "%", value: inventory, set: setInventory, min: -20, max: 40, color: "#4CAF8A" },
    { label: "Lead time change", unit: "d", value: leadTime, set: setLeadTime, min: -5, max: 10, color: "#E8A44A" },
    { label: "Demand shift", unit: "%", value: demand, set: setDemand, min: -15, max: 25, color: "#B0B0B0" },
  ];

  const reset = () => { setPrice(0); setPromo(0); setInventory(0); setLeadTime(0); setDemand(0); };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-[#B8924A] mb-1">Intelligence · Simulation</div>
          <h1 className="text-2xl font-semibold text-[#F2F0EB] tracking-[-0.01em] flex items-center gap-2">
            <FlaskConical className="h-5 w-5 text-[#B8924A]" />
            What-If Simulator
          </h1>
          <p className="text-sm text-[#B0B0B0] mt-1">Adjust parameters and watch outcomes respond in real time</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-2 text-xs text-[#B0B0B0] hover:border-white/[0.15] hover:text-[#F2F0EB] transition-all"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-[#B8924A] text-[#0A0A0A] text-xs font-semibold px-3 py-2 hover:bg-[#D4A96A] transition-colors shadow-glow-gold-sm">
            <Sparkles className="h-3.5 w-3.5" /> Save scenario
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-5">
        {/* Sliders panel */}
        <div className="lg:col-span-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
          <div className="text-[10px] uppercase tracking-[0.22em] text-[#B0B0B0] mb-1">Parameters</div>
          <div className="text-base font-semibold text-[#F2F0EB] mb-5">Adjust scenario variables</div>
          <div className="space-y-6">
            {sliders.map((s) => (
              <div key={s.label}>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs text-[#B0B0B0]">{s.label}</label>
                  <span className={cn(
                    "text-sm font-semibold tabular-nums",
                    s.value > 0 ? "text-emerald-400" : s.value < 0 ? "text-red-400" : "text-[#B0B0B0]"
                  )}>
                    {s.value > 0 ? "+" : ""}{s.value}{s.unit}
                  </span>
                </div>
                <input
                  type="range"
                  min={s.min}
                  max={s.max}
                  value={s.value}
                  onChange={(e) => s.set(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, ${s.color} ${((s.value - s.min) / (s.max - s.min)) * 100}%, rgba(255,255,255,0.08) ${((s.value - s.min) / (s.max - s.min)) * 100}%)`,
                    accentColor: s.color,
                  }}
                />
                <div className="flex justify-between text-[9px] text-white/20 mt-1">
                  <span>{s.min}{s.unit}</span>
                  <span>0</span>
                  <span>+{s.max}{s.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Outcomes panel */}
        <div className="lg:col-span-3 space-y-4">
          {/* KPI outcomes */}
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                label: "Projected revenue",
                base: `$${(baseRevenue / 1000000).toFixed(2)}M`,
                projected: `$${(projRevenue / 1000000).toFixed(2)}M`,
                deltaFmt: `${revenueDelta >= 0 ? "+" : ""}$${Math.abs(revenueDelta / 1000).toFixed(0)}k`,
                positive: revenueDelta >= 0,
              },
              {
                label: "Gross margin",
                base: `${(baseMarginPct * 100).toFixed(1)}%`,
                projected: `${projMarginPct}%`,
                deltaFmt: `${marginDelta >= 0 ? "+" : ""}${marginDelta}pp`,
                positive: marginDelta >= 0,
              },
              {
                label: "Stockout risk SKUs",
                base: `${baseStockRisk}`,
                projected: `${projStockRisk}`,
                deltaFmt: `${projStockRisk - baseStockRisk >= 0 ? "+" : ""}${projStockRisk - baseStockRisk}`,
                positive: projStockRisk <= baseStockRisk,
              },
              {
                label: "Fill rate",
                base: `${baseFillRate}%`,
                projected: `${projFillRate}%`,
                deltaFmt: `${projFillRate - baseFillRate >= 0 ? "+" : ""}${projFillRate - baseFillRate}%`,
                positive: projFillRate >= baseFillRate,
              },
            ].map((k) => (
              <div key={k.label} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <div className="text-[10px] uppercase tracking-[0.18em] text-[#B0B0B0] mb-2">{k.label}</div>
                <div className="flex items-end gap-3">
                  <div>
                    <div className="text-[10px] text-[#B0B0B0]">Baseline</div>
                    <div className="text-sm text-[#B0B0B0] tabular-nums">{k.base}</div>
                  </div>
                  <div className="text-[#B0B0B0] text-xs">→</div>
                  <div>
                    <div className="text-[10px] text-[#B0B0B0]">Scenario</div>
                    <div className="text-xl font-semibold text-[#F2F0EB] tabular-nums">{k.projected}</div>
                  </div>
                </div>
                <div className={cn("mt-2 text-xs font-medium tabular-nums", k.positive ? "text-emerald-400" : "text-red-400")}>
                  {k.deltaFmt}
                </div>
              </div>
            ))}
          </div>

          {/* Comparison chart */}
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
            <div className="text-[10px] uppercase tracking-[0.22em] text-[#B0B0B0] mb-1">Scenario comparison</div>
            <div className="text-base font-semibold text-[#F2F0EB] mb-4">Revenue & margin · baseline vs scenario ($k)</div>
            <div className="h-48">
              <ResponsiveContainer>
                <BarChart data={scenarioData} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis dataKey="name" stroke="#B0B0B0" fontSize={10} axisLine={false} tickLine={false} />
                  <YAxis stroke="#B0B0B0" fontSize={10} axisLine={false} tickLine={false}
                    tickFormatter={(v) => `$${v}k`} />
                  <Tooltip
                    contentStyle={{ background: "#1C1C1C", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, fontSize: 11 }}
                    formatter={(v: number) => [`$${v}k`]}
                  />
                  <Legend wrapperStyle={{ fontSize: 10, color: "#B0B0B0" }} />
                  <Bar dataKey="revenue" name="Revenue" fill={GOLD} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="margin" name="Margin" fill="#6B8CFF" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI insight */}
          <div className="rounded-xl border border-[#B8924A]/20 bg-[#B8924A]/[0.04] p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-3.5 w-3.5 text-[#B8924A]" />
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#B8924A]">AI scenario analysis</span>
            </div>
            <p className="text-sm text-[#F2F0EB]/80 leading-relaxed">
              {promo > 10
                ? `A ${promo}% promo intensity drives strong revenue uplift but compresses margin by ${(promo * 0.3).toFixed(1)}pp. Consider targeting high-velocity SKUs only to protect blended margin.`
                : price < -5
                  ? `A ${Math.abs(price)}% price reduction increases volume but reduces per-unit contribution. Recommend testing on price-elastic SKUs in South cluster first.`
                  : inventory > 15
                    ? `Increasing inventory buffer by ${inventory}% reduces stockout risk significantly but ties up additional working capital. Optimal buffer is 20–25% for current demand volatility.`
                    : "Adjust the parameters above to see AI-generated scenario analysis and recommendations in real time."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
