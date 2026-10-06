import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

export default function LineChart() {
  const options: ApexOptions = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
    },
  };

  const series = [
    {
      name: "Tests ejecutados",
      data: [12, 25, 18, 40, 35, 55],
    },
  ];

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h5 className="mb-4 text-xl font-bold">Ejecuciones por mes</h5>

      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
}
