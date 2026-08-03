import PageShell from "@/components/PageShell";
import RevenueByRegionChart from "@/components/RevenueByRegionChart";
import { formatCurrency, formatPercent } from "@/lib/format";
import { getRevenueByRegion } from "@/lib/api";

export const metadata = { title: "Regions — MetricMind" };

export default async function RegionsPage() {
  const revenueByRegion = await getRevenueByRegion();
  const total = revenueByRegion.reduce((sum, r) => sum + r.value, 0);

  return (
    <PageShell>
      <h2 className="text-lg font-semibold text-slate-900">Regions</h2>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <RevenueByRegionChart data={revenueByRegion} total={total} />

        <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5">
          <h3 className="font-semibold text-slate-900 mb-4">Revenue by Region — Detail</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-400 border-b border-slate-100">
                  <th className="pb-2 font-medium">Region</th>
                  <th className="pb-2 font-medium">Revenue</th>
                  <th className="pb-2 font-medium">Share</th>
                </tr>
              </thead>
              <tbody>
                {revenueByRegion.map((r) => (
                  <tr key={r.region} className="border-b border-slate-50 last:border-0">
                    <td className="py-3 flex items-center gap-2 text-slate-800">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: r.color }} />
                      {r.region}
                    </td>
                    <td className="py-3 text-slate-800">{formatCurrency(r.value)}</td>
                    <td className="py-3 text-slate-800">{formatPercent(r.percent)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
