import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Send, BarChart3 } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, CartesianGrid, Tooltip, YAxis } from "recharts";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/copilot")({
  component: Copilot,
});

type Msg = { role: "user" | "ai"; text: string; chart?: { k: string; v: number }[]; rec?: string; confidence?: number };

const seed: Msg[] = [
  { role: "user", text: "Which SKUs are most likely to stock out next week?" },
  {
    role: "ai",
    text: "Four SKUs sit above the 80% stockout-probability threshold for the next 7 days. NX-AERO-01 (North) and NX-VANTA-31 (North) carry the highest revenue exposure.",
    chart: [
      { k: "AERO-01", v: 92 }, { k: "VANTA-31", v: 89 }, { k: "ORBIT-14", v: 84 }, { k: "FLUX-22", v: 81 },
    ],
    rec: "Trigger optimisation: rebalance 1,200u from WH-Pune and pre-book air freight on VANTA-31.",
    confidence: 0.93,
  },
];

const suggestions = [
  "Why did revenue drop in South India last week?",
  "Predict festive season demand for Personal Care.",
  "What inventory should we reduce in WH-Mumbai?",
  "Simulate a 5% price cut on Beverages.",
];

function Copilot() {
  const [msgs, setMsgs] = useState<Msg[]>(seed);
  const [input, setInput] = useState("");

  function send(text: string) {
    if (!text.trim()) return;
    const userMsg: Msg = { role: "user", text };
    const aiMsg: Msg = {
      role: "ai",
      text: "Working on it — Nexora is correlating sales, stock and supplier data to draft an answer.",
      chart: [
        { k: "Driver A", v: Math.round(Math.random() * 60 + 20) },
        { k: "Driver B", v: Math.round(Math.random() * 60 + 10) },
        { k: "Driver C", v: Math.round(Math.random() * 60 + 5) },
      ],
      rec: "Route the result to Optimization for an executable plan.",
      confidence: 0.84 + Math.random() * 0.1,
    };
    setMsgs((m) => [...m, userMsg, aiMsg]);
    setInput("");
  }

  return (
    <div className="space-y-6">
      <header>
        <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">AI Copilot</div>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight flex items-center gap-3">
          <Sparkles className="h-7 w-7 text-gold" /> Ask Nexora
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Agentic analyst grounded in your operational data.</p>
      </header>

      <div className="grid lg:grid-cols-4 gap-4">
        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-surface/40 p-4">
            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Suggested questions</div>
            <ul className="mt-3 space-y-2">
              {suggestions.map((s) => (
                <li key={s}>
                  <button onClick={() => send(s)} className="w-full text-left rounded-md border border-border/60 bg-background/40 px-3 py-2 text-xs hover:border-gold/40 transition">
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-surface/40 p-4">
            <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Context</div>
            <ul className="mt-3 space-y-1.5 text-xs text-muted-foreground">
              <li>· Sales · 18 months</li>
              <li>· Inventory · 12 warehouses</li>
              <li>· Returns · last 90d</li>
              <li>· Supplier lead-times</li>
              <li>· Promotions calendar</li>
            </ul>
          </div>
        </aside>

        <section className="lg:col-span-3 rounded-2xl border border-border bg-surface/40 flex flex-col min-h-[640px]">
          <div className="flex-1 p-5 space-y-5 overflow-y-auto">
            {msgs.map((m, i) => (
              <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
                <div className={cn(
                  "max-w-2xl rounded-2xl px-4 py-3 text-sm",
                  m.role === "user"
                    ? "bg-foreground text-background"
                    : "border border-gold/30 bg-surface-elevated text-foreground"
                )}>
                  {m.role === "ai" && (
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-gold mb-2">
                      <Sparkles className="h-3 w-3" /> Nexora
                    </div>
                  )}
                  <div className="leading-relaxed">{m.text}</div>
                  {m.chart && (
                    <div className="mt-4 h-40 rounded-lg bg-background/40 border border-border/60 p-2">
                      <ResponsiveContainer>
                        <BarChart data={m.chart}>
                          <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
                          <XAxis dataKey="k" stroke="oklch(0.68 0.01 260)" fontSize={10} axisLine={false} tickLine={false} />
                          <YAxis hide />
                          <Tooltip contentStyle={{ background: "oklch(0.22 0.006 260)", border: "1px solid oklch(0.30 0.006 260)", borderRadius: 8, fontSize: 11 }} />
                          <Bar dataKey="v" fill="oklch(0.82 0.13 85)" radius={[4,4,0,0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                  {m.rec && (
                    <div className="mt-3 rounded-lg border border-border/60 bg-background/30 p-3 flex items-center gap-3">
                      <BarChart3 className="h-4 w-4 text-electric shrink-0" />
                      <div className="text-xs text-muted-foreground flex-1">{m.rec}</div>
                      <button className="text-xs rounded-md bg-foreground text-background px-2.5 py-1 font-medium hover:opacity-90">Run</button>
                    </div>
                  )}
                  {m.confidence != null && (
                    <div className="mt-3 text-[11px] text-muted-foreground">Confidence {(m.confidence * 100).toFixed(0)}% · 6 sources</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="border-t border-border p-3 flex items-center gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about your operation…"
              className="flex-1 bg-background/40 border border-border rounded-md px-3 py-2.5 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:border-gold/50 transition"
            />
            <button type="submit" className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground px-3.5 py-2.5 text-sm font-medium shadow-glow-gold hover:opacity-95 transition">
              <Send className="h-4 w-4" /> Send
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
