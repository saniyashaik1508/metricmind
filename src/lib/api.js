import { fallbackOverview } from "./mockData";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api";

export async function getOverview() {
  try {
    const res = await fetch(`${API_BASE_URL}/metrics/overview`, { cache: "no-store" });
    if (!res.ok) throw new Error("Bad response");
    return await res.json();
  } catch (err) {
    // Backend not running yet / network unavailable - fall back to mock data
    // so the dashboard always renders something useful.
    return fallbackOverview;
  }
}

export async function askAssistant(question) {
  try {
    const res = await fetch(`${API_BASE_URL}/assistant/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
    if (!res.ok) throw new Error("Bad response");
    return await res.json();
  } catch (err) {
    return {
      answer:
        "I can't reach the MetricMind API right now. Make sure the backend is running with `npm run dev:api` (or `npm run dev` to start both).",
      source: "offline",
    };
  }
}
