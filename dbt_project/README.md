# MetricMind dbt project

This dbt project models the raw seeded financial transactions
(`seeds/raw_financials.csv`) into a small star schema that backs the
MetricMind semantic layer:

- `stg_financials` — cleaned staging view
- `fct_financials` — fact table (amount, cost, profit, margin %)
- `dim_region`, `dim_product`, `dim_date` — supporting dimensions

## Usage

This requires `dbt-duckdb` (`pip install dbt-duckdb`), which is not part of
the Node.js toolchain and is optional for running the web app - the app
ships with generated mock data out of the box so `npm run dev` works
without dbt or Python installed.

```bash
pip install dbt-duckdb
export DBT_PROFILES_DIR=$(pwd)
dbt seed
dbt run
```

This will materialize the tables into `backend/data/metricmind.duckdb`,
the same file the Express backend reads from when `DUCKDB_PATH` is set.
