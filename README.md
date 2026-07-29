# MetricMind — Agentic Semantic BI Engine

MetricMind is a modern business-intelligence dashboard (Power BI–style)
with a governed **semantic layer**, a **dbt + DuckDB** analytics backend,
and an **agentic AI assistant** that answers business questions using that
same semantic layer (OpenAI-ready, with a built-in offline fallback).

## Tech stack

- **Frontend:** Next.js 14 (App Router), React 18, Tailwind CSS, Recharts, lucide-react
- **Backend:** Express.js REST API
- **Semantic layer:** hand-rolled measures/dimensions module (`semantic-layer/`) used by both the API and the AI assistant
- **Analytics:** dbt project (`dbt_project/`) modeling seed data into a star schema, designed to run against **DuckDB**
- **AI:** OpenAI-ready chat completion call, with a deterministic rule-based fallback so the assistant works with zero configuration

## Quick start

```bash
npm install
npm run dev
```

This starts **both**:
- the Next.js frontend at http://localhost:3000
- the Express API at http://localhost:4000

The dashboard fetches live data from the Express API and automatically
falls back to bundled mock data if the API isn't reachable yet, so the UI
always renders.

### Other scripts

```bash
npm run dev:web   # frontend only
npm run dev:api   # backend only
npm run build     # production build of the frontend
npm run start     # run built frontend + backend
```

## Project structure

```
metricmind/
├── src/
│   ├── app/                # Next.js App Router (layout, page)
│   ├── components/         # Dashboard UI: Sidebar, TopBar, charts, AI Assistant...
│   └── lib/                 # API client, mock data fallback, formatters
├── styles/globals.css      # Tailwind entrypoint
├── backend/
│   ├── server.js           # Express app entrypoint
│   ├── routes/              # /api/metrics, /api/assistant
│   └── data/mockData.js     # Realistic mock financial dataset
├── semantic-layer/
│   ├── schema.js             # Measures & dimensions definitions
│   └── queryResolver.js      # Builds semantic SQL + answers AI questions
├── dbt_project/
│   ├── dbt_project.yml
│   ├── profiles.yml
│   ├── seeds/raw_financials.csv
│   └── models/{staging,marts}/*.sql
└── public/                  # Static assets
```

## Environment variables

Copy `.env.example` to `.env` and adjust as needed:

```bash
cp .env.example .env
```

- `NEXT_PUBLIC_API_BASE_URL` — where the frontend looks for the Express API (default `http://localhost:4000/api`)
- `PORT` — Express server port (default `4000`)
- `OPENAI_API_KEY` — optional; when set, the `/api/assistant/ask` route calls the OpenAI Chat Completions API using the semantic layer as system context. When unset, it uses the built-in rule-based semantic answer engine, so the assistant works out of the box.
- `DUCKDB_PATH` — path to the DuckDB database file the dbt project materializes into

## Semantic layer

`semantic-layer/schema.js` defines **measures** (Revenue, Cost, Gross
Margin, Net Profit) and **dimensions** (Region, Product, Quarter, Month)
once, so the dashboard, the `/api/metrics/query` endpoint, and the AI
Assistant all speak the same business vocabulary. `queryResolver.js`
turns a `{ measure, dimension, time, filters }` request into a
human-readable generated SQL string against the dbt-modeled
`fct_financials` fact table — this is what powers the "Query Details" /
"View Generated Query" panel in the AI Assistant.

## dbt + DuckDB

`dbt_project/` contains a small, runnable dbt project:

- `seeds/raw_financials.csv` — raw transactions (region, product, amount, cost, quarter)
- `models/staging/stg_financials.sql` — typed staging view
- `models/marts/fct_financials.sql` — fact table with profit & margin %
- `models/marts/dim_region.sql`, `dim_product.sql`, `dim_date.sql` — dimensions

To materialize it into DuckDB (optional — the Node app runs fine without
this step, using the bundled mock dataset):

```bash
pip install dbt-duckdb
export DBT_PROFILES_DIR=$(pwd)/dbt_project
cd dbt_project
dbt seed
dbt run
```

See `dbt_project/README.md` for details.

## API reference

| Method | Route | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/metrics/overview` | Full dashboard payload (KPIs, charts, insights) |
| GET | `/api/metrics/kpis` | KPI cards only |
| GET | `/api/metrics/query?measure=revenue&dimension=region` | Ad-hoc semantic layer query |
| POST | `/api/assistant/ask` | `{ "question": "..." }` → AI assistant answer + generated query details |

## Notes

- The dashboard header always reads **MetricMind** (rather than a
  personalized "Good morning" greeting).
- `duckdb` is listed as a dependency for use by the backend / dbt
  workflow; the Node app itself ships with a mock-data layer so
  `npm run dev` works immediately without any database setup.
