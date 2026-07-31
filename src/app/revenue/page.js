import PageShell from "@/components/PageShell";
import KpiCard from "@/components/KpiCard";
import RevenueTrendChart from "@/components/RevenueTrendChart";
import RevenueByRegionChart from "@/components/RevenueByRegionChart";
import { getOverview, getRevenueTrend, getRevenueByRegion } from "@/lib/api";

export const metadata = { title: "Revenue — MetricMind" };

export default async function RevenuePage() {
  const [overview, revenueTrend, revenueByRegion] = await Promise.all([
    getOverview(),
    getRevenueTrend(),
    getRevenueByRegion(),
  ]);

  const total = revenueByRegion.reduce((sum, r) => sum + r.value, 0);

  return (
    <PageShell>
      <h2 className="text-lg font-semibold text-slate-900">Revenue</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-xl">
        <KpiCard id="totalRevenue" data={overview.kpis.totalRevenue} />
        <KpiCard id="netProfit" data={overview.kpis.netProfit} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <RevenueTrendChart data={revenueTrend} />
        <RevenueByRegionChart data={revenueByRegion} total={total} />
      </div>
    </PageShell>
  );
}
