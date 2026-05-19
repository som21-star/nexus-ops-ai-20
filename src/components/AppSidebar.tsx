import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard, TrendingUp, Wrench, AlertOctagon, FlaskConical,
  Users, Sparkles, FileBarChart2, Plug, Settings, Command
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
  accent?: boolean;
};
const nav: NavItem[] = [
  { to: "/app", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/app/forecasting", label: "Forecasting", icon: TrendingUp },
  { to: "/app/optimization", label: "Optimization", icon: Wrench },
  { to: "/app/anomaly", label: "Anomaly Detection", icon: AlertOctagon },
  { to: "/app/simulator", label: "Simulations", icon: FlaskConical },
  { to: "/app/cohorts", label: "Cohorts", icon: Users },
  { to: "/app/copilot", label: "AI Copilot", icon: Sparkles, accent: true },
  { to: "/app/reports", label: "Reports", icon: FileBarChart2 },
  { to: "/app/integrations", label: "Integrations", icon: Plug },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

export function AppSidebar() {
  const { pathname } = useLocation();
  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-border bg-surface/40 backdrop-blur-xl">
      <div className="px-5 pt-6 pb-5">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="relative h-8 w-8 rounded-lg bg-gradient-to-br from-[oklch(0.88_0.14_88)] to-[oklch(0.55_0.20_265)] grid place-items-center">
            <div className="h-3 w-3 rounded-sm bg-background" />
          </div>
          <div>
            <div className="text-sm font-semibold tracking-tight">Nexora AI</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Ops Intelligence</div>
          </div>
        </Link>
      </div>

      <div className="px-3">
        <button className="w-full flex items-center justify-between gap-2 rounded-md border border-border bg-background/40 px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:border-gold/40 transition">
          <span className="flex items-center gap-2"><Command className="h-3.5 w-3.5" /> Quick command…</span>
          <kbd className="rounded bg-muted px-1.5 py-0.5 text-[10px]">⌘K</kbd>
        </button>
      </div>

      <nav className="mt-5 flex-1 px-2 space-y-0.5 overflow-y-auto">
        {nav.map((item) => {
          const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "group flex items-center gap-3 rounded-md px-3 py-2 text-sm transition relative",
                active
                  ? "bg-surface-elevated text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-surface/60",
                item.accent && "border border-[color-mix(in_oklab,var(--gold)_25%,transparent)]"
              )}
            >
              <Icon className={cn("h-4 w-4", active ? "text-gold" : "")} />
              <span className="flex-1">{item.label}</span>
              {item.accent && <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-glow-gold" />}
              {active && <span className="absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-r bg-gold" />}
            </Link>
          );
        })}
      </nav>

      <div className="m-3 rounded-xl border border-border bg-gradient-to-br from-surface-elevated to-surface p-4">
        <div className="text-xs text-muted-foreground">Weekly AI report</div>
        <div className="mt-1 text-sm font-medium">Ready · 7 insights</div>
        <button className="mt-3 w-full rounded-md bg-foreground text-background text-xs font-medium py-1.5 hover:opacity-90 transition">
          Open report
        </button>
      </div>
    </aside>
  );
}
