-- Cleans and types the raw seeded financial transactions.
select
    id,
    cast(date as date) as transaction_date,
    fiscal_quarter,
    fiscal_month,
    region,
    product_name,
    cast(amount as double) as amount,
    cast(cost as double) as cost
from {{ ref('raw_financials') }}
