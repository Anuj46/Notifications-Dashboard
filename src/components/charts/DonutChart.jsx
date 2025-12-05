import React from "react";
import ReactApexChart from "react-apexcharts";
import "./chart.css";

const DonutChart = ({ series, labels, colors, width, height, responsive }) => {
  const options = {
    chart: {
      type: "donut",
    },
    labels: labels || [],
    colors: colors || undefined,
    responsive: responsive || [
      {
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    legend: {
      position: "top",
    },
  };

  return (
    <div id="donut-chart">
      <ReactApexChart
        options={options}
        series={series}
        type="donut"
        width={width || "100%"}
        height={height || "100%"}
      />
    </div>
  );
};

export default DonutChart;
