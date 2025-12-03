import { v4 as uuidv4 } from "uuid";
import {
  apiDelay,
  getLocalStorageNotifications,
  saveLocalStorageNotifications,
} from "./utils";
const localStorageKey = process.env.REACT_APP_BASE_KEY;

export const notificationApi = {
  // Get all notifications with pagination
  async getNotifications(page, itemsCount = 10) {
    return new Promise((resolve, reject) => {
      if (page !== undefined) {
        const pageNum = Number(page);
        const itemsNum = Number(itemsCount);

        if (
          isNaN(pageNum) ||
          isNaN(itemsNum) ||
          pageNum <= 0 ||
          itemsNum <= 0
        ) {
          return reject({
            statusCode: 404,
            status: "failed",
            message: "Please provide valid page or itemCount",
          });
        }
      }

      apiDelay(300).then(() => {
        const allNotifications = getLocalStorageNotifications(localStorageKey);
        const result = {
          statusCode: 200,
          status: "success",
          message: "Notifications fetched Successfully",
        };

        if (page === undefined) {
          return resolve({
            ...result,
            data: {
              notifications: allNotifications,
              totalRecords: allNotifications.length,
            },
          });
        }

        const pageNum = Number(page);
        const itemsNum = Number(itemsCount);

        const paginatedItems = allNotifications.slice(
          (pageNum - 1) * itemsNum,
          pageNum * itemsNum
        );

        return resolve({
          ...result,
          data: {
            notifications: paginatedItems,
            totalRecords: allNotifications.length,
          },
        });
      });
    });
  },

  // Add single notification
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
        const allNotifications = getLocalStorageNotifications(localStorageKey);
        const notificationID = uuidv4();

        const newItem = {
          notificationID,
          title,
          description,
          category,
          time: Date.now(),
          read: false,
        };

        allNotifications.unshift(newItem);
        saveLocalStorageNotifications(localStorageKey, allNotifications);

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
      const allNotifications = getLocalStorageNotifications(localStorageKey);
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

        saveLocalStorageNotifications(localStorageKey, newNotifications);
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
      const allNotifications = getLocalStorageNotifications(localStorageKey);
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

      saveLocalStorageNotifications(localStorageKey, filteredNotifications);
      resolve({
        statusCode: 204,
        status: "success",
        message: `Notification deleted successfully`,
      });
    });
  },
};

// const obj = {
// notificationID,
// channels,
// counts:{
//     like,
//     dislike,
//     read,
//     unread,
//     dismiss,
// }
// actions:{
//     like:true,
//     dismiss:true
// },
// title,
// description,
// created,
// sent
// }
