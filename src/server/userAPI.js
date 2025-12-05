import {
  apiDelay,
  getLocalStorageNotifications,
  saveLocalStorageNotifications,
  REACT_APP_BASE_KEY as localStorageNotificationKey,
  REACT_APP_USER_KEY as localStorageUserKey,
} from "./utils";

export const userNotificationApi = {
  async getNotification() {
    return new Promise((resolve) => {
      apiDelay(400).then(() => {
        const userNotifications =
          getLocalStorageNotifications(localStorageUserKey);
        resolve({
          statusCode: 200,
          status: "success",
          message: "Notifications fetched Successfully",
          data: {
            notifications: userNotifications,
            totalNotifications: userNotifications.length,
          },
        });
      });
    });
  },

  async markNotification(action) {
    return new Promise((resolve) => {
      const userNotifications =
        getLocalStorageNotifications(localStorageUserKey);

      apiDelay(400).then(() => {
        const updatedNotifications = userNotifications.map((notification) => {
          if (notification.notificationID === action.notificationID) {
            return {
              ...notification,
              actionItems: notification.actionItems.map((item) => {
                if (item.id === action.action) {
                  return { ...item, status: action.status };
                }
                return item;
              }),
            };
          }
          return notification;
        });

        saveLocalStorageNotifications(
          localStorageUserKey,
          updatedNotifications
        );

        resolve({
          statusCode: 200,
          status: "success",
          message: "Notification updated successfully",
          data: {
            notifications: updatedNotifications,
          },
        });
      });
    });
  },

  async markAllReadNotification() {
    return new Promise((resolve) => {
      apiDelay(400).then(() => {
        const userNotifications =
          getLocalStorageNotifications(localStorageUserKey);

        const updatedNotifications = userNotifications.map((notification) => {
          return {
            ...notification,
            actionItems: notification.actionItems.map((item) => {
              if (item.id === "read") {
                return { ...item, status: true };
              }
              return item;
            }),
          };
        });

        localStorage.setItem(
          localStorageUserKey,
          JSON.stringify(updatedNotifications)
        );

        resolve({
          statusCode: 200,
          status: "success",
          message: "All notifications marked as read",
          data: {
            notifications: updatedNotifications,
          },
        });
      });
    });
  },

  async deleteNotification(id) {
    return new Promise((resolve, reject) => {
      apiDelay(400).then(() => {
        const userNotifications =
          getLocalStorageNotifications(localStorageUserKey);

        const newNotifications = userNotifications.filter(
          (notification) => notification.notificationID !== id
        );

        saveLocalStorageNotifications(localStorageUserKey, newNotifications);

        resolve({
          statusCode: 204,
          status: "success",
          message: "Notification deleted successfully",
        });
      });
    });
  },
};

