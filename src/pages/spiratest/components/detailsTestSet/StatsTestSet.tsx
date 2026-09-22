import { BarChart } from "../../../../components/ui/charts/BarChart";

export interface Stats {
  categories: string[];
  values: number[];
  colors: string[];
}
interface StatsTestSetProps {
  stats: Stats;
}

export const StatsTestSet = (props: StatsTestSetProps) => {
  const { stats } = props;

  return (
    <section className="py-5">
      <BarChart
        categories={stats.categories}
        values={stats.values}
        colors={stats.colors}
        title="Tests"
      />
    </section>
  );
};
