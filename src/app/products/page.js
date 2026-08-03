import PageShell from "@/components/PageShell";
import TopProductsTable from "@/components/TopProductsTable";
import { getTopProducts } from "@/lib/api";

export const metadata = { title: "Products — MetricMind" };

export default async function ProductsPage() {
  const topProducts = await getTopProducts();

  return (
    <PageShell>
      <h2 className="text-lg font-semibold text-slate-900">Products</h2>
      <TopProductsTable data={topProducts} />
    </PageShell>
  );
}
