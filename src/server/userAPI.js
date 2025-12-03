import { v4 as uuidv4 } from "uuid";
import {
  apiDelay,
  getLocalStorageNotifications,
  saveLocalStorageNotifications,
} from "./utils";

const localStorageNotificationKey = process.env.REACT_APP_BASE_KEY;
const localStorageUserKey = process.env.REACT_APP_USER_KEY;

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
    return new Promise((resolve, reject) => {
      const userNotifications =
        getLocalStorageNotifications(localStorageUserKey);

      apiDelay(400).then(() => {
        const newNotifications = userNotifications.map((notification) => {
          if (notification.notificationID === action.id) {
            return {
              ...notification,
              [action.key]: action.value,
            };
          }
          return notification;
        });

        saveLocalStorageNotifications(localStorageUserKey, newNotifications);

        //   add count to all the notifications

        resolve({
          statusCode: 200,
          status: "success",
          message: "Notification marked as read",
        });
      });
    });
  },

  async markAllReadNotification() {
    return new Promise((resolve, reject) => {
      apiDelay(400).then(() => {
        const markReadarr = [];
        const userNotifications =
          getLocalStorageNotifications(localStorageUserKey);

        const newNotifications = userNotifications.map((notification) => {
          if (!notification.read) {
            markReadarr.push(notification.notificationID);
          }
          return {
            ...notification,
            read: true,
          };
        });

        // add count to all the notifications

        saveLocalStorageNotifications(localStorageUserKey, newNotifications);
        resolve({
          statusCode: 200,
          status: "success",
          message: "All notifications are marked as read",
        });
      });
    });
  },

  async deleteNotification(id) {
    return new Promise((reolve, reject) => {
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

// const obj = {
//   title,
//   description,
//   read,
//   dismiss,
//   liked,
//  getDate
// };
