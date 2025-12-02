import { v4 as uuidv4 } from "uuid";

// key for localStorage
const localStorageKey = process.env.REACT_APP_BASE_KEY;

// simpulates the API delay
const apiDelay = (delay = 300) =>
  new Promise((resolve, reject) => setTimeout(resolve, delay));

const getResult = (statusCode, status, message, data) => {
  return {
    statusCode,
    status,
    message,
    data,
  };
};

const getLocalStorageNotifications = () => {
  return localStorage.getItem(localStorageKey);
};

const saveLocalStorageNotifications = (items) => {
  localStorage.setItem(localStorageKey, items);
};

export const notification = {
  // get paginated and all notifications
  async getNotifications(page, itemsCount = 10) {
    await apiDelay(300);

    const result = getResult(
      200,
      "success",
      "Notifications fetched successfully",
      {}
    );

    const allNotifications = getLocalStorageNotifications();

    if (page) {
      const paginatedItems = items.slice(
        (page - 1) * itemsCount,
        page * itemsCount
      );

      return {
        ...result,
        data: { notifications: paginatedItems, totalRecords: items.length },
      };
    }

    return {
      ...result,
      data: { notifications: allNotifications, totalRecords: items.length },
    };
  },

  async addNotification(item) {
    await apiDelay(500);

    const result = getResult(
      201,
      "success",
      "Notification created successfully",
      {}
    );
    const allNotifications = getLocalStorageNotifications();
    const { title, description, category } = item;
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

    saveLocalStorageNotifications(allNotifications);

    return {
      ...result,
      data: {
        notificationID,
      },
    };
  },

  async multiAddNotification() {},
};
