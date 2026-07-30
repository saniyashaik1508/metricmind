"use client";

import {
  BarChart3,
  MessageSquare,
  Compass,
  Layers,
  FileText,
  Database,
  ShieldCheck,
  Settings,
  Moon,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "overview", icon: BarChart3, active: true },
  { label: "Analytics", icon: MessageSquare },
  { label: "Revenue", icon: Layers },
  { label: "Regions", icon: Compass },
  { label: "Products", icon: MessageSquare },
  { label: "settings", icon: Settings },
];

export default function Sidebar() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-slate-900 text-slate-200 min-h-screen">
      <div className="px-6 py-6 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-brand-400" />
          <span className="text-lg font-bold text-white">MetricMind</span>
        </div>
        <p className="text-xs text-slate-400 mt-1">Agentic Semantic BI Engine</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ label, icon: Icon, active }) => (
          <button
            key={label}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active
              ? "bg-brand-600 text-white"
              : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-slate-800 space-y-4">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <Moon className="w-4 h-4" />
            Dark Mode
          </div>
          <button
            onClick={() => setDarkMode((v) => !v)}
            className={`w-10 h-5 rounded-full transition-colors relative ${darkMode ? "bg-brand-600" : "bg-slate-700"
              }`}
            aria-label="Toggle dark mode"
          >
            <span
              className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${darkMode ? "translate-x-5" : "translate-x-0.5"
                }`}
            />
          </button>
        </div>

        <div className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-full bg-brand-500 flex items-center justify-center text-sm font-semibold text-white">
            SA
          </div>
          <div className="text-sm">
            <p className="font-medium text-white leading-tight">Saniya Shaik</p>
            <p className="text-xs text-slate-400 leading-tight">Data Analyst</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
