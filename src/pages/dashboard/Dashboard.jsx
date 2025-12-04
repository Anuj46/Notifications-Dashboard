import React, { useState } from "react";
import "./dashboard.css";
import Card from "../../components/dashboard/card/Card";
import Linechart from "../../components/charts/Linechart";
import DonutChart from "../../components/charts/DonutChart";
import ColumChart from "../../components/charts/ColumChart";

const items = [
  {
    value: "1875",
    label: "Total Notifications",
    sublabel: "Compared To Last Month",
    percentage: {
      value: "8%",
      increase: true,
    },
  },
  {
    value: "125",
    label: "Created Notifications",
    sublabel: "Compared To Last Month",
    percentage: {
      value: "16%",
      increase: true,
    },
  },
  {
    value: "125",
    label: "Sent Notifications",
    sublabel: "Compared To Last Month",
    percentage: {
      value: "4%",
      increase: false,
    },
  },
  {
    value: "125",
    label: "Undelivered Notifications",
    sublabel: "Compared To Last Month",
    percentage: {
      value: "12%",
      increase: true,
    },
  },
  {
    value: "125",
    label: "Delivery Rate",
    sublabel: "Compared To Last Month",
    percentage: {
      value: "10%",
      increase: false,
    },
  },
];

const sampleData = {
  series: [
    {
      name: "Notidication created",
      data: [26, 39, 46, 38, 69, 73, 85],
    },
    {
      name: "Notification Sent",
      data: [22, 35, 42, 40, 52, 82, 85],
    },
  ],
  categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  xAxisTitle: "Month",
  yAxisTitle: "Notifications Count",
  minY: 10,
  maxY: 100,
  colors: ["#FF4906", "#4DB50D"],
};

const sampleData1 = {
  series: [44, 55, 41, 17, 15],
  labels: ["Liked", "Disliked", "Dismissed", "Mark as Read", "Mark as Unread"],
  colors: ["#EC7D10", "#EC0868", "#C200FB", "#39FF14", "#FFBC0A"],
};

const profitData = {
  series: [
    {
      name: "Net Profit",
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
    },
  ],
  categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
  //   title: "Monthly Net Profit",
  yAxisTitle: "Notification Count",
  xAxisTitle: "Channel",
  colors: ["#8061DBF0"],
  columnWidth: "45%",
  tooltipFormatter: (val) => `$ ${val} thousands`,
};

const Dashboard = () => {
  const [tilesData, setTilesData] = useState(items);
  return (
    <div className="dashboard_wrapper">
      <div className="dashboard">
        <div className="dashboard_heading">Dashboard</div>
        <div className="dashboard_content">
          <div className="dashboard_tiles">
            {tilesData.map((item) => (
              <div className="dashboard_tile" key={item.label}>
                <Card data={item} />
              </div>
            ))}
          </div>
          <div className="dashboard_graphs">
            <div className="dashboard_graph">
              <div className="dashboard_graph_heading">
                Notifications Delivered
              </div>
              <div className="dashboard_graph_box">
                <Linechart
                  series={sampleData.series}
                  categories={sampleData.categories}
                  title={sampleData.title}
                  xAxisTitle={sampleData.xAxisTitle}
                  yAxisTitle={sampleData.yAxisTitle}
                  minY={sampleData.minY}
                  maxY={sampleData.maxY}
                  colors={sampleData.colors}
                />
              </div>
            </div>
            <div className="dashboard_graph">
              <div className="dashboard_graph_heading">User Actions</div>
              <div className="dashboard_graph_box">
                <DonutChart
                  series={sampleData1.series}
                  labels={sampleData1.labels}
                  colors={sampleData1.colors}
                  width={sampleData1.width}
                  //   height={sampleData1.height}
                />
              </div>
            </div>
            <div className="dashboard_graph">
              <div className="dashboard_graph_heading">Channel Utilization</div>
              <div className="dashboard_graph_box">
                <ColumChart
                  series={profitData.series}
                  categories={profitData.categories}
                  yAxisTitle={profitData.yAxisTitle}
                  xAxisTitle={profitData.xAxisTitle}
                  colors={profitData.colors}
                  columnWidth={profitData.columnWidth}
                  tooltipFormatter={profitData.tooltipFormatter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
