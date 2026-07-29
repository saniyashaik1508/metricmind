"use client";

import { BarChart3, Bell, Calendar, RefreshCw } from "lucide-react";

export default function TopBar() {
  return (
    <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 bg-white">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900">MetricMind</h1>
          <p className="text-sm text-slate-500">Here&apos;s your overview of business performance</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-600 hover:bg-slate-50">
          <Calendar className="w-4 h-4" />
          Jan 1 – Jun 30, 2025
        </button>
        <button className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50">
          <RefreshCw className="w-4 h-4" />
        </button>
        <button className="relative p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">
            3
          </span>
        </button>
        <div className="w-9 h-9 rounded-full bg-brand-100 flex items-center justify-center text-sm font-semibold text-brand-700">
          SA
        </div>
      </div>
    </div>
  );
}
