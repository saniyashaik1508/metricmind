import { ArrowUpRight, ArrowDownRight, Info } from "lucide-react";

const iconMap = {
  up: { icon: ArrowUpRight, bg: "bg-emerald-100", fg: "text-emerald-600" },
  down: { icon: ArrowDownRight, bg: "bg-rose-100", fg: "text-rose-600" },
  info: { icon: Info, bg: "bg-blue-100", fg: "text-blue-600" },
};

export default function InsightsPanel({ data }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5">
      <h3 className="font-semibold text-slate-900 mb-4">Insights</h3>
      <ul className="space-y-4">
        {data.map((item, i) => {
          const { icon: Icon, bg, fg } = iconMap[item.type] || iconMap.info;
          return (
            <li key={i} className="flex items-start gap-3">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${bg}`}>
                <Icon className={`w-4 h-4 ${fg}`} />
              </div>
              <p className="text-sm text-slate-700 leading-snug">{item.text}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
