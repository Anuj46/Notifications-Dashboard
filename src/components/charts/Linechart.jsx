import React from "react";
import ReactApexChart from "react-apexcharts";
import "./chart.css";

const Linechart = ({
  series,
  categories,
  title,
  xAxisTitle,
  yAxisTitle,
  minY,
  maxY,
  colors,
}) => {
  const options = {
    chart: {
      type: "line",

      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    colors: colors || ["#77B6EA", "#545454"],
    markers: {
      size: 1,
    },
    xaxis: {
      categories: categories || [],
      title: {
        text: xAxisTitle || "X Axis",
      },
    },
    yaxis: {
      title: {
        text: yAxisTitle || "Y Axis",
      },
      min: minY !== undefined ? minY : 0,
      max: maxY !== undefined ? maxY : 100,
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
    },
  };

  return (
    <div id="line-chart">
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={"100%"}
      />
    </div>
  );
};

export default Linechart;
