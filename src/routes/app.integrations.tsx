import { createFileRoute } from "@tanstack/react-router";
import { Plug, Check } from "lucide-react";

export const Route = createFileRoute("/app/integrations")({
  component: Integrations,
});

const integrations = [
  { name: "Shopify", desc: "E-commerce orders & inventory", connected: true },
  { name: "SAP S/4HANA", desc: "ERP master data & POs", connected: true },
  { name: "Salesforce", desc: "Customer & opportunity data", connected: false },
  { name: "Snowflake", desc: "Warehouse for raw sales", connected: true },
  { name: "Google BigQuery", desc: "Analytical warehouse", connected: false },
  { name: "Slack", desc: "Send anomaly alerts", connected: true },
  { name: "Zoho Inventory", desc: "Multi-warehouse stock", connected: false },
  { name: "Amazon Seller", desc: "Marketplace demand", connected: false },
];

function Integrations() {
  return (
    <div className="space-y-6">
      <header>
        <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Integrations</div>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">Connect your operational stack</h1>
        <p className="mt-1 text-sm text-muted-foreground">Stream live data from your ERP, e-commerce and warehouse systems.</p>
      </header>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {integrations.map((i) => (
          <div key={i.name} className="rounded-2xl border border-border bg-surface/40 p-5 hover:border-gold/30 transition">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-background/50 border border-border grid place-items-center">
                <Plug className="h-4 w-4 text-gold" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="text-sm font-medium">{i.name}</div>
                  {i.connected && <span className="inline-flex items-center gap-1 rounded-full bg-success/10 border border-success/40 text-success text-[10px] uppercase tracking-[0.18em] px-2 py-0.5"><Check className="h-3 w-3" /> live</span>}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{i.desc}</div>
              </div>
            </div>
            <button className={`mt-5 w-full rounded-md py-2 text-xs font-medium transition ${i.connected ? "border border-border hover:border-gold/40" : "bg-foreground text-background hover:opacity-90"}`}>
              {i.connected ? "Configure" : "Connect"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
