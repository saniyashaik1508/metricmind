select distinct region
from {{ ref('stg_financials') }}
