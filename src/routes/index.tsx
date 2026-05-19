import { createFileRoute, Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import {
  ArrowRight, Sparkles, Activity, Boxes, AlertOctagon, FlaskConical,
  Users, BrainCircuit, ShieldCheck, Zap, TrendingUp, MessageSquare,
  Workflow, Database, LineChart as LineChartIcon, Check,
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
  LineChart, Line, BarChart, Bar,
} from "recharts";
import { revenueSeries } from "@/lib/mockData";

export const Route = createFileRoute("/")({
  component: Landing,
});

const capabilities = [
  { icon: TrendingUp, title: "Demand Forecasting", desc: "Probabilistic forecasts by SKU, region, channel & warehouse with explainable drivers." },
  { icon: Workflow, title: "Optimization Engine", desc: "Reorder, allocation & safety-stock recommendations that minimise cost and stockouts." },
  { icon: AlertOctagon, title: "Anomaly Detection", desc: "Always-on monitors for sales spikes, stock breaks, returns surges and demand drops." },
  { icon: FlaskConical, title: "What-if Simulator", desc: "Move price, promo, inventory & lead-time sliders. Watch revenue and risk respond live." },
  { icon: Users, title: "Cohort Analytics", desc: "Retention heatmaps, repeat-rate decay and churn probability across segments." },
  { icon: Boxes, title: "Inventory Intelligence", desc: "Live health scoring across warehouses with predictive fulfilment risk." },
  { icon: BrainCircuit, title: "AI Copilot", desc: "Agentic analyst that answers questions in natural language with charts and actions." },
  { icon: ShieldCheck, title: "Enterprise Grade", desc: "SOC 2 ready, role-based access, audit trails and multi-tenant data isolation." },
];

const personas = [
  { title: "Retail Ops Manager", line: "Pre-empt stockouts before they hit the shelf." },
  { title: "D2C Growth Manager", line: "Forecast festive surges and protect margin." },
  { title: "Inventory Planner", line: "Replace spreadsheets with optimised reorder plans." },
  { title: "Distribution Head", line: "Rebalance warehouses in minutes, not days." },
  { title: "Operations / CXO", line: "One co-pilot view of the entire operation." },
];

const pains = [
  "Stockouts during peak demand", "Overstock locking working capital",
  "Reports that arrive too late", "Excel-and-VBA forecasting",
  "Reactive, gut-feel decisions", "Anomalies caught after the damage",
];

const tiers = [
  { name: "Starter", price: "$499", note: "per month", features: ["Up to 5 users", "10K SKUs", "Forecast + Anomaly", "Email support"], cta: "Start free trial" },
  { name: "Growth", price: "$1,899", note: "per month", features: ["Up to 25 users", "100K SKUs", "Full optimisation engine", "AI Copilot", "Priority support"], cta: "Start free trial", featured: true },
  { name: "Enterprise", price: "Custom", note: "tailored", features: ["Unlimited users & SKUs", "SSO + audit", "Dedicated CSM", "On-prem option"], cta: "Talk to sales" },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[oklch(0.88_0.14_88)] to-[oklch(0.55_0.20_265)] grid place-items-center">
              <div className="h-3 w-3 rounded-sm bg-background" />
            </div>
            <span className="font-semibold tracking-tight">Nexora AI</span>
          </Link>
          <nav className="ml-10 hidden md:flex items-center gap-7 text-sm text-muted-foreground">
            <a href="#capabilities" className="hover:text-foreground transition">Platform</a>
            <a href="#copilot" className="hover:text-foreground transition">AI Copilot</a>
            <a href="#personas" className="hover:text-foreground transition">For teams</a>
            <a href="#pricing" className="hover:text-foreground transition">Pricing</a>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Link to="/app" className="text-sm text-muted-foreground hover:text-foreground transition">Sign in</Link>
            <Link to="/app" className="inline-flex items-center gap-1.5 rounded-md bg-foreground text-background text-sm font-medium px-3.5 py-2 hover:opacity-90 transition">
              Launch app <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative bg-hero">
        <div className="absolute inset-0 bg-grid pointer-events-none [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />
        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-24 grid lg:grid-cols-2 gap-14 items-center">
          <div className="fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-glow-gold" />
              Agentic AI for operational intelligence
            </div>
            <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.03em] leading-[1.02]">
              Predict Demand.<br />
              Optimize Operations.<br />
              <span className="text-gradient-gold">Eliminate Guesswork.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
              Nexora AI is the operating system for retail, FMCG and distribution teams.
              Forecasts, optimisations, anomaly alerts and what-if simulations — driven by an agentic AI co-pilot.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/app" className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground font-medium px-5 py-3 shadow-glow-gold hover:opacity-95 transition">
                Start free trial <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#capabilities" className="inline-flex items-center gap-2 rounded-md border border-border bg-surface/50 px-5 py-3 text-sm hover:border-gold/40 transition">
                Book a demo
              </a>
            </div>
            <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-gold" /> SOC 2 ready</div>
              <div className="flex items-center gap-2"><Zap className="h-3.5 w-3.5 text-gold" /> 14-day setup</div>
              <div className="flex items-center gap-2"><Database className="h-3.5 w-3.5 text-gold" /> Connects to your stack</div>
            </div>
          </div>

          <HeroVisual />
        </div>
      </section>

      {/* LOGOS / PROBLEM */}
      <section className="border-y border-border/60 bg-surface/30">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">The operations gap</div>
          <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight max-w-2xl">
            Operators are flying blind on spreadsheets while demand moves in real time.
          </h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {pains.map((p) => (
              <div key={p} className="glass rounded-lg px-4 py-3 text-sm text-muted-foreground flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-destructive" /> {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section id="capabilities" className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.22em] text-gold">Platform</div>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-[-0.02em]">
            One co-pilot for every operational decision.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Forecasting, optimisation, anomaly detection and simulation — all wired into a single agentic interface.
          </p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {capabilities.map((c) => (
            <div key={c.title} className="group relative rounded-2xl border border-border bg-surface/50 p-5 hover:border-gold/40 hover:bg-surface-elevated/60 transition">
              <div className="h-9 w-9 rounded-lg bg-background/60 border border-border grid place-items-center group-hover:border-gold/40 transition">
                <c.icon className="h-4 w-4 text-gold" />
              </div>
              <div className="mt-4 font-medium tracking-tight">{c.title}</div>
              <div className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{c.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* AI COPILOT */}
      <section id="copilot" className="border-y border-border/60 bg-surface/30">
        <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-gold">AI Copilot</div>
            <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-[-0.02em]">
              Ask your operation anything.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-lg">
              The Nexora Copilot reasons across your sales, inventory, returns and supplier data — and answers in plain language with charts, recommendations and a confidence score.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Why are sales dropping in South India?",
                "Which SKUs are likely to stock out next week?",
                "What happens if we reduce price by 5% on category A?",
                "Summarise this week’s anomalies and recommend actions.",
              ].map((q) => (
                <li key={q} className="flex items-start gap-3 text-muted-foreground">
                  <MessageSquare className="h-4 w-4 mt-0.5 text-electric" /> <span>{q}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link to="/app/copilot" className="inline-flex items-center gap-2 rounded-md border border-gold/40 bg-surface px-4 py-2.5 text-sm font-medium hover:bg-surface-elevated transition">
                <Sparkles className="h-4 w-4 text-gold" /> Try the Copilot
              </Link>
            </div>
          </div>

          <CopilotMockup />
        </div>
      </section>

      {/* PERSONAS */}
      <section id="personas" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-xs uppercase tracking-[0.22em] text-gold">Built for operators</div>
        <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-[-0.02em] max-w-3xl">
          The team that runs the business runs it on Nexora.
        </h2>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-5 gap-3">
          {personas.map((p) => (
            <div key={p.title} className="rounded-2xl border border-border bg-surface/40 p-5 hover:border-gold/30 transition">
              <div className="h-1 w-8 bg-gold rounded-full" />
              <div className="mt-4 font-medium">{p.title}</div>
              <div className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{p.line}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="border-y border-border/60 bg-surface/30">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-xs uppercase tracking-[0.22em] text-gold">How it works</div>
          <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-[-0.02em]">From raw data to decision in minutes.</h2>
          <div className="mt-10 grid md:grid-cols-5 gap-3">
            {[
              { icon: Database, label: "Data", desc: "CSV, ERP, POS, e-com" },
              { icon: BrainCircuit, label: "AI Engine", desc: "Forecast + detect" },
              { icon: LineChartIcon, label: "Forecast", desc: "SKU × region × channel" },
              { icon: Workflow, label: "Optimization", desc: "Reorder & rebalance" },
              { icon: Zap, label: "Action", desc: "Push to ops & ERP" },
            ].map((s, i) => (
              <div key={s.label} className="relative rounded-2xl border border-border bg-background/40 p-5">
                <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Step {i + 1}</div>
                <s.icon className="h-5 w-5 text-gold mt-3" />
                <div className="mt-3 font-medium">{s.label}</div>
                <div className="mt-1 text-xs text-muted-foreground">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-xs uppercase tracking-[0.22em] text-gold">Pricing</div>
        <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-[-0.02em] max-w-2xl">
          Built to scale from first SKU to enterprise distribution.
        </h2>
        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={cn(
                "relative rounded-2xl border p-7 flex flex-col",
                t.featured
                  ? "border-gold/50 bg-gradient-to-b from-surface-elevated to-surface shadow-glow-gold"
                  : "border-border bg-surface/40"
              )}
            >
              {t.featured && (
                <div className="absolute -top-2.5 left-7 text-[10px] uppercase tracking-[0.22em] bg-gold text-background px-2 py-0.5 rounded-full">
                  Most popular
                </div>
              )}
              <div className="text-sm text-muted-foreground">{t.name}</div>
              <div className="mt-3 flex items-baseline gap-1.5">
                <div className="text-4xl font-semibold tracking-tight">{t.price}</div>
                <div className="text-xs text-muted-foreground">{t.note}</div>
              </div>
              <ul className="mt-6 space-y-2.5 text-sm flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-muted-foreground">
                    <Check className="h-4 w-4 mt-0.5 text-gold shrink-0" /> <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/app" className={cn(
                "mt-7 inline-flex items-center justify-center gap-2 rounded-md py-2.5 text-sm font-medium transition",
                t.featured
                  ? "bg-primary text-primary-foreground hover:opacity-95"
                  : "border border-border hover:border-gold/40"
              )}>
                {t.cta} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-surface-elevated via-surface to-background p-10 md:p-16">
          <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)] pointer-events-none" />
          <div className="relative max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-[-0.02em]">
              The operations OS your team has been building in spreadsheets.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Connect your data, get your first forecast and anomaly report in under an hour.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/app" className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground font-medium px-5 py-3 shadow-glow-gold">
                Start free trial <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#capabilities" className="inline-flex items-center gap-2 rounded-md border border-border bg-surface/60 px-5 py-3 text-sm">
                Book a demo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/60">
        <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-5 gap-8 text-sm">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[oklch(0.88_0.14_88)] to-[oklch(0.55_0.20_265)] grid place-items-center">
                <div className="h-3 w-3 rounded-sm bg-background" />
              </div>
              <span className="font-semibold tracking-tight">Nexora AI</span>
            </Link>
            <p className="mt-4 text-xs text-muted-foreground max-w-xs">
              The agentic AI operations platform for retail, FMCG and distribution leaders.
            </p>
          </div>
          {[
            { title: "Product", items: ["Forecasting", "Optimization", "Anomaly", "Simulator", "Copilot"] },
            { title: "Company", items: ["About", "Security", "Careers", "Contact"] },
            { title: "Resources", items: ["Docs", "Integrations", "Status", "Changelog"] },
          ].map((col) => (
            <div key={col.title}>
              <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{col.title}</div>
              <ul className="mt-4 space-y-2.5">
                {col.items.map((i) => (
                  <li key={i}><a href="#" className="text-muted-foreground hover:text-foreground transition">{i}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-border/60">
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
            <div>© {new Date().getFullYear()} Nexora AI · Operational Intelligence OS</div>
            <div className="flex items-center gap-5">
              <a href="#" className="hover:text-foreground">Privacy</a>
              <a href="#" className="hover:text-foreground">Terms</a>
              <a href="#" className="hover:text-foreground">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="relative fade-up">
      <div className="absolute -inset-6 bg-gradient-to-tr from-[oklch(0.55_0.20_265/0.25)] to-[oklch(0.82_0.13_85/0.18)] blur-3xl rounded-full pointer-events-none" />
      <div className="relative glass-strong rounded-2xl shadow-elevated overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
          <div className="h-2 w-2 rounded-full bg-destructive/70" />
          <div className="h-2 w-2 rounded-full bg-warning/70" />
          <div className="h-2 w-2 rounded-full bg-success/70" />
          <div className="ml-3 text-xs text-muted-foreground">nexora · overview</div>
          <div className="ml-auto text-[10px] text-muted-foreground">live</div>
        </div>
        <div className="grid grid-cols-3 gap-3 p-4">
          {[
            { label: "Forecast acc.", value: "94.2%", tone: "text-gold" },
            { label: "Stock risk", value: "37", tone: "text-warning" },
            { label: "Revenue", value: "$1.42M", tone: "text-electric" },
          ].map((k) => (
            <div key={k.label} className="rounded-lg border border-border bg-background/40 p-3">
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{k.label}</div>
              <div className={cn("mt-1.5 text-lg font-semibold tracking-tight", k.tone)}>{k.value}</div>
            </div>
          ))}
        </div>
        <div className="px-2 pb-4">
          <div className="h-56">
            <ResponsiveContainer>
              <AreaChart data={revenueSeries.slice(-90)}>
                <defs>
                  <linearGradient id="hg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.65 0.18 250)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="oklch(0.65 0.18 250)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="hg2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.82 0.13 85)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="oklch(0.82 0.13 85)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
                <XAxis dataKey="date" hide />
                <YAxis hide />
                <Tooltip contentStyle={{ background: "oklch(0.22 0.006 260)", border: "1px solid oklch(0.30 0.006 260)", borderRadius: 8, fontSize: 11 }} />
                <Area type="monotone" dataKey="actual" stroke="oklch(0.65 0.18 250)" strokeWidth={1.5} fill="url(#hg)" />
                <Area type="monotone" dataKey="forecast" stroke="oklch(0.82 0.13 85)" strokeWidth={1.5} fill="url(#hg2)" strokeDasharray="4 3" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="border-t border-border p-3 grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-border/60 bg-background/40 p-3">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-destructive pulse-ring" />
              <div className="text-xs">Anomaly · stock break at WH-Delhi</div>
            </div>
            <div className="text-[10px] text-muted-foreground mt-1">Severity critical · 1h ago</div>
          </div>
          <div className="rounded-lg border border-border/60 bg-background/40 p-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-3 w-3 text-gold" />
              <div className="text-xs">AI: rebalance 480u Pune → Chennai</div>
            </div>
            <div className="text-[10px] text-muted-foreground mt-1">Saves $3,180 · confidence 92%</div>
          </div>
        </div>
      </div>

      <div className="absolute -left-6 -bottom-6 w-44 float-soft hidden md:block">
        <div className="glass rounded-xl p-3 shadow-elevated">
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Demand confidence</div>
          <div className="mt-1 text-2xl font-semibold text-gradient-gold">91%</div>
          <div className="mt-2 h-10">
            <ResponsiveContainer>
              <LineChart data={revenueSeries.slice(-30)}>
                <Line type="monotone" dataKey="actual" stroke="oklch(0.82 0.13 85)" strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function CopilotMockup() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 bg-gradient-to-br from-[oklch(0.82_0.13_85/0.18)] to-[oklch(0.55_0.20_265/0.18)] blur-3xl rounded-full pointer-events-none" />
      <div className="relative glass-strong rounded-2xl overflow-hidden shadow-elevated">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
          <Sparkles className="h-3.5 w-3.5 text-gold" />
          <div className="text-xs">Nexora Copilot</div>
          <div className="ml-auto text-[10px] text-muted-foreground">model · nexora-ops-1</div>
        </div>
        <div className="p-5 space-y-4">
          <div className="text-xs text-muted-foreground">You</div>
          <div className="rounded-xl bg-background/40 border border-border p-3 text-sm">
            Why did revenue drop 8% in South India last week?
          </div>
          <div className="text-xs text-muted-foreground">Nexora · 0.8s</div>
          <div className="rounded-xl border border-gold/30 bg-surface-elevated p-4 text-sm leading-relaxed">
            Three drivers explain the 8.1% decline in South:
            <ol className="mt-2 space-y-1.5 text-muted-foreground list-decimal pl-5">
              <li>Stock break on <span className="text-foreground">NX-AERO-01</span> at WH-Chennai (−4.2%).</li>
              <li>Competitor promotion on category <span className="text-foreground">Beverages</span> (−2.6%).</li>
              <li>Returns surge in Bengaluru cluster (−1.3%).</li>
            </ol>
            <div className="mt-4 h-24">
              <ResponsiveContainer>
                <BarChart data={[
                  { k: "Stock", v: 4.2 }, { k: "Promo", v: 2.6 }, { k: "Returns", v: 1.3 },
                ]}>
                  <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
                  <XAxis dataKey="k" stroke="oklch(0.68 0.01 260)" fontSize={10} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Bar dataKey="v" fill="oklch(0.82 0.13 85)" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs">
              <div className="text-muted-foreground">Confidence 0.91 · 4 sources</div>
              <button className="rounded-md bg-foreground text-background px-2.5 py-1 font-medium hover:opacity-90">Run optimisation</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
