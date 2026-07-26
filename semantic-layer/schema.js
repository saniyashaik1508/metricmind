// MetricMind Semantic Layer
// Declarative definition of measures, dimensions and their relationships.
// This is the single source of truth that both the AI Assistant and the
// dashboard query through - so a "measure" always means the same thing
// everywhere in the product.

const measures = {
  revenue: {
    label: "Revenue",
    sql: "SUM(amount)",
    table: "fct_financials",
    format: "currency",
  },
  cost: {
    label: "Cost",
    sql: "SUM(cost)",
    table: "fct_financials",
    format: "currency",
  },
  grossMargin: {
    label: "Gross Margin",
    sql: "(SUM(amount) - SUM(cost)) / SUM(amount) * 100",
    table: "fct_financials",
    format: "percent",
  },
  netProfit: {
    label: "Net Profit",
    sql: "SUM(amount) - SUM(cost)",
    table: "fct_financials",
    format: "currency",
  },
};

const dimensions = {
  region: {
    label: "Region",
    column: "region",
    table: "dim_region",
  },
  product: {
    label: "Product",
    column: "product_name",
    table: "dim_product",
  },
  quarter: {
    label: "Quarter",
    column: "fiscal_quarter",
    table: "dim_date",
  },
  month: {
    label: "Month",
    column: "fiscal_month",
    table: "dim_date",
  },
};

module.exports = { measures, dimensions };
