"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { formatCurrency } from "@/lib/format";

export default function CostBreakdownChart({ data }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-5">
      <h3 className="font-semibold text-slate-900 mb-4">Cost Breakdown</h3>
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="w-48 h-48 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="category"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={2}
                strokeWidth={0}
              >
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => formatCurrency(v)} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="flex-1 w-full space-y-3">
          {data.map((c) => (
            <li key={c.category} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                <span className="text-slate-700">{c.category}</span>
              </div>
              <span className="font-medium text-slate-900">
                {formatCurrency(c.value)} ({c.percent}%)
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
