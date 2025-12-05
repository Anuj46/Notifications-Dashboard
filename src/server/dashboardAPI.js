import {
  apiDelay,
  getLocalStorageNotifications,
  REACT_APP_BASE_KEY as localStorageNotificationKey,
  REACT_APP_USER_KEY as localStorageUserKey,
} from "./utils";

export const dashboardAPI = {
  async getActions() {
    return new Promise((resolve, reject) => {
      apiDelay(522).then(() => {
        const actions = getLocalStorageNotifications("actions");
      
        resolve({
          statusCode: 200,
          status: "success",
          message: "Actions fetched successfully",
          data: {
            actions,
          },
        });
      });
    });
  },

  async getChannels() {
    return new Promise((resolve, reject) => {
      apiDelay(253).then(() => {
        const channels = getLocalStorageNotifications("channels");
        resolve({
          statusCode: 200,
          status: "success",
          message: "Channels fetched successfully",
          data: {
            channels,
          },
        });
      });
    });
  },

  async getTiles() {
    return new Promise((resolve) => {
      apiDelay(300).then(() => {
        const allNotifications = getLocalStorageNotifications(
          localStorageNotificationKey
        );

        const sentNotifications = allNotifications.filter((item) => item.sent);
        const unsentNotifications = allNotifications.filter(
          (item) => !item.sent
        );

        resolve({
          statusCode: 200,
          status: "success",
          message: "Tiles fetched successfully",
          data: {
            sentNotifications: sentNotifications.length,
            unsentNotifications: unsentNotifications.length,
            totalNotifications: allNotifications.length,
            createdNotification: 15,
            deliveryRate: "65%",
          },
        });
      });
    });
  },

  async getNotificationGraph() {
    return new Promise((resolve) => {
      apiDelay(300).then(() => {
        const chartData = [
          {
            name: "Notidication created",
            data: [26, 39, 46, 38, 69, 73, 85],
          },
          {
            name: "Notification Sent",
            data: [22, 35, 42, 40, 52, 82, 85],
          },
        ];
        const months = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        resolve({
          statusCode: 200,
          status: "success",
          message: "Graph data fetched successfully",
          data: {
            chartData,
            months,
          },
        });
      });
    });
  },

  async getUserActionsGraph() {
    return new Promise((resolve, reject) => {
      apiDelay(520).then(() => {
        const allActions = getLocalStorageNotifications("actions");
        const labels = allActions.map((item) => item.label);
        const chartData = [44, 55, 57];

        resolve({
          statusCode: 200,
          status: "success",
          message: "Graph data fetched successfully",
          data: {
            chartData,
            labels,
          },
        });
      });
    });
  },

  async getChannelUtilizationGraph() {
    return new Promise((resolve, reject) => {
      apiDelay(455).then(() => {
        const allChannels = getLocalStorageNotifications("channels");
        const labels = allChannels.map((item) => item.label);
        const chartData = [44, 55, 57, 56, 61, 58];

        resolve({
          statusCode: 200,
          status: "success",
          message: "Graph data fetched successfully",
          data: {
            chartData,
            labels,
          },
        });
      });
    });
  },
};
