import React, { useState } from "react";
import "./notification.css";
import Popup from "../../components/popup/Popup";
import {
  MagnifyingGlass,
  Faders,
  Plus,
  PaperPlaneRight,
} from "@phosphor-icons/react";
import NotificationCard from "../../components/cards/NotificationCard";
import NotificationForm from "../../components/form/NotificationForm";
import { items } from "../../../mmmmm";

const channels = [
  {
    label: "SMS",
    id: "sms",
  },
  {
    label: "E-mail",
    id: "email",
  },
  {
    label: "WhatsApp",
    id: "whatsapp",
  },
  {
    label: "In-App",
    id: "in-app",
  },
  {
    label: "Teams",
    id: "teams",
  },
  {
    label: "Slack",
    id: "slack",
  },
];

const actions = [
  {
    label: "Mark as read",
    id: "read",
  },
  {
    label: "Like",
    id: "like",
  },
  {
    label: "Dismiss",
    id: "dismiss",
  },
];

const Notifications = () => {
  const [undeliveredNotification, setUndeliveredNotifications] =
    useState(items);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [filterPopup, setFilterPopup] = useState(false);
  const [filters, setFilters] = useState({
    channels: [],
    actions: [],
  });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    channel: "",
    frequency: "",
    validTill: "",
    markAsRead: false,
    dismiss: false,
  });

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    handleCancel();
  };

  const handleCancel = () => {
    setIsPopupOpen(false);
    setFormData({
      title: "",
      description: "",
      channel: "",
      frequency: "",
      validTill: "",
      markAsRead: false,
      dismiss: false,
    });
  };

  const footer = {
    addButtonText: "Add",
    onAdd: handleSubmit,
    cancelButtonText: "Cancel",
    onCancel: handleCancel,
  };

  const handleAction = (data) => {
    console.log(data);
  };
  // filters
  const handleApplyFilter = () => {};

  const handleCancelFilter = () => {
    setFilterPopup(false);
  };

  const filterFooter = {
    addButtonText: "Apply",
    onAdd: handleApplyFilter,
    cancelButtonText: "Cancel",
    onCancel: handleCancelFilter,
  };

  // delete
  const handleDeleteNotification = () => {};

  const handleCancelDelete = () => {
    setDeletePopup(true);
  };

  return (
    <>
      <div className="notification_wrapper">
        <div className="notification_header">
          <span className="notification_heading">Notifications</span>
          <div className="notification_actions">
            <div className="notification_search">
              <input
                type="text"
                placeholder="Search by Title"
                className="notification_search_field"
              />
              <button className="notification_search_button">
                <MagnifyingGlass size={14} />
              </button>
            </div>
            <button
              className="notification_actions_btn notification_actions_filter_btn"
              onClick={() => setFilterPopup(true)}
            >
              <Faders size={14} />
              Filter
            </button>
            <button
              className="notification_actions_btn notification_actions_add_btn"
              onClick={() => setIsPopupOpen(true)}
            >
              <Plus size={14} color="#ffff" /> Add
            </button>
          </div>
        </div>
        <div className="notification-content">
          <div className="notification-content-section">
            <div className="notification-content-header">
              <span className="notification-content-heading">
                Undelivered Notifications
              </span>
              <button className="notification_actions_btn notification-sent">
                Send <PaperPlaneRight size={12} />
              </button>
            </div>
            <div className="notification-undelivered-cards">
              {undeliveredNotification.map((notification) => (
                <React.Fragment key={notification.notificationID}>
                  <NotificationCard
                    data={notification}
                    handleAction={handleAction}
                  />
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="notification-content-section notification-delivered-section">
            <div className="notification-content-header">
              <span className="notification-content-heading">
                Delivered Notifications
              </span>
            </div>
            <div className="notification-delivered-cards">
              {undeliveredNotification.map((notification) => (
                <React.Fragment key={notification.notificationID}>
                  <NotificationCard
                    data={notification}
                    handleAction={handleAction}
                  />
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Popup
        isOpen={isPopupOpen}
        onClose={handleCancel}
        title="Add Notification"
        footer={footer}
      >
        <NotificationForm formData={formData} handleChange={handleFormChange} />
      </Popup>
      <Popup
        isOpen={deletePopup}
        onClose={handleCancelDelete}
        title="Delete Notification"
      >
        <div>
          <img src="" alt="" />
          <span>Delete Notification</span>
          <span>
            Your file has been processed, and the summary has been sent to your
            registered email ID.
          </span>
          <button>Cancel</button>
          <button>Delete</button>
        </div>
      </Popup>
      <Popup
        title="Add Filters"
        isOpen={filterPopup}
        onClose={handleCancelFilter}
        footer={filterFooter}
      >
        <div className="filters_wrapper">
          <div className="filters_section">
            <span className="filters_heading">Channels</span>
            <div className="filters_items">
              {channels.map((item) => (
                <div className="filters_item" key={item.id}>
                  {item.label}
                </div>
              ))}
            </div>
          </div>
          <div className="filters_section">
            <span className="filters_heading">Actions</span>
            <div className="filters_items">
              {actions.map((item) => (
                <div className="filters_item filters_item-active" key={item.id}>
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Popup>
    </>
  );
};

export default Notifications;
