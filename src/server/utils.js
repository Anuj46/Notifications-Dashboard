export const REACT_APP_BASE_KEY = "notification";
export const REACT_APP_USER_KEY = "user_notification";

export const apiDelay = (delay = 300) =>
  new Promise((resolve, reject) => setTimeout(resolve, delay));

export const getLocalStorageNotifications = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const saveLocalStorageNotifications = (key, items) => {
  localStorage.setItem(key, JSON.stringify(items));
};

export const getFormattedDate = () => {
  const date = new Date();

  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

export const sentNotificationToUser = () => {
  const allActions = getLocalStorageNotifications("actions");
  const initalNotifications = getLocalStorageNotifications(REACT_APP_BASE_KEY);
  const notificationsToBeSend = initalNotifications.filter((item) => item.sent);
  const notificationsToBeSendIds = notificationsToBeSend.map(
    (item) => item.notificationID
  );

  console.log("s", notificationsToBeSendIds);
  const userNotifications = initalNotifications.filter((item) =>
    notificationsToBeSendIds.includes(item.notificationID)
  );

  const newUserNotifications = userNotifications.map((item) => {
    const idSet = new Set(item.actions);
    const itemActions = allActions.filter((act) => idSet.has(act.id));
    const actionItems = itemActions.map((act) => {
      return {
        label: act.label,
        id: act.id,
        status: false,
      };
    });

    return {
      title: item.title,
      description: item.description,
      notificationID: item.notificationID,
      sentTime: getFormattedDate(),
      actionItems: actionItems,
    };
  });

  saveLocalStorageNotifications(REACT_APP_USER_KEY, newUserNotifications);
};
