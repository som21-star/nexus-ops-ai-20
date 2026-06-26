import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard, TrendingUp, Wrench, AlertOctagon, FlaskConical,
  Users, Sparkles, FileBarChart2, Plug, Settings, Command,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
  accent?: boolean;
  badge?: string;
};

const nav: NavItem[] = [
  { to: "/app", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/app/forecasting", label: "Forecasting", icon: TrendingUp },
  { to: "/app/optimization", label: "Optimization", icon: Wrench },
  { to: "/app/anomaly", label: "Anomaly Detection", icon: AlertOctagon, badge: "3" },
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
    <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-white/[0.06] bg-[#0A0A0A]">
      {/* Logo */}
      <div className="px-5 pt-6 pb-5 border-b border-white/[0.04]">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/matrix-logo-gold.png"
            alt="MATRIX"
            className="h-8 w-8 object-contain group-hover:opacity-80 transition-opacity"
          />
          <div>
            <div className="text-sm font-semibold tracking-[0.08em] text-[#F2F0EB]">NEXORA AI</div>
            <div className="text-[9px] uppercase tracking-[0.22em] text-[#B0B0B0]">by MATRIX</div>
          </div>
        </Link>
      </div>

      {/* Command search */}
      <div className="px-3 pt-4">
        <button className="w-full flex items-center justify-between gap-2 rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-2.5 text-xs text-[#B0B0B0] hover:text-[#F2F0EB] hover:border-[#B8924A]/30 hover:bg-[#B8924A]/[0.03] transition-all">
          <span className="flex items-center gap-2">
            <Command className="h-3.5 w-3.5" />
            Quick command…
          </span>
          <kbd className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[10px] font-mono">⌘K</kbd>
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-4 flex-1 px-2 space-y-0.5 overflow-y-auto">
        <div className="px-3 pb-2">
          <span className="text-[9px] uppercase tracking-[0.22em] text-white/20">Intelligence</span>
        </div>
        {nav.slice(0, 6).map((item) => {
          const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to as string}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all relative",
                active
                  ? "bg-[#B8924A]/[0.1] text-[#F2F0EB] border border-[#B8924A]/20"
                  : "text-[#B0B0B0] hover:text-[#F2F0EB] hover:bg-white/[0.04] border border-transparent"
              )}
            >
              {active && (
                <span className="absolute left-0 top-2 bottom-2 w-[2px] rounded-r bg-[#B8924A]" />
              )}
              <Icon className={cn("h-4 w-4 shrink-0", active ? "text-[#B8924A]" : "text-white/30 group-hover:text-white/60")} />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="rounded-full bg-red-500/20 text-red-400 text-[10px] px-1.5 py-0.5 font-medium">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}

        <div className="px-3 pt-4 pb-2">
          <span className="text-[9px] uppercase tracking-[0.22em] text-white/20">Workspace</span>
        </div>
        {nav.slice(6).map((item) => {
          const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to as string}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all relative",
                active
                  ? "bg-[#B8924A]/[0.1] text-[#F2F0EB] border border-[#B8924A]/20"
                  : item.accent
                    ? "text-[#B8924A]/80 hover:text-[#B8924A] hover:bg-[#B8924A]/[0.05] border border-[#B8924A]/10"
                    : "text-[#B0B0B0] hover:text-[#F2F0EB] hover:bg-white/[0.04] border border-transparent"
              )}
            >
              {active && (
                <span className="absolute left-0 top-2 bottom-2 w-[2px] rounded-r bg-[#B8924A]" />
              )}
              <Icon className={cn(
                "h-4 w-4 shrink-0",
                active ? "text-[#B8924A]" : item.accent ? "text-[#B8924A]/60" : "text-white/30 group-hover:text-white/60"
              )} />
              <span className="flex-1">{item.label}</span>
              {item.accent && !active && (
                <span className="h-1.5 w-1.5 rounded-full bg-[#B8924A] shadow-[0_0_6px_rgba(184,146,74,0.6)]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Weekly AI insight card */}
      <div className="m-3 rounded-xl border border-[#B8924A]/20 bg-[#B8924A]/[0.05] p-4">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-3.5 w-3.5 text-[#B8924A]" />
          <span className="text-[10px] uppercase tracking-[0.18em] text-[#B8924A]">Weekly insight</span>
        </div>
        <div className="text-xs text-[#F2F0EB]/80 leading-relaxed mb-3">
          Festive demand forming 3 weeks early in South cluster — consider pulling forward 14% of Personal Care allocation.
        </div>
        <Link
          to="/app/reports"
          className="flex items-center justify-between text-[10px] text-[#B8924A] hover:text-[#D4A96A] transition-colors"
        >
          <span>Open report · 7 insights</span>
          <ChevronRight className="h-3 w-3" />
        </Link>
      </div>

      {/* User footer */}
      <div className="border-t border-white/[0.06] px-4 py-3 flex items-center gap-3">
        <div className="h-7 w-7 rounded-full bg-[#B8924A]/20 border border-[#B8924A]/30 flex items-center justify-center">
          <span className="text-[10px] font-semibold text-[#B8924A]">N</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-medium text-[#F2F0EB] truncate">Nexora Workspace</div>
          <div className="text-[10px] text-[#B0B0B0]">Growth plan</div>
        </div>
        <Settings className="h-3.5 w-3.5 text-white/20 hover:text-white/50 cursor-pointer transition-colors" />
      </div>
    </aside>
  );
}
