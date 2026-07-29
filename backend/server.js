require("dotenv").config();
const express = require("express");
const cors = require("cors");

const metricsRouter = require("./routes/metrics");
const assistantRouter = require("./routes/assistant");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "MetricMind API", time: new Date().toISOString() });
});

app.use("/api/metrics", metricsRouter);
app.use("/api/assistant", assistantRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`MetricMind API listening on http://localhost:${PORT}`);
});
