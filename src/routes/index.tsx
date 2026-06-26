import { createFileRoute, Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import {
  ArrowRight, Sparkles, Activity, Boxes, AlertOctagon, FlaskConical,
  Users, BrainCircuit, ShieldCheck, TrendingUp, Workflow,
  Check, ChevronRight, BarChart3, Zap, Globe, Lock, Database,
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip,
  CartesianGrid, LineChart, Line, BarChart, Bar,
} from "recharts";
import { revenueSeries } from "@/lib/mockData";

export const Route = createFileRoute("/")({
  component: Landing,
});

const capabilities = [
  {
    icon: TrendingUp,
    title: "Demand Forecasting",
    desc: "Probabilistic forecasts by SKU, region, channel and warehouse with explainable confidence bands and seasonality decomposition.",
    stat: "94.2% accuracy",
    color: "gold",
  },
  {
    icon: AlertOctagon,
    title: "Anomaly Detection",
    desc: "Always-on monitors for sales spikes, stock breaks, returns surges and demand drops — classified by severity before damage occurs.",
    stat: "< 15 min detection",
    color: "red",
  },
  {
    icon: Workflow,
    title: "Optimization Engine",
    desc: "Reorder, allocation and safety-stock recommendations that minimise cost, eliminate stockouts, and maximise margin under real constraints.",
    stat: "$3.2M savings avg.",
    color: "gold",
  },
  {
    icon: FlaskConical,
    title: "What-If Simulator",
    desc: "Move price, promo, inventory and lead-time sliders. Watch revenue, risk and margin respond in real time across your full SKU portfolio.",
    stat: "12+ scenario params",
    color: "blue",
  },
  {
    icon: Users,
    title: "Cohort Analytics",
    desc: "Retention heatmaps, repeat-rate decay curves and churn probability across customer segments and acquisition channels.",
    stat: "8 cohort dimensions",
    color: "gold",
  },
  {
    icon: BrainCircuit,
    title: "AI Copilot",
    desc: "Agentic analyst that answers operational questions in plain English, surfaces root causes, and triggers optimization workflows.",
    stat: "0.91 confidence avg.",
    color: "gold",
  },
];

const personas = [
  { title: "Retail Ops Manager", line: "Pre-empt stockouts before they hit the shelf.", icon: Boxes },
  { title: "D2C Growth Manager", line: "Forecast festive surges and protect margin.", icon: TrendingUp },
  { title: "Inventory Planner", line: "Replace spreadsheets with optimised reorder plans.", icon: BarChart3 },
  { title: "Distribution Head", line: "Rebalance warehouses in minutes, not days.", icon: Globe },
  { title: "Operations / CXO", line: "One co-pilot view of the entire operation.", icon: Sparkles },
];

const pains = [
  "Stockouts during peak demand",
  "Overstock locking working capital",
  "Reports that arrive too late",
  "Excel-and-VBA forecasting",
  "Reactive, gut-feel decisions",
  "Anomalies caught after the damage",
];

const tiers = [
  {
    name: "Starter",
    price: "$499",
    note: "per month",
    features: ["Up to 5 users", "10K SKUs", "Forecast + Anomaly", "Email support", "CSV upload"],
    cta: "Start free trial",
  },
  {
    name: "Growth",
    price: "$1,899",
    note: "per month",
    features: ["Up to 25 users", "100K SKUs", "Full optimisation engine", "AI Copilot", "Priority support", "API access"],
    cta: "Start free trial",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    note: "tailored",
    features: ["Unlimited users & SKUs", "SSO + audit trails", "Dedicated CSM", "On-prem option", "SLA guarantee"],
    cta: "Talk to sales",
  },
];

const stats = [
  { value: "94.2%", label: "Forecast accuracy" },
  { value: "< 15m", label: "Anomaly detection" },
  { value: "$3.2M", label: "Avg. annual savings" },
  { value: "99.9%", label: "Platform uptime" },
];

const logos = ["Retail Co.", "DistributionX", "FMCGPro", "D2C Brands", "OpsGroup", "SupplyNet"];

function MatrixLogoMark({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <img
      src="/matrix-logo-gold.png"
      alt="MATRIX"
      width={size}
      height={size}
      className={cn("object-contain", className)}
    />
  );
}

function HeroDashboardMockup() {
  const mini = revenueSeries.slice(80, 140);
  return (
    <div className="relative">
      <div className="absolute -inset-8 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(184,146,74,0.12),transparent)] pointer-events-none" />
      <div className="relative glass-strong rounded-2xl overflow-hidden shadow-elevated border border-white/[0.06]">
        {/* Dashboard header */}
        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          </div>
          <div className="flex-1 text-center text-[11px] text-white/30 tracking-wide">nexora · ops intelligence</div>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400/80 pulse-gold" />
            <span className="text-[10px] text-white/30">Live</span>
          </div>
        </div>
        {/* KPI row */}
        <div className="grid grid-cols-3 gap-px bg-white/[0.04] border-b border-white/[0.06]">
          {[
            { label: "Forecast Accuracy", value: "94.2%", up: true },
            { label: "Revenue (30d)", value: "$1.42M", up: true },
            { label: "Stock Risk SKUs", value: "37", up: false },
          ].map((k) => (
            <div key={k.label} className="bg-[#0A0A0A] px-4 py-3">
              <div className="text-[9px] uppercase tracking-[0.2em] text-white/30">{k.label}</div>
              <div className="mt-1 text-lg font-semibold text-white/90">{k.value}</div>
              <div className={cn("text-[10px] mt-0.5", k.up ? "text-[#B8924A]" : "text-red-400/80")}>
                {k.up ? "▲" : "▼"} {k.up ? "+1.8%" : "+9"}
              </div>
            </div>
          ))}
        </div>
        {/* Chart area */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[10px] uppercase tracking-[0.2em] text-white/30">Demand forecast · 30d</div>
            <div className="flex items-center gap-3 text-[10px] text-white/30">
              <span className="flex items-center gap-1"><span className="w-3 h-px bg-[#B8924A] inline-block" /> Actual</span>
              <span className="flex items-center gap-1"><span className="w-3 h-px border-t border-dashed border-white/30 inline-block" /> Forecast</span>
            </div>
          </div>
          <div className="h-32">
            <ResponsiveContainer>
              <AreaChart data={mini} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gA" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#B8924A" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#B8924A" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gF" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D4A96A" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#D4A96A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="date" hide />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ background: "#1C1C1C", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, fontSize: 11 }}
                  labelStyle={{ color: "#B0B0B0" }}
                />
                <Area type="monotone" dataKey="actual" stroke="#B8924A" strokeWidth={1.5} fill="url(#gA)" dot={false} />
                <Area type="monotone" dataKey="forecast" stroke="#D4A96A" strokeWidth={1.5} strokeDasharray="4 3" fill="url(#gF)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Alert row */}
        <div className="border-t border-white/[0.06] p-3 grid grid-cols-2 gap-2">
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-red-400 pulse-ring" />
              <div className="text-[11px] text-white/70">Anomaly · WH-Delhi stock break</div>
            </div>
            <div className="text-[10px] text-white/30 mt-1">Critical · 1h ago</div>
          </div>
          <div className="rounded-lg border border-[#B8924A]/20 bg-[#B8924A]/[0.04] p-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-3 w-3 text-[#B8924A]" />
              <div className="text-[11px] text-white/70">AI: rebalance 480u → Chennai</div>
            </div>
            <div className="text-[10px] text-white/30 mt-1">Saves $3,180 · confidence 92%</div>
          </div>
        </div>
      </div>
      {/* Floating card */}
      <div className="absolute -left-8 -bottom-6 w-44 float-soft hidden lg:block">
        <div className="glass rounded-xl p-3 shadow-elevated border border-white/[0.06]">
          <div className="text-[9px] uppercase tracking-[0.2em] text-white/30">Demand confidence</div>
          <div className="mt-1 text-2xl font-semibold text-gradient-gold">91%</div>
          <div className="mt-2 h-10">
            <ResponsiveContainer>
              <LineChart data={revenueSeries.slice(-30)}>
                <Line type="monotone" dataKey="actual" stroke="#B8924A" strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F2F0EB] overflow-hidden">

      {/* ── NAVIGATION ── */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0A0A0A]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center">
          <Link to="/" className="flex items-center gap-3">
            <img src="/matrix-logo-gold.png" alt="MATRIX" className="h-8 w-8 object-contain" />
            <div>
              <div className="text-sm font-semibold tracking-[0.08em] text-[#F2F0EB]">NEXORA AI</div>
              <div className="text-[9px] uppercase tracking-[0.22em] text-[#B0B0B0]">by MATRIX</div>
            </div>
          </Link>
          <nav className="ml-10 hidden md:flex items-center gap-7 text-sm text-[#B0B0B0]">
            <a href="#platform" className="hover:text-[#F2F0EB] transition-colors">Platform</a>
            <a href="#capabilities" className="hover:text-[#F2F0EB] transition-colors">Capabilities</a>
            <a href="#for-teams" className="hover:text-[#F2F0EB] transition-colors">For Teams</a>
            <a href="#pricing" className="hover:text-[#F2F0EB] transition-colors">Pricing</a>
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <Link to="/app" className="text-sm text-[#B0B0B0] hover:text-[#F2F0EB] transition-colors hidden md:block">
              Sign in
            </Link>
            <Link
              to="/app"
              className="inline-flex items-center gap-1.5 rounded-md bg-[#B8924A] text-[#0A0A0A] text-sm font-semibold px-4 py-2 hover:bg-[#D4A96A] transition-colors shadow-glow-gold-sm"
            >
              Launch app <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* ── HERO — DARK BAND ── */}
      <section className="relative band-dark bg-hero overflow-hidden">
        <div className="absolute inset-0 bg-grid pointer-events-none [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]" />
        <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-28 grid lg:grid-cols-2 gap-16 items-center">
          <div className="fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#B8924A]/30 bg-[#B8924A]/[0.07] px-3.5 py-1.5 text-xs text-[#D4A96A] mb-6">
              <span className="gold-dot" />
              Agentic AI for Operational Intelligence
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-[4.25rem] font-semibold tracking-[-0.03em] leading-[1.02] text-[#F2F0EB]">
              Predict Demand.<br />
              Optimize Operations.<br />
              <span className="text-gradient-gold">Eliminate Guesswork.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base md:text-lg text-[#B0B0B0] leading-relaxed">
              Nexora AI is the decision intelligence platform for retail, FMCG and distribution teams.
              Forecasts, optimizations, anomaly alerts and what-if simulations — driven by an agentic AI copilot.
            </p>
            <p className="mt-2 text-sm text-[#B8924A]/70 tracking-[0.12em] uppercase">
              Cohered by Design · Intelligence. Architecture. Impact.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/app"
                className="inline-flex items-center gap-2 rounded-md bg-[#B8924A] text-[#0A0A0A] font-semibold px-6 py-3 shadow-glow-gold hover:bg-[#D4A96A] transition-colors"
              >
                Start free trial <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#platform"
                className="inline-flex items-center gap-2 rounded-md border border-white/[0.12] bg-white/[0.04] px-6 py-3 text-sm text-[#F2F0EB] hover:border-[#B8924A]/40 hover:bg-white/[0.07] transition-all"
              >
                See how it works
              </a>
            </div>
            <div className="mt-10 flex items-center gap-6">
              {[
                { v: "94.2%", l: "Accuracy" },
                { v: "< 15m", l: "Detection" },
                { v: "$3.2M", l: "Avg. savings" },
              ].map((s) => (
                <div key={s.l} className="text-center">
                  <div className="text-xl font-semibold text-[#B8924A]">{s.v}</div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-[#B0B0B0] mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="fade-up delay-200">
            <HeroDashboardMockup />
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF TICKER — MID BAND ── */}
      <section className="band-mid border-y border-white/[0.06] py-5">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-8 overflow-hidden">
          <span className="text-[10px] uppercase tracking-[0.22em] text-[#B0B0B0] shrink-0">Trusted by</span>
          <div className="flex items-center gap-10 overflow-x-auto scrollbar-none">
            {logos.map((l) => (
              <span key={l} className="text-sm font-medium text-white/20 whitespace-nowrap hover:text-white/40 transition-colors cursor-default">
                {l}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLATFORM OVERVIEW — LIGHT BAND ── */}
      <section id="platform" className="band-light bg-grid-light">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-2xl">
            <div className="text-[10px] uppercase tracking-[0.22em] text-[#B8924A] mb-4">The Platform</div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.02em] text-[#0A0A0A] leading-tight">
              From raw data to<br />
              <span className="text-[#B8924A]">decisive action.</span>
            </h2>
            <p className="mt-5 text-lg text-[#6B6B6B] leading-relaxed">
              Nexora AI replaces the fragmented cycle of Excel spreadsheets, Power Query scripts, and Python notebooks
              with a unified, agentic intelligence platform. Upload your data. The system forecasts, detects, optimizes, and explains.
            </p>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-px bg-black/[0.06] rounded-2xl overflow-hidden border border-black/[0.06]">
            {[
              {
                step: "01",
                title: "Upload & Validate",
                desc: "Drag-and-drop your CSV. The Data Preparation Agent auto-detects schema, maps columns, flags data quality issues, and applies ETL transforms in under 5 seconds.",
                icon: Database,
              },
              {
                step: "02",
                title: "Analyze & Detect",
                desc: "Five coordinated AI agents run in parallel: forecasting demand, detecting anomalies, scoring inventory health, and generating cohort retention curves.",
                icon: Activity,
              },
              {
                step: "03",
                title: "Decide & Act",
                desc: "The Insight Agent synthesizes all outputs into plain-English recommendations. Simulate scenarios, approve optimizations, and export management-ready reports.",
                icon: Zap,
              },
            ].map((s) => (
              <div key={s.step} className="bg-[#F9F8F5] p-8">
                <div className="flex items-start justify-between mb-6">
                  <span className="text-[11px] font-mono text-[#B8924A] tracking-[0.18em]">{s.step}</span>
                  <s.icon className="h-5 w-5 text-[#B8924A]/60" />
                </div>
                <h3 className="text-xl font-semibold text-[#0A0A0A] mb-3">{s.title}</h3>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Pain points */}
          <div className="mt-16 rounded-2xl border border-black/[0.07] bg-[#F2F0EB] p-8">
            <div className="text-[10px] uppercase tracking-[0.22em] text-[#B0B0B0] mb-5">What this replaces</div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {pains.map((p) => (
                <div key={p} className="flex items-center gap-3 rounded-lg border border-black/[0.06] bg-[#F9F8F5] px-4 py-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#B8924A] shrink-0" />
                  <span className="text-sm text-[#3D3D3D]">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CAPABILITIES — DARK BAND ── */}
      <section id="capabilities" className="band-dark relative">
        <div className="absolute inset-0 bg-grid pointer-events-none opacity-60" />
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-[#B8924A] mb-4">Capabilities</div>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.02em] text-[#F2F0EB] leading-tight">
                Six modules.<br />
                One operating system.
              </h2>
            </div>
            <Link
              to="/app"
              className="inline-flex items-center gap-2 text-sm text-[#B8924A] hover:text-[#D4A96A] transition-colors shrink-0"
            >
              Explore the platform <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.title}
                  className={cn(
                    "group rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-[#B8924A]/30 hover:bg-[#B8924A]/[0.03] transition-all duration-300 cursor-default fade-up",
                    `delay-${Math.min(i * 100, 500)}`
                  )}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="rounded-lg border border-[#B8924A]/20 bg-[#B8924A]/[0.08] p-2.5">
                      <Icon className="h-4.5 w-4.5 text-[#B8924A]" />
                    </div>
                    <span className="text-[10px] font-mono text-[#B8924A]/60 tracking-wide">{cap.stat}</span>
                  </div>
                  <h3 className="text-base font-semibold text-[#F2F0EB] mb-2">{cap.title}</h3>
                  <p className="text-sm text-[#B0B0B0] leading-relaxed">{cap.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── AI COPILOT SHOWCASE — LIGHT BAND ── */}
      <section className="band-light">
        <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-[#B8924A] mb-4">AI Copilot</div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.02em] text-[#0A0A0A] leading-tight">
              Ask anything.<br />
              <span className="text-[#B8924A]">Act immediately.</span>
            </h2>
            <p className="mt-5 text-lg text-[#6B6B6B] leading-relaxed">
              The Nexora Copilot is an agentic analyst that understands your operational data. Ask it why revenue dropped,
              which SKUs are at risk, or what happens if you run a 15% promo in South India next week.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "Root-cause analysis in plain English",
                "Anomaly investigation with evidence",
                "Scenario simulation from natural language",
                "Weekly management report generation",
                "Actionable recommendations with confidence scores",
              ].map((f) => (
                <li key={f} className="flex items-center gap-3 text-sm text-[#3D3D3D]">
                  <span className="h-5 w-5 rounded-full bg-[#B8924A]/10 border border-[#B8924A]/20 flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 text-[#B8924A]" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              to="/app/copilot"
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#0A0A0A] text-[#F2F0EB] font-semibold px-6 py-3 hover:bg-[#1C1C1C] transition-colors"
            >
              Try the Copilot <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {/* Copilot mockup */}
          <div className="fade-up delay-200">
            <div className="glass-light rounded-2xl overflow-hidden shadow-elevated border border-black/[0.07]">
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-black/[0.06] bg-[#F2F0EB]">
                <Sparkles className="h-3.5 w-3.5 text-[#B8924A]" />
                <span className="text-xs font-medium text-[#0A0A0A]">Nexora Copilot</span>
                <span className="ml-auto text-[10px] text-[#B0B0B0]">model · nexora-ops-1</span>
              </div>
              <div className="p-5 space-y-4 bg-[#F9F8F5]">
                <div className="text-xs text-[#B0B0B0]">You</div>
                <div className="rounded-xl bg-white border border-black/[0.07] p-3.5 text-sm text-[#0A0A0A] shadow-sm">
                  Why did revenue drop 8% in South India last week?
                </div>
                <div className="text-xs text-[#B0B0B0]">Nexora · 0.8s</div>
                <div className="rounded-xl border border-[#B8924A]/20 bg-white p-4 text-sm text-[#0A0A0A] leading-relaxed shadow-sm">
                  Three drivers explain the 8.1% decline in South:
                  <ol className="mt-2 space-y-1.5 text-[#6B6B6B] list-decimal pl-5">
                    <li>Stock break on <span className="text-[#0A0A0A] font-medium">NX-AERO-01</span> at WH-Chennai (−4.2%).</li>
                    <li>Competitor promotion on <span className="text-[#0A0A0A] font-medium">Beverages</span> (−2.6%).</li>
                    <li>Returns surge in Bengaluru cluster (−1.3%).</li>
                  </ol>
                  <div className="mt-4 h-20">
                    <ResponsiveContainer>
                      <BarChart data={[{ k: "Stock", v: 4.2 }, { k: "Promo", v: 2.6 }, { k: "Returns", v: 1.3 }]}>
                        <CartesianGrid stroke="rgba(0,0,0,0.04)" vertical={false} />
                        <XAxis dataKey="k" stroke="#B0B0B0" fontSize={10} axisLine={false} tickLine={false} />
                        <YAxis hide />
                        <Bar dataKey="v" fill="#B8924A" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-[#B0B0B0]">Confidence 0.91 · 4 sources</span>
                    <Link to="/app/simulator" className="rounded-md bg-[#0A0A0A] text-[#F2F0EB] px-2.5 py-1 font-medium hover:bg-[#1C1C1C] transition-colors">
                      Simulate impact
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOR TEAMS — MID DARK BAND ── */}
      <section id="for-teams" className="band-mid relative">
        <div className="absolute inset-0 bg-grid pointer-events-none opacity-40" />
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-14">
            <div className="text-[10px] uppercase tracking-[0.22em] text-[#B8924A] mb-4">For Teams</div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.02em] text-[#F2F0EB]">
              Built for the people<br />who run operations.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {personas.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 hover:border-[#B8924A]/30 hover:bg-[#B8924A]/[0.03] transition-all duration-300 cursor-default"
                >
                  <Icon className="h-5 w-5 text-[#B8924A] mb-4" />
                  <div className="text-sm font-semibold text-[#F2F0EB] mb-2">{p.title}</div>
                  <div className="text-xs text-[#B0B0B0] leading-relaxed">{p.line}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── STATS — LIGHT BAND ── */}
      <section className="band-bone">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-4xl md:text-5xl font-semibold text-[#B8924A] tracking-[-0.02em]">{s.value}</div>
                <div className="mt-2 text-sm text-[#6B6B6B] tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING — DARK BAND ── */}
      <section id="pricing" className="band-dark relative">
        <div className="absolute inset-0 bg-grid pointer-events-none opacity-50" />
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-14">
            <div className="text-[10px] uppercase tracking-[0.22em] text-[#B8924A] mb-4">Pricing</div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.02em] text-[#F2F0EB]">
              Simple, transparent pricing.
            </h2>
            <p className="mt-4 text-[#B0B0B0]">Start free. Scale as you grow. No hidden fees.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={cn(
                  "rounded-2xl border p-7 flex flex-col transition-all duration-300",
                  t.featured
                    ? "border-[#B8924A]/50 bg-[#B8924A]/[0.06] shadow-glow-gold"
                    : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.12]"
                )}
              >
                {t.featured && (
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#B8924A] mb-3">Most popular</div>
                )}
                <div className="text-sm font-medium text-[#B0B0B0] mb-1">{t.name}</div>
                <div className="flex items-baseline gap-1.5 mb-1">
                  <span className="text-4xl font-semibold text-[#F2F0EB] tracking-[-0.02em]">{t.price}</span>
                  {t.price !== "Custom" && <span className="text-sm text-[#B0B0B0]">/mo</span>}
                </div>
                <div className="text-xs text-[#B0B0B0] mb-6">{t.note}</div>
                <ul className="space-y-2.5 flex-1 mb-7">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-[#F2F0EB]/80">
                      <Check className="h-3.5 w-3.5 text-[#B8924A] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/app"
                  className={cn(
                    "rounded-md text-sm font-semibold py-2.5 text-center transition-colors",
                    t.featured
                      ? "bg-[#B8924A] text-[#0A0A0A] hover:bg-[#D4A96A] shadow-glow-gold-sm"
                      : "border border-white/[0.12] text-[#F2F0EB] hover:border-[#B8924A]/40 hover:bg-white/[0.04]"
                  )}
                >
                  {t.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENTERPRISE TRUST — LIGHT BAND ── */}
      <section className="band-light bg-grid-light">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: "Enterprise Security", desc: "SOC 2 Type II ready, role-based access control, audit trails, and multi-tenant data isolation." },
              { icon: Lock, title: "Data Privacy", desc: "Your data never trains our models. On-premise deployment available for regulated industries." },
              { icon: Zap, title: "99.9% Uptime SLA", desc: "Built on resilient cloud infrastructure with automatic failover and real-time monitoring." },
            ].map((t) => {
              const Icon = t.icon;
              return (
                <div key={t.title} className="flex gap-4">
                  <div className="rounded-lg border border-[#B8924A]/20 bg-[#B8924A]/[0.06] p-2.5 h-fit">
                    <Icon className="h-4.5 w-4.5 text-[#B8924A]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0A0A0A] mb-1.5">{t.title}</div>
                    <div className="text-sm text-[#6B6B6B] leading-relaxed">{t.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA — DARK BAND ── */}
      <section className="band-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(184,146,74,0.1),transparent)] pointer-events-none" />
        <div className="absolute inset-0 bg-grid pointer-events-none opacity-40" />
        <div className="relative max-w-4xl mx-auto px-6 py-28 text-center">
          <img src="/matrix-logo-white.png" alt="MATRIX" className="h-16 w-auto mx-auto mb-8 opacity-80" />
          <h2 className="text-4xl md:text-5xl font-semibold tracking-[-0.02em] text-[#F2F0EB] leading-tight">
            The invisible architecture<br />
            <span className="text-gradient-gold">behind your operations.</span>
          </h2>
          <p className="mt-5 text-lg text-[#B0B0B0] max-w-xl mx-auto leading-relaxed">
            Join operations teams who replaced reactive spreadsheets with proactive intelligence.
            Start your free trial today — no credit card required.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link
              to="/app"
              className="inline-flex items-center gap-2 rounded-md bg-[#B8924A] text-[#0A0A0A] font-semibold px-7 py-3.5 shadow-glow-gold hover:bg-[#D4A96A] transition-colors"
            >
              Start free trial <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="mailto:studio@matrix.systems"
              className="inline-flex items-center gap-2 rounded-md border border-white/[0.12] text-[#F2F0EB] px-7 py-3.5 hover:border-[#B8924A]/40 hover:bg-white/[0.04] transition-all text-sm"
            >
              Talk to sales
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="band-mid border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <img src="/matrix-logo-gold.png" alt="MATRIX" className="h-7 w-7 object-contain" />
                <div>
                  <div className="text-sm font-semibold tracking-[0.06em] text-[#F2F0EB]">NEXORA AI</div>
                  <div className="text-[9px] uppercase tracking-[0.2em] text-[#B0B0B0]">by MATRIX</div>
                </div>
              </div>
              <p className="text-xs text-[#B0B0B0] leading-relaxed">
                Intelligence. Architecture. Impact.<br />
                Cohered by Design.
              </p>
            </div>
            {[
              { heading: "Platform", links: ["Demand Forecasting", "Anomaly Detection", "Optimization", "What-If Simulator", "Cohort Analytics", "AI Copilot"] },
              { heading: "Company", links: ["About MATRIX", "Journal", "Manifesto", "Careers", "Contact"] },
              { heading: "Resources", links: ["Documentation", "API Reference", "Status", "Privacy Policy", "Terms of Service"] },
            ].map((col) => (
              <div key={col.heading}>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#B0B0B0] mb-4">{col.heading}</div>
                <ul className="space-y-2">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/25">© 2026 MATRIX · Intelligence. Architecture. Impact.</p>
            <p className="text-xs text-white/25">Nexora AI · Cohered by Design</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
