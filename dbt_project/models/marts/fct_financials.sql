-- Fact table used by the semantic layer for revenue / cost / margin measures.
select
    id,
    transaction_date,
    fiscal_quarter,
    fiscal_month,
    region,
    product_name,
    amount,
    cost,
    amount - cost as profit,
    round((amount - cost) / nullif(amount, 0) * 100, 1) as margin_pct
from {{ ref('stg_financials') }}
