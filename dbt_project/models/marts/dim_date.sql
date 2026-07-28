select distinct
    fiscal_quarter,
    fiscal_month
from {{ ref('stg_financials') }}
