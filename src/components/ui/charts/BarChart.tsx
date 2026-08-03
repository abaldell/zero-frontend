import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

interface BarChartProps {
  categories: string[];
  values: number[];
  colors: string[];
  title?: string;
}

export const BarChart = (props: BarChartProps) => {
  const { categories, values, title, colors } = props;
  const options: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    colors: colors,
    xaxis: {
      categories,
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        distributed: true,
      },
    },
  };

  const series = [
    {
      name: title || "Datos",
      data: values,
    },
  ];

  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      height={250}
      width={"100%"}
    />
  );
};
