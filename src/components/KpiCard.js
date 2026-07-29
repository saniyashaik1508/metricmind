import { ArrowUpRight, ArrowDownRight, TrendingUp, DollarSign, Percent, Wallet } from "lucide-react";
import { formatCurrency, formatPercent } from "@/lib/format";

const icons = {
  totalRevenue: { icon: TrendingUp, bg: "bg-brand-100", fg: "text-brand-600" },
  totalCost: { icon: DollarSign, bg: "bg-rose-100", fg: "text-rose-600" },
  grossMargin: { icon: Percent, bg: "bg-emerald-100", fg: "text-emerald-600" },
  netProfit: { icon: Wallet, bg: "bg-amber-100", fg: "text-amber-600" },
};

export default function KpiCard({ id, data }) {
  const { icon: Icon, bg, fg } = icons[id] || icons.totalRevenue;
  const isUp = data.direction === "up";
  const displayValue = data.isPercent ? formatPercent(data.value) : formatCurrency(data.value);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bg}`}>
          <Icon className={`w-5 h-5 ${fg}`} />
        </div>
        <span className="text-sm font-medium text-slate-600">{data.label}</span>
      </div>
      <p className="text-3xl font-bold text-slate-900">{displayValue}</p>
      <div className={`flex items-center gap-1 mt-2 text-sm font-medium ${isUp ? "text-emerald-600" : "text-rose-600"}`}>
        {isUp ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
        {data.change}% vs last period
      </div>
    </div>
  );
}
