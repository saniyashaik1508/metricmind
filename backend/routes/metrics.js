const express = require("express");
const router = express.Router();
const data = require("../data/mockData");
const { describeQuery } = require("../../semantic-layer/queryResolver");

// GET /api/metrics/overview - everything the dashboard needs in one call
router.get("/overview", (req, res) => {
  res.json({
    kpis: data.kpis,
    revenueTrend: data.revenueTrend,
    revenueByRegion: data.revenueByRegion,
    costBreakdown: data.costBreakdown,
    quarterlyPerformance: data.quarterlyPerformance,
    topProducts: data.topProducts,
    insights: data.insights,
  });
});

router.get("/kpis", (req, res) => res.json(data.kpis));
router.get("/revenue-trend", (req, res) => res.json(data.revenueTrend));
router.get("/revenue-by-region", (req, res) => res.json(data.revenueByRegion));
router.get("/cost-breakdown", (req, res) => res.json(data.costBreakdown));
router.get("/quarterly-performance", (req, res) => res.json(data.quarterlyPerformance));
router.get("/top-products", (req, res) => res.json(data.topProducts));
router.get("/insights", (req, res) => res.json(data.insights));

// GET /api/metrics/query?measure=revenue&dimension=region&time=Q3%202025
// Exposes the semantic layer directly, e.g. for "Explore Metrics".
router.get("/query", (req, res) => {
  const { measure = "revenue", dimension, time, ...filters } = req.query;
  res.json(describeQuery({ measure, dimension, time, filters }));
});

module.exports = router;
