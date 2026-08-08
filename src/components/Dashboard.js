"use client";

import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import KpiCard from "./KpiCard";
import RevenueTrendChart from "./RevenueTrendChart";
import RevenueByRegionChart from "./RevenueByRegionChart";
import CostBreakdownChart from "./CostBreakdownChart";
import QuarterlyPerformanceChart from "./QuarterlyPerformanceChart";
import TopProductsTable from "./TopProductsTable";
import InsightsPanel from "./InsightsPanel";
import AIAssistant from "./AIAssistant";

export default function Dashboard({ overview }) {
  const { kpis, revenueTrend, revenueByRegion, costBreakdown, quarterlyPerformance, topProducts, insights } =
    overview;

  const totalRevenueForRegion = revenueByRegion.reduce((sum, r) => sum + r.value, 0);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 flex min-w-0">
        <main className="flex-1 min-w-0">
          <TopBar />

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              <KpiCard id="totalRevenue" data={kpis.totalRevenue} />
              <KpiCard id="totalCost" data={kpis.totalCost} />
              <KpiCard id="grossMargin" data={kpis.grossMargin} />
              <KpiCard id="netProfit" data={kpis.netProfit} />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              <RevenueTrendChart data={revenueTrend} />
              <RevenueByRegionChart data={revenueByRegion} total={totalRevenueForRegion} />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              <CostBreakdownChart data={costBreakdown} />
              <QuarterlyPerformanceChart data={quarterlyPerformance} 
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              <TopProductsTable data={topProducts} />
              <InsightsPanel data={insights} />
            </div>
          </div>
        </main>

        <AIAssistant />
      </div>
    </div>
  );
}
