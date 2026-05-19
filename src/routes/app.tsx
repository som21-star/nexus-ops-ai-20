import { Outlet, createFileRoute, Link } from "@tanstack/react-router";
import { AppSidebar } from "@/components/AppSidebar";
import { Bell, Search, Sparkles } from "lucide-react";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground bg-grid-sm">
      <div className="flex min-h-screen">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-30 h-14 border-b border-border bg-background/70 backdrop-blur-xl flex items-center px-5 gap-3">
            <div className="md:hidden font-semibold tracking-tight">Nexora AI</div>
            <div className="flex-1 max-w-xl relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                placeholder="Ask Nexora · search SKUs, regions, reports…"
                className="w-full bg-surface/60 border border-border rounded-md pl-9 pr-3 py-1.5 text-sm placeholder:text-muted-foreground/70 focus:outline-none focus:border-gold/50 transition"
              />
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button className="relative h-9 w-9 grid place-items-center rounded-md border border-border hover:border-gold/40 transition">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-destructive pulse-ring" />
              </button>
              <Link
                to="/app/copilot"
                className="hidden sm:inline-flex items-center gap-2 rounded-md bg-foreground text-background text-xs font-medium px-3 py-2 hover:opacity-90 transition"
              >
                <Sparkles className="h-3.5 w-3.5" /> Ask AI
              </Link>
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[oklch(0.88_0.14_88)] to-[oklch(0.55_0.20_265)] grid place-items-center text-xs font-semibold text-background">
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
