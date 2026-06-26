import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Sparkles, Send, RotateCcw, ChevronRight } from "lucide-react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/app/copilot")({
  component: CopilotPage,
});

const GOLD = "#B8924A";

type Message = {
  role: "user" | "assistant";
  content: string;
  chart?: { data: { k: string; v: number }[]; label: string };
  actions?: string[];
};

const suggestions = [
  "Why did revenue drop 8% in South India last week?",
  "Which SKUs are at highest stockout risk this month?",
  "What happens if I run a 15% promo in North cluster?",
  "Show me the top 3 optimization opportunities right now",
  "Which cohort has the highest churn risk?",
];

const initialMessages: Message[] = [
  {
    role: "assistant",
    content: "Hello. I'm the Nexora AI Copilot — your agentic operations analyst. I have full context of your demand forecasts, anomaly signals, inventory positions, and cohort data.\n\nAsk me anything about your operations, or try one of the suggestions below.",
  },
];

const mockResponses: Record<string, Message> = {
  default: {
    role: "assistant",
    content: "I've analysed your question across all active data streams. Based on current signals:\n\n• Demand in South cluster is trending +14% above seasonal baseline\n• 3 SKUs show critical stockout risk within 7 days\n• The optimization engine has identified $48k in actionable savings\n\nWould you like me to drill into any of these areas?",
    actions: ["View anomalies", "Open optimizer", "Run simulation"],
  },
  revenue: {
    role: "assistant",
    content: "Three drivers explain the 8.1% revenue decline in South India last week:",
    chart: {
      data: [
        { k: "Stock break", v: 4.2 },
        { k: "Competitor promo", v: 2.6 },
        { k: "Returns surge", v: 1.3 },
      ],
      label: "Revenue impact (%)",
    },
    actions: ["Investigate stock break", "Simulate competitor response", "View returns data"],
  },
  stockout: {
    role: "assistant",
    content: "The 3 SKUs with highest stockout probability in the next 30 days are:\n\n1. **NX-AERO-01** (North) — 97% stockout probability, 1,200u deficit\n2. **NX-VANTA-31** (North) — 94% stockout probability, 380u deficit\n3. **NX-ORBIT-14** (East) — 91% stockout probability, 370u deficit\n\nThe optimization engine has pre-built reorder recommendations for all three.",
    actions: ["View reorder plans", "Approve all reorders", "Simulate air freight"],
  },
};

function getResponse(input: string): Message {
  const lower = input.toLowerCase();
  if (lower.includes("revenue") || lower.includes("drop") || lower.includes("decline")) return mockResponses.revenue;
  if (lower.includes("stockout") || lower.includes("risk") || lower.includes("sku")) return mockResponses.stockout;
  return mockResponses.default;
}

function CopilotPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = (text?: string) => {
    const q = (text ?? input).trim();
    if (!q) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: q }]);
    setLoading(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, getResponse(q)]);
      setLoading(false);
    }, 900);
  };

  const reset = () => { setMessages(initialMessages); setInput(""); };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem-4rem)] max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-[#B8924A] mb-1">Workspace · Copilot</div>
          <h1 className="text-2xl font-semibold text-[#F2F0EB] tracking-[-0.01em] flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#B8924A]" />
            AI Copilot
          </h1>
        </div>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-2 text-xs text-[#B0B0B0] hover:border-white/[0.15] hover:text-[#F2F0EB] transition-all"
        >
          <RotateCcw className="h-3.5 w-3.5" /> New chat
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-4">
        {messages.map((m, i) => (
          <div key={i} className={cn("flex gap-3", m.role === "user" ? "justify-end" : "justify-start")}>
            {m.role === "assistant" && (
              <div className="h-7 w-7 rounded-full bg-[#B8924A]/20 border border-[#B8924A]/30 flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="h-3.5 w-3.5 text-[#B8924A]" />
              </div>
            )}
            <div className={cn(
              "max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed",
              m.role === "user"
                ? "bg-white/[0.06] border border-white/[0.08] text-[#F2F0EB]"
                : "bg-white/[0.02] border border-white/[0.06] text-[#F2F0EB]/90"
            )}>
              <div className="whitespace-pre-line">{m.content}</div>
              {m.chart && (
                <div className="mt-4 h-36">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-[#B0B0B0] mb-2">{m.chart.label}</div>
                  <ResponsiveContainer>
                    <BarChart data={m.chart.data} margin={{ top: 0, right: 4, left: -20, bottom: 0 }}>
                      <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
                      <XAxis dataKey="k" stroke="#B0B0B0" fontSize={10} axisLine={false} tickLine={false} />
                      <YAxis hide />
                      <Tooltip
                        contentStyle={{ background: "#1C1C1C", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, fontSize: 11 }}
                      />
                      <Bar dataKey="v" fill={GOLD} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
              {m.actions && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {m.actions.map((a) => (
                    <button
                      key={a}
                      className="inline-flex items-center gap-1 rounded-md border border-[#B8924A]/30 bg-[#B8924A]/[0.07] px-2.5 py-1 text-[11px] text-[#B8924A] hover:bg-[#B8924A]/[0.12] transition-all"
                    >
                      {a} <ChevronRight className="h-3 w-3" />
                    </button>
                  ))}
                </div>
              )}
            </div>
            {m.role === "user" && (
              <div className="h-7 w-7 rounded-full bg-white/[0.06] border border-white/[0.1] flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[10px] font-semibold text-[#B0B0B0]">U</span>
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex gap-3 justify-start">
            <div className="h-7 w-7 rounded-full bg-[#B8924A]/20 border border-[#B8924A]/30 flex items-center justify-center shrink-0">
              <Sparkles className="h-3.5 w-3.5 text-[#B8924A]" />
            </div>
            <div className="rounded-xl px-4 py-3 bg-white/[0.02] border border-white/[0.06]">
              <div className="flex gap-1.5 items-center h-5">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-[#B8924A]/60 animate-bounce"
                    style={{ animationDelay: `${i * 150}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      {messages.length <= 1 && (
        <div className="mb-3 flex flex-wrap gap-2 shrink-0">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => send(s)}
              className="rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-2 text-xs text-[#B0B0B0] hover:border-[#B8924A]/30 hover:text-[#F2F0EB] hover:bg-[#B8924A]/[0.04] transition-all text-left"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="shrink-0 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
          placeholder="Ask about demand, anomalies, inventory, cohorts…"
          className="flex-1 rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 text-sm text-[#F2F0EB] placeholder:text-white/25 focus:outline-none focus:border-[#B8924A]/40 focus:bg-white/[0.05] transition-all"
        />
        <button
          onClick={() => send()}
          disabled={!input.trim() || loading}
          className="rounded-xl bg-[#B8924A] text-[#0A0A0A] px-4 py-3 hover:bg-[#D4A96A] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-glow-gold-sm"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-2 text-center text-[10px] text-white/20">
        Nexora Copilot · model nexora-ops-1 · confidence 0.91 avg
      </div>
    </div>
  );
}
