import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="space-y-6">
      <header>
        <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Settings</div>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">Workspace preferences</h1>
      </header>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-border bg-surface/40 p-5 space-y-4">
          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Organisation</div>
          <Field label="Workspace name" value="Nexora · Retail Ops" />
          <Field label="Default region" value="India · APAC" />
          <Field label="Currency" value="INR · ₹" />
        </div>
        <div className="rounded-2xl border border-border bg-surface/40 p-5 space-y-4">
          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Forecasting</div>
          <Field label="Default horizon" value="60 days" />
          <Field label="Confidence interval" value="95%" />
          <Field label="Model" value="Nexora-Forecast v3 (ensemble)" />
        </div>
        <div className="rounded-2xl border border-border bg-surface/40 p-5 space-y-4">
          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Alerts</div>
          <Toggle label="Slack notifications" on />
          <Toggle label="Email digests" on />
          <Toggle label="Critical anomalies SMS" on={false} />
        </div>
        <div className="rounded-2xl border border-border bg-surface/40 p-5 space-y-4">
          <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Security</div>
          <Toggle label="SSO (SAML)" on />
          <Toggle label="2FA required" on />
          <Toggle label="Audit log streaming" on={false} />
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1.5 rounded-md border border-border bg-background/40 px-3 py-2 text-sm">{value}</div>
    </div>
  );
}
function Toggle({ label, on }: { label: string; on: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm">{label}</div>
      <div className={`h-5 w-9 rounded-full p-0.5 transition ${on ? "bg-gold" : "bg-muted"}`}>
        <div className={`h-4 w-4 rounded-full bg-background transition ${on ? "translate-x-4" : ""}`} />
      </div>
    </div>
  );
}
