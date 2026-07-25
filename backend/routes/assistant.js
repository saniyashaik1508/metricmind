const express = require("express");
const router = express.Router();
const { answerQuestion } = require("../../semantic-layer/queryResolver");

// POST /api/assistant/ask { question: string }
// Uses OPENAI_API_KEY when present (OpenAI-ready), otherwise falls back to
// the deterministic rule-based semantic layer answers so the assistant
// always works out of the box.
router.post("/ask", async (req, res) => {
  const { question } = req.body || {};

  if (!question || typeof question !== "string") {
    return res.status(400).json({ error: "question is required" });
  }

  if (process.env.OPENAI_API_KEY) {
    try {
      const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You are MetricMind, an agentic semantic BI assistant. Answer business questions about revenue, cost, margin, and profit concisely using the provided semantic layer context.",
            },
            { role: "user", content: question },
          ],
        }),
      });

      if (openaiResponse.ok) {
        const payload = await openaiResponse.json();
        const answer = payload.choices?.[0]?.message?.content;
        if (answer) {
          return res.json({ answer, source: "openai" });
        }
      }
    } catch (err) {
      console.error("OpenAI call failed, falling back to semantic layer:", err.message);
    }
  }

  const result = answerQuestion(question);
  res.json({ ...result, source: "semantic-layer" });
});

module.exports = router;
