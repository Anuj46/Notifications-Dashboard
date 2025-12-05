import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  ChartBar,
  ChatCenteredDots,
  Bell,
  User,
  LineVertical,
} from "@phosphor-icons/react";
import "./header.css";
import { useLocation, useNavigate } from "react-router-dom";
import Popup from "../popup/Popup";
import NotificationCard from "../cards/NotificationCard";
import { userNotificationApi } from "../../server";
import Loader from "../loader/Loader";

const navigations = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <ChartBar size={14} />,
    path: "/",
  },
  {
    key: "notification",
    label: "Notifications",
    icon: <ChatCenteredDots size={14} />,
    path: "/notifications",
  },
];

const Header = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const selectedMenu = useMemo(() => {
    const firstSegment = location.pathname.split("/")[1];
    return firstSegment ? "notification" : "dashboard";
  }, [location.pathname]);

  const fetchNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const res = await userNotificationApi.getNotification();
      setNotifications(res.data.notifications || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const closePopup = () => setIsPopupOpen(false);

  const handleMarkAllRead = async () => {
    try {
      await userNotificationApi.markAllReadNotification();
      fetchNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await userNotificationApi.deleteNotification(id);
      fetchNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserAction = async (actionData) => {
    try {
      await userNotificationApi.markNotification(actionData);
      fetchNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAction = (data) => {
    if (data.action === "dismiss") handleDelete(data.notificationID);
    else handleUserAction(data);
  };

  const footer = useMemo(
    () => ({
      addButtonText: "Mark All Read",
      onAdd: handleMarkAllRead,
      cancelButtonText: "Cancel",
      onCancel: closePopup,
      size: "fit-content",
    }),
    []
  );

  return (
    <>
      <div className="header">
        <span className="header_icon">Notification Management</span>

        <div className="header_menus">
          {navigations.map((item) => (
            <div
              key={item.key}
              className="header_menu"
              style={{
                color: selectedMenu === item.key ? "#B21C64" : "#737791",
              }}
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              <span className="header_menu_label">{item.label}</span>
            </div>
          ))}
        </div>

        <div className="header_right">
          <div
            className="header_right_icon_wrapper notification_indicator-wrapper"
            onClick={() => setIsPopupOpen(true)}
          >
            <Bell size={14} />
            {notifications.length > 0 && (
              <div className="notification_indicator">
                {notifications.length}
              </div>
            )}
          </div>

          <LineVertical size={16} color="#737791" />

          <div className="header_right_user">
            <div className="header_right_icon_wrapper">
              <User size={14} />
            </div>
            <span className="header_right_user_name">John Doe</span>
          </div>
        </div>
      </div>

      <Popup
        title="Notifications"
        footer={footer}
        isOpen={isPopupOpen}
        onClose={closePopup}
      >
        <div className="user_notifications_container">
          {loading ? (
            <Loader />
          ) : notifications.length > 0 ? (
            notifications.map((notif) => (
              <NotificationCard
                key={notif.notificationID}
                data={notif}
                user={true}
                handleAction={handleAction}
              />
            ))
          ) : (
            <p className="no_notifications">No notifications found.</p>
          )}
        </div>
      </Popup>
    </>
  );
};

export default Header;
