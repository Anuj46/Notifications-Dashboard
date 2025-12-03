export const apiDelay = (delay = 300) =>
  new Promise((resolve, reject) => setTimeout(resolve, delay));

export const getLocalStorageNotifications = (key) => {
  return localStorage.getItem(key);
};

export const saveLocalStorageNotifications = (key, items) => {
  localStorage.setItem(key, items);
};
