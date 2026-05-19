// Synthetic but realistic retail mock data
export type SeriesPoint = { date: string; actual?: number; forecast?: number; lower?: number; upper?: number };

const fmt = (d: Date) => d.toISOString().slice(0, 10);

export const revenueSeries: SeriesPoint[] = (() => {
  const out: SeriesPoint[] = [];
  const start = new Date();
  start.setDate(start.getDate() - 120);
  for (let i = 0; i < 180; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const trend = 12000 + i * 95;
    const season = Math.sin((i / 30) * Math.PI) * 1800;
    const noise = (Math.sin(i * 1.7) + Math.cos(i * 0.6)) * 600;
    const v = Math.round(trend + season + noise);
    if (i < 120) out.push({ date: fmt(d), actual: v });
    else {
      const f = Math.round(trend + season);
      out.push({ date: fmt(d), forecast: f, lower: Math.round(f * 0.88), upper: Math.round(f * 1.12) });
    }
  }
  return out;
})();

export const kpis = [
  { label: "Forecast Accuracy", value: "94.2%", delta: "+1.8%", tone: "gold" as const },
  { label: "Revenue (30d)", value: "$1.42M", delta: "+12.4%", tone: "electric" as const },
  { label: "Stock Risk SKUs", value: "37", delta: "-9", tone: "warning" as const },
  { label: "Inventory Health", value: "86", delta: "+3", tone: "success" as const },
  { label: "Demand Confidence", value: "91%", delta: "+2%", tone: "gold" as const },
  { label: "Fulfillment Risk", value: "Low", delta: "stable", tone: "success" as const },
];

export const skuForecast = [
  { sku: "NX-AERO-01", region: "North", current: 1240, predicted: 1580, risk: "stockout", confidence: 0.93 },
  { sku: "NX-FLUX-22", region: "South", current: 820, predicted: 640, risk: "overstock", confidence: 0.88 },
  { sku: "NX-PULSE-09", region: "West", current: 2100, predicted: 2380, risk: "healthy", confidence: 0.95 },
  { sku: "NX-ORBIT-14", region: "East", current: 540, predicted: 910, risk: "stockout", confidence: 0.91 },
  { sku: "NX-NOVA-07", region: "Central", current: 1780, predicted: 1620, risk: "healthy", confidence: 0.89 },
  { sku: "NX-VANTA-31", region: "North", current: 320, predicted: 700, risk: "stockout", confidence: 0.97 },
];

export const categoryMix = [
  { name: "Personal Care", value: 38 },
  { name: "Beverages", value: 24 },
  { name: "Snacks", value: 18 },
  { name: "Home", value: 12 },
  { name: "Other", value: 8 },
];

export const anomalies = [
  { id: "A-1042", type: "Sales spike", region: "South · Bengaluru", severity: "high", delta: "+318%", time: "14m ago" },
  { id: "A-1041", type: "Stock break", region: "North · Delhi WH-2", severity: "critical", delta: "0 units", time: "1h ago" },
  { id: "A-1040", type: "Returns surge", region: "West · Mumbai", severity: "medium", delta: "+47%", time: "3h ago" },
  { id: "A-1039", type: "Demand drop", region: "East · Kolkata", severity: "medium", delta: "-22%", time: "6h ago" },
  { id: "A-1038", type: "Lead time slip", region: "Central · Nagpur", severity: "low", delta: "+2.1d", time: "yesterday" },
];

export const optimizations = [
  { sku: "NX-AERO-01", action: "Reorder 1,200u", from: "WH-Delhi", to: "WH-Pune", saving: "$8,420", impact: "+4.1% margin" },
  { sku: "NX-FLUX-22", action: "Rebalance 480u", from: "WH-Pune", to: "WH-Chennai", saving: "$3,180", impact: "-12% stockout risk" },
  { sku: "NX-ORBIT-14", action: "Safety stock +20%", from: "—", to: "WH-Kolkata", saving: "$5,650", impact: "+2.3% fill rate" },
  { sku: "NX-VANTA-31", action: "Air freight 320u", from: "Vendor", to: "WH-Delhi", saving: "$2,910", impact: "Avoid stockout" },
];

export const cohorts = (() => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
  return months.map((m, i) => {
    const row: { cohort: string; size: number; values: number[] } = { cohort: m, size: 1000 + i * 120, values: [] };
    for (let k = 0; k < 8 - i; k++) {
      const base = 100 * Math.exp(-k * 0.28) + (Math.sin(i + k) + 1) * 3;
      row.values.push(Math.round(base));
    }
    return row;
  });
})();

export const simulatorBase = {
  revenue: 1420000,
  margin: 0.34,
  stockRisk: 37,
  demandIndex: 100,
};
