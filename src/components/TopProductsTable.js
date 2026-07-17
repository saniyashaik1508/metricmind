import { TrendingUp } from "lucide-react";
import { formatCurrency, formatPercent } from "@/lib/format";

export default function TopProductsTable({ data }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5">
      <h3 className="font-semibold text-slate-900 mb-4">Top Performing Products</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-100">
              <th className="pb-2 font-medium">Product</th>
              <th className="pb-2 font-medium">Revenue</th>
              <th className="pb-2 font-medium">Cost</th>
              <th className="pb-2 font-medium">Margin %</th>
              <th className="pb-2 font-medium">Trend</th>
            </tr>
          </thead>
          <tbody>
            {data.map((p) => (
              <tr key={p.product} className="border-b border-slate-50 last:border-0">
                <td className="py-3 font-medium text-slate-800">{p.product}</td>
                <td className="py-3 text-slate-600">{formatCurrency(p.revenue)}</td>
                <td className="py-3 text-slate-600">{formatCurrency(p.cost)}</td>
                <td className="py-3 text-emerald-600 font-medium">{formatPercent(p.marginPct)}</td>
                <td className="py-3">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
