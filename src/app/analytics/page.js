import PageShell from "@/components/PageShell";
import QuarterlyPerformanceChart from "@/components/QuarterlyPerformanceChart";
import CostBreakdownChart from "@/components/CostBreakdownChart";
import InsightsPanel from "@/components/InsightsPanel";
import { getQuarterlyPerformance, getCostBreakdown, getInsights } from "@/lib/api";

export const metadata = { title: "Analytics — MetricMind" };

export default async function AnalyticsPage() {
  const [quarterlyPerformance, costBreakdown, insights] = await Promise.all([
    getQuarterlyPerformance(),
    getCostBreakdown(),
    getInsights(),
  ]);

  return (
    <PageShell>
      <h2 className="text-lg font-semibold text-slate-900">Analytics</h2>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <QuarterlyPerformanceChart data={quarterlyPerformance} />
        <CostBreakdownChart data={costBreakdown} />
      </div>

      <InsightsPanel data={insights} />
    </PageShell>
  );
}
