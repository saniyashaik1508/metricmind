"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, X, BarChart2, ShieldCheck, ChevronDown, ChevronUp } from "lucide-react";
import {

} from "recharts";
import { askAssistant } from "@/lib/api";
import { fallbackOverview } from "@/lib/mockData";
import { formatCurrency } from "@/lib/format";

const suggestedQuestions = [
  "Show revenue by region",
  "Which quarter had the highest profit?",
  "Compare revenue with last year",
];

const initialMessages = [
  {
    role: "user",
    text: "Why did our European margins drop last quarter?",
  },
  {
    role: "assistant",
    text: "European margins declined mainly because shipping costs increased significantly during Q3 2025 while revenue remained relatively stable. Shipping contributed the largest increase in total operating costs, reducing overall profit margins.",
    query: {
      measure: "Margin",
      dimension: "Region",
      time: "Q3 2025",
      filters: "Region = Europe",
    },
  },
];

// Picks the most relevant bar-chart dataset for a given query's dimension,
// falling back to region breakdown when the dimension isn't recognized.
function getBarChartData(query) {
  const dimension = (query?.dimension || "").toLowerCase();

  if (dimension.includes("quarter")) {
    return {
      title: "Revenue by Quarter",
      data: fallbackOverview.quarterlyPerformance.map((q) => ({
        label: q.quarter,
        value: q.revenue * 1000000,
      })),
    };
  }

  if (dimension.includes("product")) {
    return {
      title: "Revenue by Product",
      data: fallbackOverview.topProducts.map((p) => ({
        label: p.product,
        value: p.revenue,
      })),
    };
  }

  // Default / "region" dimension
  return {
    title: "Revenue by Region",
    data: fallbackOverview.revenueByRegion.map((r) => ({
      label: r.region,
      value: r.value,
      color: r.color,
    })),
  };
}

const barColors = ["#3b82f6", "#22c55e", "#eab308", "#ef4444", "#8b5cf6"];

export default function AIAssistant({ onQuickQuestion }) {
  const [open, setOpen] = useState(true);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [expandedAnalysis, setExpandedAnalysis] = useState({});
  const scrollRef = useRef(null);

  function toggleAnalysis(index) {
    setExpandedAnalysis((prev) => ({ ...prev, [index]: !prev[index] }));
  }

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function sendQuestion(question) {
    if (!question.trim()) return;
    setMessages((m) => [...m, { role: "user", text: question }]);
    setInput("");
    setLoading(true);

    const result = await askAssistant(question);

    setMessages((m) => [
      ...m,
      {
        role: "assistant",
        text: result.answer,
        query: result.query
          ? {
            measure: result.query.measure,
            dimension: result.query.dimension,
            time: result.query.time,
            filters: JSON.stringify(result.query.filters || {}),
          }
          : null,
      },
    ]);
    setLoading(false);
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-brand-600 text-white shadow-lg flex items-center justify-center hover:bg-brand-700"
        aria-label="Open MetricMind AI Assistant"
      >
        <Bot className="w-6 h-6" />
      </button>
    );
  }

  return (
    <aside className="w-full lg:w-96 shrink-0 bg-white border-l border-slate-200 flex flex-col h-full max-h-screen">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-brand-600 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Semantic Query Assistant</p>
            <p className="text-xs text-emerald-600 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Online
            </p>
          </div>
        </div>
        <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-600">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "flex justify-end" : ""}>
            {m.role === "user" ? (
              <div className="max-w-[85%] bg-brand-50 text-slate-800 rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm">
                {m.text}
              </div>
            ) : (
              <div className="space-y-3">
                <div className="bg-slate-50 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-slate-700 leading-relaxed">
                  {m.text}
                </div>
                {m.query && (
                  <div className="bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-600 space-y-1">
                    <p className="font-semibold text-slate-800 flex items-center gap-1.5 mb-1">
                      <BarChart2 className="w-3.5 h-3.5" /> Query Details
                    </p>
                    <p>
                      <span className="text-slate-400">Measure: </span>
                      {m.query.measure}
                    </p>
                    {m.query.dimension && (
                      <p>
                        <span className="text-slate-400">Dimension: </span>
                        {m.query.dimension}
                      </p>
                    )}
                    {m.query.time && (
                      <p>
                        <span className="text-slate-400">Time: </span>
                        {m.query.time}
                      </p>
                    )}
                    {m.query.filters && m.query.filters !== "{}" && (
                      <p>
                        <span className="text-slate-400">Filters: </span>
                        {m.query.filters}
                      </p>
                    )}
                    <button
                      onClick={() => toggleAnalysis(i)}
                      className="flex items-center gap-1 text-brand-700 font-medium pt-1 hover:text-brand-800"
                    >
                      {expandedAnalysis[i] ? (
                        <>
                          Hide Analysis <ChevronUp className="w-3.5 h-3.5" />
                        </>
                      ) : (
                        <>
                          View Analysis <ChevronDown className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                )}
                {m.query && expandedAnalysis[i] && (
                  <div className="bg-white border border-slate-200 rounded-xl p-3 space-y-4">
                    {(() => {
                      const { title, data } = getBarChartData(m.query);
                      return (
                        <div>
                          <p className="text-xs font-semibold text-slate-800 mb-2">{title}</p>
                          <ResponsiveContainer width="100%" height={140}>
                            <BarChart data={data} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                              <XAxis dataKey="label" tick={{ fontSize: 10 }} stroke="#94a3b8" />
                              <YAxis
                                tick={{ fontSize: 10 }}
                                stroke="#94a3b8"
                                tickFormatter={(v) => formatCurrency(v)}
                                width={44}
                              />
                              <Tooltip formatter={(v) => formatCurrency(v)} />
                              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                {data.map((entry, idx) => (
                                  <Cell key={idx} fill={entry.color || barColors[idx % barColors.length]} />
                                ))}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      );
                    })()}
                    <div>
                      <p className="text-xs font-semibold text-slate-800 mb-2">Revenue Trend</p>
                      <ResponsiveContainer width="100%" height={140}>
                        <LineChart
                          data={fallbackOverview.revenueTrend}
                          margin={{ top: 4, right: 4, left: 4, bottom: 0 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                          <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke="#94a3b8" />
                          <YAxis
                            tick={{ fontSize: 10 }}
                            stroke="#94a3b8"
                            tickFormatter={(v) => formatCurrency(v)}
                            width={44}
                          />
                          <Tooltip formatter={(v) => formatCurrency(v)} />
                          <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            dot={{ r: 3 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="bg-slate-50 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-slate-400 w-fit">
            MetricMind is thinking…
          </div>
        )}
      </div>

      <div className="px-5 pb-3 flex flex-wrap gap-2">
        {suggestedQuestions.map((q) => (
          <button
            key={q}
            onClick={() => sendQuestion(q)}
            className="text-xs px-3 py-1.5 rounded-full bg-brand-50 text-brand-700 hover:bg-brand-100"
          >
            {q}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendQuestion(input);
        }}
        className="px-5 py-4 border-t border-slate-100"
      >
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a business question..."
            className="flex-1 text-sm border border-slate-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
          <button
            type="submit"
            className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center hover:bg-brand-700 shrink-0"
            aria-label="Send"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="flex items-center gap-1 text-[11px] text-slate-400 mt-2">
          <ShieldCheck className="w-3 h-3" /> AI responses are based on governed business metrics.
        </p>
      </form>
    </aside>
  );
}