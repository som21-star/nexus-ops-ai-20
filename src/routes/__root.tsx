import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0A0A] px-4">
      <div className="max-w-md text-center">
        <div className="text-[10px] uppercase tracking-[0.22em] text-[#B8924A] mb-4">404</div>
        <h1 className="text-5xl font-semibold text-[#F2F0EB] tracking-[-0.02em]">Page not found</h1>
        <p className="mt-4 text-sm text-[#B0B0B0] leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-md bg-[#B8924A] text-[#0A0A0A] px-5 py-2.5 text-sm font-semibold hover:bg-[#D4A96A] transition-colors"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A0A0A] px-4">
      <div className="max-w-md text-center">
        <div className="text-[10px] uppercase tracking-[0.22em] text-red-400 mb-4">Error</div>
        <h1 className="text-xl font-semibold text-[#F2F0EB] tracking-tight">
          This page didn't load
        </h1>
        <p className="mt-3 text-sm text-[#B0B0B0] leading-relaxed">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="inline-flex items-center rounded-md bg-[#B8924A] text-[#0A0A0A] px-4 py-2 text-sm font-semibold hover:bg-[#D4A96A] transition-colors"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center rounded-md border border-white/[0.1] text-[#F2F0EB] px-4 py-2 text-sm hover:border-[#B8924A]/40 transition-all"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Nexora AI · Logistics Intelligence by MATRIX" },
      { name: "description", content: "Nexora AI is the decision intelligence platform for retail, FMCG and distribution teams. Demand forecasting, anomaly detection, optimization, and AI copilot — cohered by design." },
      { name: "author", content: "MATRIX · Intelligence. Architecture. Impact." },
      { name: "theme-color", content: "#0A0A0A" },
      { property: "og:title", content: "Nexora AI · Logistics Intelligence by MATRIX" },
      { property: "og:description", content: "Demand forecasting, anomaly detection, optimization, and AI copilot for operations teams. Cohered by Design." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@matrixsystems" },
      { name: "twitter:title", content: "Nexora AI · Logistics Intelligence by MATRIX" },
      { name: "twitter:description", content: "Demand forecasting, anomaly detection, optimization, and AI copilot for operations teams." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="bg-[#0A0A0A] antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
