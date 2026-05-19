import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { simulatorBase } from "@/lib/mockData";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { FlaskConical, Sparkles } from "lucide-react";

export const Route = createFileRoute("/app/simulator")({
  component: Simulator;
});

function Slider({ label, value, min, max, step, suffix, onChange }: { label: string; value: number; min: number; max: number; step: number; suffix: string; onChange: (v: number) => void; }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="tabular-nums text-foreground">{value}{suffix}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))}
        className="mt-2 w-full accent-[oklch(0.82_0.13_85)]" />
    </div>
  );
}

function Simulator() {
  const [price, setPrice] = useState(0);
  const [promo, setPromo] = useState(0);
  const [inventory, setInventory] = useState(0);
  const [leadTime, setLeadTime] = useState(0);

  const results = useMemo(() => {
    // crude elasticity model
    const demandLift = -price * 1.6 + promo * 2.2 + inventory * 0.3 - leadTime * 1.1;
    const revenue = simulatorBase.revenue * (1 + (demandLift / 100) + price / 100);
    const margin = Math.max(0.1, simulatorBase.margin + (price / 100) * 0.6 - (promo / 100) * 0.4);
    const stockRisk = Math.max(0, simulatorBase.stockRisk - inventory * 0.6 + leadTime * 0.7 - promo * 0.1);
    const demandIndex = 100 + demandLift;
    return { demandLift, revenue, margin, stockRisk, demandIndex };
  }, [price, promo, inventory, leadTime]);

  const chart = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => {
      const base = 100 + Math.sin(i / 4) * 6;
      return {
        d: i,
        base: Math.round(base),
        sim: Math.round(base * (1 + results.demandLift / 100)),
      };
    });
  }, [results.demandLift]);

  return (
    <div className="space-y-6">
      <header>
        <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">What-if simulator</div>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">Run scenarios in real time</h1>
        <p className="mt-1 text-sm text-muted-foreground">Move levers, watch the network respond. Models update on every change.</p>
      </header>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-border bg-surface/40 p-5 space-y-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
            <FlaskConical className="h-3.5 w-3.5 text-gold" /> Levers
          </div>
          <Slider label="Price change" value={price} min={-20} max={20} step={1} suffix="%" onChange={setPrice} />
          <Slider label="Promotion intensity" value={promo} min={0} max={40} step={1} suffix="%" onChange={setPromo} />
          <Slider label="Inventory uplift" value={inventory} min={-20} max={40} step={1} suffix="%" onChange={setInventory} />
          <Slider label="Lead-time change" value={leadTime} min={-7} max={14} step={1} suffix="d" onChange={setLeadTime} />
          <button className="mt-2 w-full rounded-md border border-border bg-background/40 py-2 text-xs hover:border-gold/40 transition" onClick={() => { setPrice(0); setPromo(0); setInventory(0); setLeadTime(0); }}>
            Reset to baseline
          </button>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Revenue", value: `$${(results.revenue / 1_000_000).toFixed(2)}M`, tone: "text-electric" },
              { label: "Margin", value: `${(results.margin * 100).toFixed(1)}%`, tone: "text-gold" },
              { label: "Stock risk", value: `${results.stockRisk.toFixed(0)}`, tone: "text-warning" },
              { label: "Demand index", value: `${results.demandIndex.toFixed(0)}`, tone: "text-success" },
            ].map((k) => (
              <div key={k.label} className="rounded-xl border border-border bg-surface/50 p-4">
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{k.label}</div>
                <div className={`mt-1.5 text-2xl font-semibold tracking-tight ${k.tone}`}>{k.value}</div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-surface/40 p-5">
            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Demand response · next 30 days</div>
            <div className="mt-4 h-72">
              <ResponsiveContainer>
                <AreaChart data={chart}>
                  <defs>
                    <linearGradient id="s1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.65 0.18 250)" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="oklch(0.65 0.18 250)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="s2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.82 0.13 85)" stopOpacity={0.45} />
                      <stop offset="100%" stopColor="oklch(0.82 0.13 85)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
                  <XAxis dataKey="d" stroke="oklch(0.68 0.01 260)" fontSize={10} axisLine={false} tickLine={false} />
                  <YAxis stroke="oklch(0.68 0.01 260)" fontSize={10} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "oklch(0.22 0.006 260)", border: "1px solid oklch(0.30 0.006 260)", borderRadius: 8, fontSize: 11 }} />
                  <Area type="monotone" dataKey="base" stroke="oklch(0.55 0.02 260)" strokeWidth={1.5} fill="url(#s1)" />
                  <Area type="monotone" dataKey="sim" stroke="oklch(0.82 0.13 85)" strokeWidth={2} fill="url(#s2)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border border-gold/30 bg-gradient-to-br from-surface-elevated to-surface p-5">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-gold"><Sparkles className="h-3.5 w-3.5" /> AI commentary</div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              At these settings, demand shifts by <span className="text-foreground tabular-nums">{results.demandLift.toFixed(1)}%</span>.
              Margin holds above 32% while stock risk drops to {results.stockRisk.toFixed(0)}.
              Recommended: lock the scenario as a draft plan and route to Optimization for execution.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
