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


// GET /api/metrics/query?measure=revenue&dimension=region&time=Q3%202025
// Exposes the semantic layer directly, e.g. for "Explore Metrics".
router.get("/query", (req, res) => {
  const { measure = "revenue", dimension, time, ...filters } = req.query;
  res.json(describeQuery({ measure, dimension, time, filters }));
});

module.exports = router;
