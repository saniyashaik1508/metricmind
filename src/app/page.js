import Dashboard from "@/components/Dashboard";
import { getOverview } from "@/lib/api";

export default async function Home() {
  const overview = await getOverview();
  return <Dashboard overview={overview} />;
}
