import { Outlet, createFileRoute, Link } from "@tanstack/react-router";
import { AppSidebar } from "@/components/AppSidebar";
import { Bell, Search, Sparkles } from "lucide-react";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F2F0EB]">
      <div className="flex min-h-screen">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top header */}
          <header className="sticky top-0 z-30 h-14 border-b border-white/[0.06] bg-[#0A0A0A]/80 backdrop-blur-xl flex items-center px-5 gap-3">
            <div className="md:hidden font-semibold tracking-[0.06em] text-[#F2F0EB]">NEXORA AI</div>
            <div className="flex-1 max-w-xl relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#B0B0B0]" />
              <input
                placeholder="Ask Nexora · search SKUs, regions, reports…"
                className="w-full bg-white/[0.03] border border-white/[0.07] rounded-lg pl-9 pr-3 py-2 text-sm text-[#F2F0EB] placeholder:text-white/25 focus:outline-none focus:border-[#B8924A]/40 focus:bg-white/[0.05] transition-all"
              />
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button className="relative h-9 w-9 grid place-items-center rounded-lg border border-white/[0.07] hover:border-[#B8924A]/30 hover:bg-white/[0.03] transition-all">
                <Bell className="h-4 w-4 text-[#B0B0B0]" />
                <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-red-500 pulse-ring" />
              </button>
              <Link
                to="/app/copilot"
                className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-[#B8924A] text-[#0A0A0A] text-xs font-semibold px-3.5 py-2 hover:bg-[#D4A96A] transition-colors shadow-glow-gold-sm"
              >
                <Sparkles className="h-3.5 w-3.5" /> Ask AI
              </Link>
              <div className="h-8 w-8 rounded-full bg-[#B8924A]/20 border border-[#B8924A]/30 grid place-items-center text-[11px] font-semibold text-[#B8924A]">
                NX
              </div>
            </div>
          </header>
          <main className="flex-1 p-6 md:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
