import {
  apiDelay,
  getLocalStorageNotifications,
  saveLocalStorageNotifications,
  REACT_APP_BASE_KEY as localStorageNotificationKey,
  REACT_APP_USER_KEY as localStorageUserKey,
} from "./utils";

export const notificationApi = {
  // Get all notifications with pagination
  async getNotifications({
    sortBy = "desc",
    actions = [],
    channels = [],
    searchQuery = "",
  } = {}) {
    return new Promise((resolve, reject) => {
      apiDelay(300).then(() => {
        const allNotifications = getLocalStorageNotifications(
          localStorageNotificationKey
        );
        const allActions = getLocalStorageNotifications("actions");
        const allChannels = getLocalStorageNotifications("channels");

        let filtered = [...allNotifications];

        if (searchQuery.trim() !== "") {
          const q = searchQuery.toLowerCase();
          filtered = filtered.filter((item) =>
            item.title.toLowerCase().includes(q)
          );
        }

        if (actions.length > 0) {
          filtered = filtered.filter((item) =>
            item.actions.some((act) => actions.includes(act))
          );
        }

        if (channels.length > 0) {
          filtered = filtered.filter((item) =>
            item.channels.some((ch) => channels.includes(ch))
          );
        }

        filtered.sort((a, b) => {
          const dateA = new Date(a.created);
          const dateB = new Date(b.created);
          return sortBy === "asc" ? dateA - dateB : dateB - dateA;
        });

        filtered = filtered.map((item) => {
          const mappedActions = item.actions.map((id) =>
            allActions.find((act) => act.id === id)
          );

          const mappedChannels = item.channels.map((id) =>
            allChannels.find((ch) => ch.id === id)
          );

          return {
            ...item,
            actions: mappedActions,
            channels: mappedChannels,
          };
        });

        const sentNotifications = filtered.filter((item) => item.sent);
        const unsentNotifications = filtered.filter((item) => !item.sent);

        return resolve({
          statusCode: 200,
          status: "success",
          message: "Notifications fetched successfully",
          data: {
            sentNotifications,
            unsentNotifications,
            totalRecords: filtered.length,
          },
        });
      });
    });
  },

  // Add notification
  async addNotification(item) {
    return new Promise((resolve, reject) => {
      const { title, description, category } = item;

      if ((!title || !description) && !category) {
        return reject({
          statusCode: 400,
          status: "failed",
          message:
            "Title or description is required, and category is mandatory.",
        });
      }

      apiDelay(500).then(() => {
        const allNotifications = getLocalStorageNotifications(
          localStorageNotificationKey
        );
        const notificationID = Date.now();

        const newItem = {
          notificationID,
          title,
          description,
          category,
          time: Date.now(),
          read: false,
        };

        allNotifications.unshift(newItem);
        saveLocalStorageNotifications(
          localStorageNotificationKey,
          allNotifications
        );

        resolve({
          statusCode: 201,
          status: "success",
          message: "Notification created successfully",
          data: {
            notificationID,
          },
        });
      });
    });
  },

  // Edit notification

  async editNotification(item) {
    return new Promise((resolve, reject) => {
      const allNotifications = getLocalStorageNotifications(
        localStorageNotificationKey
      );
      const editableItem = allNotifications.find(
        (notification) => notification.notificationID === item.notificationID
      );

      if (!editableItem) {
        return reject({
          statusCode: 400,
          status: "failed",
          message: `Notification with notificationID - ${item.notificationID}, does not exist`,
        });
      }

      apiDelay(400).then(() => {
        const newNotifications = allNotifications.localeCompare(
          (notification) => {
            if (notification.notificationID === item.notificationID) {
              return;
            }
            return notification;
          }
        );

        saveLocalStorageNotifications(
          localStorageNotificationKey,
          newNotifications
        );
        resolve({
          statusCode: 201,
          status: "success",
          message: `Notification with notificationID - ${item.notificationID}, updated successfully`,
          data: {
            notificationID: item.notificationID,
          },
        });
      });
    });
  },

  async deleteNotification(item) {
    return new Promise((resolve, reject) => {
      const allNotifications = getLocalStorageNotifications(
        localStorageNotificationKey
      );
      const deleteItem = allNotifications.find(
        (notification) => notification.notificationID === item.notificationID
      );

      if (!deleteItem) {
        return reject({
          statusCode: 400,
          status: "failed",
          message: `Notification with notificationID - ${item.notificationID}, does not exist`,
        });
      }

      const filteredNotifications = allNotifications.filter(
        (notification) => notification.notificationID !== item.notificationID
      );

      saveLocalStorageNotifications(
        localStorageNotificationKey,
        filteredNotifications
      );
      resolve({
        statusCode: 204,
        status: "success",
        message: `Notification deleted successfully`,
      });
    });
  },
};
