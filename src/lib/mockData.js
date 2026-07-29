// Client-side fallback data - mirrors backend/data/mockData.js.
// Used if the Express API is unreachable so the dashboard always renders.

export const fallbackOverview = {
  kpis: {
    totalRevenue: { value: 2450000, label: "Total Revenue", change: 12.6, direction: "up" },
    totalCost: { value: 1680000, label: "Total Cost", change: 8.4, direction: "up" },
    grossMargin: { value: 31.4, label: "Gross Margin", change: 3.2, direction: "up", isPercent: true },
    netProfit: { value: 770100, label: "Net Profit", change: 15.7, direction: "up" },
  },
  revenueTrend: [
    { month: "Jan", revenue: 320000 },
    { month: "Feb", revenue: 610000 },
    { month: "Mar", revenue: 410000 },
    { month: "Apr", revenue: 540000 },
    { month: "May", revenue: 620000 },
    { month: "Jun", revenue: 900000 },
  ],
  revenueByRegion: [
    { region: "Europe", value: 980500, percent: 40.1, color: "#3b82f6" },
    { region: "Asia", value: 710200, percent: 29.0, color: "#22c55e" },
    { region: "America", value: 510600, percent: 20.9, color: "#eab308" },
    { region: "Africa", value: 249700, percent: 10.2, color: "#ef4444" },
  ],
  costBreakdown: [
    { category: "Shipping", value: 620300, percent: 36.9, color: "#3b82f6" },
    { category: "Marketing", value: 410600, percent: 24.4, color: "#22c55e" },
    { category: "Operations", value: 390200, percent: 23.2, color: "#eab308" },
    { category: "Other Costs", value: 259200, percent: 15.5, color: "#ef4444" },
  ],
  quarterlyPerformance: [
    { quarter: "Q1 2025", revenue: 2.1, cost: 1.5, marginPct: 28.6 },
    { quarter: "Q2 2025", revenue: 2.2, cost: 1.55, marginPct: 29.5 },
    { quarter: "Q3 2025", revenue: 2.0, cost: 1.6, marginPct: 20.0 },
    { quarter: "Q4 2025", revenue: 2.3, cost: 1.5, marginPct: 34.8 },
  ],
  topProducts: [
    { product: "Product A", revenue: 620300, cost: 410200, marginPct: 33.9, trend: "up" },
    { product: "Product B", revenue: 510600, cost: 320100, marginPct: 37.3, trend: "up" },
    { product: "Product C", revenue: 410200, cost: 290400, marginPct: 29.1, trend: "up" },
  ],
  insights: [
    { type: "up", text: "Revenue increased by 12.6% compared to the previous period." },
    { type: "down", text: "Shipping costs increased by 18.3%, impacting overall margins." },
    { type: "info", text: "Asia region showed strong growth of 15.7% in revenue." },
  ],
};
