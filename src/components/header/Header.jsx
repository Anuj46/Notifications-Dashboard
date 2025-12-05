import React, { useEffect, useState } from "react";
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
  const [menus, setMenus] = useState(navigations);
  const [seletedMenu, setSelectedMenu] = useState();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.split("/")[1]) {
      setSelectedMenu("notification");
    } else {
      setSelectedMenu("dashboard");
    }
  }, [location.pathname]);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await userNotificationApi.getNotification();

      setNotifications(res.data.notifications);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleCancel = () => {
    setIsPopupOpen(false);
  };

  const markAllRead = async () => {
    try {
      await userNotificationApi.markAllReadNotification();
      fetchNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await userNotificationApi.deleteNotification(id);
      fetchNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  const handleOtherActions = async (action) => {
    try {
      await userNotificationApi.markNotification(action);
      fetchNotifications();
    } catch (error) {
      console.error(error);
    }
  };

  const handleMarkAllRead = () => {
    markAllRead();
  };

  const footer = {
    addButtonText: "Mark All Read",
    onAdd: handleMarkAllRead,
    cancelButtonText: "Cancel",
    onCancel: handleCancel,
    size: "fit-content",
  };

  const handleAction = (data) => {
    if (data.action === "dismiss") {
      deleteNotification(data.notificationID);
    } else {
      handleOtherActions(data);
    }
  };

  return (
    <>
      <div className="header">
        <span className="header_icon">Notification Management</span>
        <div className="header_menus">
          {menus.map((item) => (
            <div
              className="header_menu"
              key={item.path}
              style={{
                color: seletedMenu === item.key ? "#B21C64" : "#737791",
              }}
              onClick={() => navigate(item.path)}
            >
              {item.icon}{" "}
              <span className="header_menu_label">{item.label}</span>
            </div>
          ))}
        </div>
        <div className="header_right">
          <div
            className="header_right_icon_wrapper"
            onClick={() => setIsPopupOpen(true)}
          >
            <Bell size={14} />
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
        onClose={handleCancel}
      >
        <div className="user_notifications_container">
          {loading ? (
            <Loader />
          ) : (
            notifications.length > 0 &&
            notifications.map((item) => (
              <NotificationCard
                data={item}
                user={true}
                handleAction={handleAction}
              />
            ))
          )}
        </div>
      </Popup>
    </>
  );
};

export default Header;
