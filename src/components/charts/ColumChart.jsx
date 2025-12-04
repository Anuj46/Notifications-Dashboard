import React from "react";
import ReactApexChart from "react-apexcharts";
import "./chart.css";

const ColumChart = ({
  series,
  categories,
  yAxisTitle,
  xAxisTitle,
  height,
  colors,
  horizontal,
  columnWidth,
  borderRadius,
  showDataLabels,
  tooltipFormatter,
}) => {
  const options = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: horizontal || false,
        columnWidth: columnWidth || "55%",
        borderRadius: borderRadius || 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: showDataLabels || false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: categories || [],
      title: {
        text: xAxisTitle || "",
      },
    },
    yaxis: {
      title: {
        text: yAxisTitle || "",
      },
    },
    fill: {
      opacity: 1,
    },
    colors: colors || undefined,
    tooltip: {
      y: {
        formatter:
          tooltipFormatter ||
          function (val) {
            return val;
          },
      },
    },
  };

  return (
    <div id="column-chart">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={height || "100%"}
      />
    </div>
  );
};

export default ColumChart;
