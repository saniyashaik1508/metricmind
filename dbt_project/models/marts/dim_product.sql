select distinct product_name
from {{ ref('stg_financials') }}
