import { notificationApi } from "./adminAPI";
import { userNotificationApi } from "./userAPI";
import { dashboardAPI } from "./dashboardAPI";
import {
  saveLocalStorageNotifications,
  getLocalStorageNotifications,
  sentNotificationToUser,
  REACT_APP_BASE_KEY as localStorageNotificationKey,
  REACT_APP_USER_KEY as localStorageUserKey,
} from "./utils";
import { allNotifications, actions, channels } from "./intitalData";

if (!localStorage.getItem("first_login")) {
  saveLocalStorageNotifications("first_login", "1");
  saveLocalStorageNotifications("actions", actions);
  saveLocalStorageNotifications("channels", channels);
  saveLocalStorageNotifications(localStorageNotificationKey, allNotifications);
  sentNotificationToUser();
}

export { notificationApi };
export { userNotificationApi };
export { dashboardAPI };
