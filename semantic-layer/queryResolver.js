// Resolves a "semantic query" (measure + dimension + time + filters) into a
// human-readable description of the generated query and, where possible,
// against the mock/DuckDB-backed dataset. This keeps the AI Assistant and
// the dashboard "Explore Metrics" screen answering from the same logic.

const { measures, dimensions } = require("./schema");
const data = require("../backend/data/mockData");

function describeQuery({ measure, dimension, time, filters }) {
  const m = measures[measure];
  const d = dimension ? dimensions[dimension] : null;

  return {
    measure: m ? m.label : measure,
    dimension: d ? d.label : dimension || null,
    time: time || "All time",
    filters: filters || {},
    generatedSql: buildSql({ measure, dimension, time, filters }),
  };
}

function buildSql({ measure, dimension, time, filters }) {
  const m = measures[measure] || measures.revenue;
  const d = dimension ? dimensions[dimension] : null;

  const selectCols = d ? `${d.column}, ${m.sql} AS ${measure}` : `${m.sql} AS ${measure}`;
  const groupBy = d ? ` GROUP BY ${d.column}` : "";
  const whereClauses = [];

  if (time) whereClauses.push(`fiscal_quarter = '${time}'`);
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      whereClauses.push(`${key} = '${value}'`);
    });
  }

  const where = whereClauses.length ? ` WHERE ${whereClauses.join(" AND ")}` : "";

  return `SELECT ${selectCols} FROM ${m.table}${where}${groupBy};`;
}

// Simple rule-based answer engine used as a fallback / demo brain for the
// AI Assistant when no OPENAI_API_KEY is configured. Real deployments can
// swap this out for a call to the OpenAI API using the same semantic
// context (see backend/routes/assistant.js).
function answerQuestion(question) {
  const q = question.toLowerCase();

  if (q.includes("margin") && (q.includes("europe") || q.includes("european"))) {
    return {
      answer:
        "European margins declined mainly because shipping costs increased significantly during Q3 2025 while revenue remained relatively stable. Shipping contributed the largest increase in total operating costs, reducing overall profit margins.",
      query: describeQuery({
        measure: "grossMargin",
        dimension: "region",
        time: "Q3 2025",
        filters: { region: "Europe" },
      }),
    };
  }

  if (q.includes("region")) {
    const lines = data.revenueByRegion
      .map((r) => `${r.region}: $${(r.value / 1000).toFixed(1)}K (${r.percent}%)`)
      .join(", ");
    return {
      answer: `Here is the current revenue breakdown by region: ${lines}.`,
      query: describeQuery({ measure: "revenue", dimension: "region" }),
    };
  }

  if (q.includes("quarter") && q.includes("profit")) {
    const best = [...data.quarterlyPerformance].sort((a, b) => b.marginPct - a.marginPct)[0];
    return {
      answer: `${best.quarter} had the highest profit margin at ${best.marginPct}%.`,
      query: describeQuery({ measure: "grossMargin", dimension: "quarter" }),
    };
  }

  if (q.includes("last year") || q.includes("compare")) {
    return {
      answer:
        "Compared to the same period last year, revenue is up 12.6% and net profit is up 15.7%, driven mainly by growth in the Asia region.",
      query: describeQuery({ measure: "revenue", time: "YoY" }),
    };
  }

  return {
    answer:
      "I can help with revenue, cost, margin, and profit questions across regions, products, and quarters. Try asking about a specific region or quarter.",
    query: describeQuery({ measure: "revenue" }),
  };
}

module.exports = { describeQuery, buildSql, answerQuestion };
