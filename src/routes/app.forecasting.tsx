import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Line, ComposedChart } from "recharts";
import { revenueSeries, skuForecast } from "@/lib/mockData";
import { Upload, Sparkles, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/forecasting")({
  component: Forecasting,
});

function Forecasting() {
  const [horizon, setHorizon] = useState("60d");
  const [granularity, setGranularity] = useState("SKU");
  return (
    <div className="space-y-6">
      <header>
        <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Forecasting</div>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">Demand forecast workspace</h1>
        <p className="mt-1 text-sm text-muted-foreground">Probabilistic forecasts with explainable drivers and confidence intervals.</p>
      </header>

      <div className="flex flex-wrap items-center gap-2">
        {(["SKU","Region","Category","Warehouse"] as const).map((g) => (
          <button key={g} onClick={() => setGranularity(g)} className={cn("rounded-md border px-3 py-1.5 text-xs transition",
            granularity === g ? "border-gold/50 bg-surface-elevated text-foreground" : "border-border bg-surface/40 text-muted-foreground hover:text-foreground")}>{g}</button>
        ))}
        <div className="ml-2 inline-flex rounded-md border border-border bg-surface/40 p-0.5">
          {["30d","60d","90d","180d"].map((h) => (
            <button key={h} onClick={() => setHorizon(h)} className={cn("px-2.5 py-1 text-xs rounded", horizon === h ? "bg-surface-elevated text-foreground" : "text-muted-foreground hover:text-foreground")}>{h}</button>
          ))}
        </div>
        <button className="ml-auto inline-flex items-center gap-2 rounded-md border border-border bg-surface/40 px-3 py-1.5 text-xs hover:border-gold/40 transition">
          <Filter className="h-3.5 w-3.5" /> Filters
        </button>
        <button className="inline-flex items-center gap-2 rounded-md bg-foreground text-background px-3 py-1.5 text-xs font-medium hover:opacity-90 transition">
          <Upload className="h-3.5 w-3.5" /> Upload CSV
        </button>
      </div>

      <div className="rounded-2xl border border-border bg-surface/40 p-5">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Total demand · {horizon}</div>
            <div className="mt-1 text-lg font-medium">Network rollup with seasonality + confidence band</div>
          </div>
          <div className="text-xs text-muted-foreground">Method: Prophet + ensemble · MAPE 5.8%</div>
        </div>
        <div className="mt-4 h-96">
          <ResponsiveContainer>
            <ComposedChart data={revenueSeries}>
              <defs>
                <linearGradient id="f1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.65 0.18 250)" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="oklch(0.65 0.18 250)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
              <XAxis dataKey="date" stroke="oklch(0.68 0.01 260)" fontSize={10} axisLine={false} tickLine={false} minTickGap={40} />
              <YAxis stroke="oklch(0.68 0.01 260)" fontSize={10} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "oklch(0.22 0.006 260)", border: "1px solid oklch(0.30 0.006 260)", borderRadius: 8, fontSize: 11 }} />
              <Area type="monotone" dataKey="upper" stroke="none" fill="oklch(0.82 0.13 85)" fillOpacity={0.10} />
              <Area type="monotone" dataKey="lower" stroke="none" fill="oklch(0.16 0.005 260)" fillOpacity={1} />
              <Area type="monotone" dataKey="actual" stroke="oklch(0.65 0.18 250)" strokeWidth={2} fill="url(#f1)" />
              <Line type="monotone" dataKey="forecast" stroke="oklch(0.82 0.13 85)" strokeWidth={2} dot={false} strokeDasharray="5 3" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-2xl border border-border bg-surface/40 p-5">
          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">SKU-level forecast</div>
          <div className="mt-4 overflow-hidden rounded-lg border border-border/60">
            <table className="w-full text-sm">
              <thead className="bg-background/40 text-xs text-muted-foreground">
                <tr className="text-left">
                  <th className="py-2.5 px-3 font-normal">SKU</th>
                  <th className="py-2.5 px-3 font-normal">Region</th>
                  <th className="py-2.5 px-3 font-normal text-right">Current</th>
                  <th className="py-2.5 px-3 font-normal text-right">Forecast</th>
                  <th className="py-2.5 px-3 font-normal text-right">Δ</th>
                  <th className="py-2.5 px-3 font-normal text-right">Confidence</th>
                </tr>
              </thead>
              <tbody>
                {skuForecast.map((r) => {
                  const delta = ((r.predicted - r.current) / r.current) * 100;
                  return (
                    <tr key={r.sku} className="border-t border-border/60 hover:bg-surface-elevated/40 transition">
                      <td className="py-2.5 px-3 font-medium">{r.sku}</td>
                      <td className="py-2.5 px-3 text-muted-foreground">{r.region}</td>
                      <td className="py-2.5 px-3 text-right tabular-nums text-muted-foreground">{r.current.toLocaleString()}</td>
                      <td className="py-2.5 px-3 text-right tabular-nums">{r.predicted.toLocaleString()}</td>
                      <td className={cn("py-2.5 px-3 text-right tabular-nums", delta > 0 ? "text-success" : "text-destructive")}>
                        {delta > 0 ? "+" : ""}{delta.toFixed(1)}%
                      </td>
                      <td className="py-2.5 px-3 text-right tabular-nums text-muted-foreground">{(r.confidence * 100).toFixed(0)}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-gold/30 bg-gradient-to-br from-surface-elevated to-surface p-5">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-gold"><Sparkles className="h-3.5 w-3.5" /> AI Explanation</div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Demand is shifting north-east driven by an early festive cycle and a competitor stockout in Beverages.
            Confidence is highest for <span className="text-foreground">NX-VANTA-31</span> (97%) — recommend pulling forward replenishment by 6 days.
          </p>
          <button className="mt-4 w-full rounded-md bg-foreground text-background py-2 text-xs font-medium hover:opacity-90 transition">
            Send to Optimization
          </button>
        </div>
      </div>
    </div>
  );
}
