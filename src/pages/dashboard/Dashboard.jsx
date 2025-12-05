import React, { useEffect, useState } from "react";
import "./dashboard.css";
import Card from "../../components/dashboard/card/Card";
import Linechart from "../../components/charts/Linechart";
import DonutChart from "../../components/charts/DonutChart";
import ColumChart from "../../components/charts/ColumChart";
import { dashboardAPI } from "../../server";
import Loader from "../../components/loader/Loader";

const notificationSampleData = {
  series: [],
  categories: [],
  xAxisTitle: "Month",
  yAxisTitle: "Notifications Count",
  minY: 10,
  maxY: 100,
  colors: ["#FF4906", "#4DB50D"],
};

const userActionsSampleData = {
  series: [],
  labels: [],
  colors: ["#FF4906", "#4DB50D", "#8061DBF0"],
};

const channelSampleData = {
  series: [],
  categories: [],
  yAxisTitle: "Notification Count",
  xAxisTitle: "Channel",
  colors: ["#8061DBF0"],
  columnWidth: "45%",
};

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [tilesData, setTilesData] = useState([]);
  const [notificationData, setNotificationData] = useState(
    notificationSampleData
  );
  const [userActionsData, setUserActionsData] = useState(userActionsSampleData);
  const [channelGraph, setChannelGraph] = useState(channelSampleData);

  const fetchData = async (apiFunc) => {
    try {
      const res = await apiFunc();
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const processTiles = (data) => {
    if (!data) return [];
    return [
      {
        value: data.totalNotifications,
        label: "Total Notifications",
        sublabel: "Compared To Last Month",
        percentage: { value: "8%", increase: true },
      },
      {
        value: data.createdNotification,
        label: "Created Notifications",
        sublabel: "Compared To Last Month",
        percentage: { value: "16%", increase: true },
      },
      {
        value: data.sentNotifications,
        label: "Sent Notifications",
        sublabel: "Compared To Last Month",
        percentage: { value: "4%", increase: false },
      },
      {
        value: data.unsentNotifications,
        label: "Undelivered Notifications",
        sublabel: "Compared To Last Month",
        percentage: { value: "12%", increase: true },
      },
      {
        value: data.deliveryRate,
        label: "Delivery Rate",
        sublabel: "Compared To Last Month",
        percentage: { value: "10%", increase: false },
      },
    ];
  };

  useEffect(() => {
    const loadAllData = async () => {
      const [tiles, notificationGraph, userActionsGraph, channelGraphData] =
        await Promise.all([
          fetchData(dashboardAPI.getTiles),
          fetchData(dashboardAPI.getNotificationGraph),
          fetchData(dashboardAPI.getUserActionsGraph),
          fetchData(dashboardAPI.getChannelUtilizationGraph),
        ]);

      setTilesData(processTiles(tiles));

      if (notificationGraph) {
        setNotificationData({
          ...notificationSampleData,
          series: notificationGraph.chartData,
          categories: notificationGraph.months,
        });
      }

      if (userActionsGraph) {
        setUserActionsData({
          ...userActionsSampleData,
          series: userActionsGraph.chartData,
          labels: userActionsGraph.labels,
        });
      }

      if (channelGraphData) {
        setChannelGraph({
          ...channelSampleData,
          series: [
            { name: "Notification Count", data: channelGraphData.chartData },
          ],
          categories: channelGraphData.labels,
        });
      }

      setLoading(false);
    };

    loadAllData();
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard_heading">Dashboard</div>

      <div className="dashboard_content">
        {loading ? (
          <Loader />
        ) : (
          <>
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
                  <Linechart {...notificationData} />
                </div>
              </div>

              <div className="dashboard_graph">
                <div className="dashboard_graph_heading">User Actions</div>
                <div className="dashboard_graph_box">
                  <DonutChart {...userActionsData} />
                </div>
              </div>

              <div className="dashboard_graph">
                <div className="dashboard_graph_heading">
                  Channel Utilization
                </div>
                <div className="dashboard_graph_box">
                  <ColumChart {...channelGraph} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
