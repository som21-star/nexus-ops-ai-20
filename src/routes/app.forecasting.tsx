import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Sparkles, Download, ChevronRight, TrendingUp, TrendingDown, Minus } from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip,
  CartesianGrid, BarChart, Bar, Legend,
} from "recharts";
import { revenueSeries, skuForecast } from "@/lib/mockData";

export const Route = createFileRoute("/app/forecasting")({
  component: ForecastingPage,
});

const GOLD = "#B8924A";
const GOLD_LIGHT = "#D4A96A";

const skuOptions = ["All SKUs", "NX-AERO-01", "NX-FLUX-22", "NX-PULSE-09", "NX-ORBIT-14", "NX-NOVA-07", "NX-VANTA-31"];
const regionOptions = ["All Regions", "North", "South", "East", "West", "Central"];
const horizonOptions = ["30 days", "60 days", "90 days"];

const driverData = [
  { name: "Seasonality", value: 38, fill: GOLD },
  { name: "Trend", value: 27, fill: "#6B8CFF" },
  { name: "Promo effect", value: 18, fill: "#4CAF8A" },
  { name: "Price elasticity", value: 11, fill: "#E8A44A" },
  { name: "Residual", value: 6, fill: "#888" },
];

function ForecastingPage() {
  const [sku, setSku] = useState("All SKUs");
  const [region, setRegion] = useState("All Regions");
  const [horizon, setHorizon] = useState("60 days");

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-[#B8924A] mb-1">Intelligence · Forecasting</div>
          <h1 className="text-2xl font-semibold text-[#F2F0EB] tracking-[-0.01em]">Demand Forecasting</h1>
          <p className="text-sm text-[#B0B0B0] mt-1">Probabilistic forecasts with explainable confidence bands</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-2 text-xs text-[#B0B0B0] hover:border-[#B8924A]/30 hover:text-[#F2F0EB] transition-all">
            <Download className="h-3.5 w-3.5" /> Export
          </button>
          <Link
            to="/app/copilot"
            className="inline-flex items-center gap-2 rounded-lg bg-[#B8924A] text-[#0A0A0A] text-xs font-semibold px-3 py-2 hover:bg-[#D4A96A] transition-colors shadow-glow-gold-sm"
          >
            <Sparkles className="h-3.5 w-3.5" /> Explain forecast
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        {[
          { label: "SKU", options: skuOptions, value: sku, set: setSku },
          { label: "Region", options: regionOptions, value: region, set: setRegion },
          { label: "Horizon", options: horizonOptions, value: horizon, set: setHorizon },
        ].map((f) => (
          <div key={f.label} className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.18em] text-[#B0B0B0]">{f.label}</span>
            <select
              value={f.value}
              onChange={(e) => f.set(e.target.value)}
              className="rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-1.5 text-xs text-[#F2F0EB] focus:outline-none focus:border-[#B8924A]/40 transition-all"
            >
              {f.options.map((o) => <option key={o} value={o} className="bg-[#1C1C1C]">{o}</option>)}
            </select>
          </div>
        ))}
      </div>

      {/* Accuracy KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Forecast Accuracy (MAPE)", value: "94.2%", sub: "+1.8% vs last period", color: "gold" },
          { label: "Bias Score", value: "−0.3%", sub: "Near-zero bias", color: "success" },
          { label: "Confidence Interval", value: "±8.4%", sub: "80% coverage", color: "default" },
          { label: "SKUs at Risk", value: "37", sub: "Stockout probability > 40%", color: "warning" },
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

      {/* Main forecast chart */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-[#B0B0B0]">Demand forecast</div>
            <div className="mt-1 text-base font-semibold text-[#F2F0EB]">
              {sku} · {region} · Next {horizon}
            </div>
          </div>
          <div className="flex items-center gap-4 text-[10px] text-[#B0B0B0]">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#B8924A]" /> Actual</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#D4A96A]/50 border border-dashed border-[#D4A96A]" /> Forecast</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-white/10" /> 80% CI</span>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer>
            <AreaChart data={revenueSeries} margin={{ top: 4, right: 4, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="gA" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={GOLD} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={GOLD} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gF" x1="0" y1="0" x2="0" y2="1">
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
              <Area type="monotone" dataKey="upper" stroke="none" fill={GOLD_LIGHT} fillOpacity={0.08} />
              <Area type="monotone" dataKey="lower" stroke="none" fill="#0A0A0A" fillOpacity={1} />
              <Area type="monotone" dataKey="actual" stroke={GOLD} strokeWidth={2} fill="url(#gA)" dot={false} />
              <Area type="monotone" dataKey="forecast" stroke={GOLD_LIGHT} strokeWidth={2} strokeDasharray="5 3" fill="url(#gF)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Driver decomposition + SKU table */}
      <div className="grid lg:grid-cols-5 gap-4">
        {/* Driver chart */}
        <div className="lg:col-span-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
          <div className="text-[10px] uppercase tracking-[0.22em] text-[#B0B0B0] mb-1">Driver decomposition</div>
          <div className="text-base font-semibold text-[#F2F0EB] mb-4">Forecast contribution</div>
          <div className="h-52">
            <ResponsiveContainer>
              <BarChart data={driverData} layout="vertical" margin={{ left: 0, right: 8 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.04)" horizontal={false} />
                <XAxis type="number" stroke="#B0B0B0" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" stroke="#B0B0B0" fontSize={10} axisLine={false} tickLine={false} width={90} />
                <Tooltip
                  contentStyle={{ background: "#1C1C1C", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, fontSize: 11 }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {driverData.map((d, i) => (
                    <rect key={i} fill={d.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 space-y-1.5">
            {driverData.map((d) => (
              <div key={d.name} className="flex items-center gap-2 text-xs">
                <span className="h-2 w-2 rounded-full shrink-0" style={{ background: d.fill }} />
                <span className="flex-1 text-[#B0B0B0]">{d.name}</span>
                <span className="text-[#F2F0EB] tabular-nums">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* SKU forecast table */}
        <div className="lg:col-span-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-[#B0B0B0]">SKU-level forecasts</div>
              <div className="text-base font-semibold text-[#F2F0EB]">Predicted demand vs current</div>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-white/[0.05]">
            <table className="w-full text-sm">
              <thead className="bg-white/[0.02]">
                <tr>
                  <th className="py-2.5 px-3 text-left text-[10px] uppercase tracking-[0.18em] text-[#B0B0B0] font-normal">SKU</th>
                  <th className="py-2.5 px-3 text-left text-[10px] uppercase tracking-[0.18em] text-[#B0B0B0] font-normal">Region</th>
                  <th className="py-2.5 px-3 text-right text-[10px] uppercase tracking-[0.18em] text-[#B0B0B0] font-normal">Current</th>
                  <th className="py-2.5 px-3 text-right text-[10px] uppercase tracking-[0.18em] text-[#B0B0B0] font-normal">Predicted</th>
                  <th className="py-2.5 px-3 text-right text-[10px] uppercase tracking-[0.18em] text-[#B0B0B0] font-normal">Change</th>
                  <th className="py-2.5 px-3 text-center text-[10px] uppercase tracking-[0.18em] text-[#B0B0B0] font-normal">Risk</th>
                </tr>
              </thead>
              <tbody>
                {skuForecast.map((r) => {
                  const pct = ((r.predicted - r.current) / r.current * 100).toFixed(1);
                  const up = r.predicted > r.current;
                  return (
                    <tr key={r.sku} className="border-t border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                      <td className="py-2.5 px-3 font-medium text-[#F2F0EB]">{r.sku}</td>
                      <td className="py-2.5 px-3 text-[#B0B0B0]">{r.region}</td>
                      <td className="py-2.5 px-3 text-right tabular-nums text-[#B0B0B0]">{r.current.toLocaleString()}</td>
                      <td className="py-2.5 px-3 text-right tabular-nums text-[#F2F0EB]">{r.predicted.toLocaleString()}</td>
                      <td className="py-2.5 px-3 text-right">
                        <span className={cn("flex items-center justify-end gap-1 text-xs tabular-nums", up ? "text-emerald-400" : "text-red-400")}>
                          {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                          {up ? "+" : ""}{pct}%
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span className={cn(
                          "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] border",
                          r.risk === "stockout" && "text-red-400 border-red-400/30 bg-red-400/[0.08]",
                          r.risk === "overstock" && "text-amber-400 border-amber-400/30 bg-amber-400/[0.08]",
                          r.risk === "healthy" && "text-emerald-400 border-emerald-400/30 bg-emerald-400/[0.08]",
                        )}>
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                          {r.risk}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
