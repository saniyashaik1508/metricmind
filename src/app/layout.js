import "../../styles/globals.css";

export const metadata = {
  title: "MetricMind — Agentic Semantic BI Engine",
  description: "MetricMind is an agentic semantic BI engine dashboard for revenue, cost, margin and profit analytics.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
