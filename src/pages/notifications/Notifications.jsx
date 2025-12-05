import React, { useEffect, useState } from "react";
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
import delete_img from "../../assets/delete_img.png";
import { notificationApi, dashboardAPI } from "../../server";
import Loader from "../../components/loader/Loader";

const Notifications = () => {
  const [undeliveredNotification, setUndeliveredNotifications] = useState([]);
  const [deliveredNotifications, setDeliveredNotifications] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [filterPopup, setFilterPopup] = useState(false);
  const [loading, setLoading] = useState(true);

  const defaultFilters = {
    sortBy: "desc",
    channels: [],
    actions: [],
  };

  const [filters, setFilters] = useState(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState(defaultFilters);

  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    channel: [],
    like: false,
    dismiss: false,
  });

  const [actions, setActions] = useState([]);
  const [channels, setChannels] = useState([]);

  const fetchActions = async () => {
    try {
      const res = await dashboardAPI.getActions();
      setActions(res.data.actions);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchChannels = async () => {
    try {
      const res = await dashboardAPI.getChannels();
      setChannels(res.data.channels);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchNotifications = async (
    filterObj = defaultFilters,
    search = ""
  ) => {
    setLoading(true);
    try {
      const res = await notificationApi.getNotifications({
        ...filterObj,
        searchQuery: search,
      });

      setDeliveredNotifications(res.data.sentNotifications);
      setUndeliveredNotifications(res.data.unsentNotifications);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActions();
    fetchChannels();
    fetchNotifications(defaultFilters);
  }, []);

  const handleSearch = () => {
    fetchNotifications(appliedFilters, searchQuery);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

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
      channel: [],
      like: false,
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
    if (data.action === "delete") {
      setDeletePopup(true);
    }
  };

  const handleSortBy = (value) => {
    setFilters((prev) => ({ ...prev, sortBy: value }));
  };

  const toggleChannel = (id) => {
    setFilters((prev) => ({
      ...prev,
      channels: prev.channels.includes(id)
        ? prev.channels.filter((c) => c !== id)
        : [...prev.channels, id],
    }));
  };

  const toggleAction = (id) => {
    setFilters((prev) => ({
      ...prev,
      actions: prev.actions.includes(id)
        ? prev.actions.filter((a) => a !== id)
        : [...prev.actions, id],
    }));
  };

  const handleApplyFilter = () => {
    setAppliedFilters(filters);
    fetchNotifications(filters);
    setFilterPopup(false);
  };

  const handleCancelFilter = () => {
    setFilters(appliedFilters);
    setFilterPopup(false);
  };

  const filterFooter = {
    addButtonText: "Apply",
    onAdd: handleApplyFilter,
    cancelButtonText: "Cancel",
    onCancel: handleCancelFilter,
  };

  const handleDeleteNotification = () => {
    setDeletePopup(false);
  };

  const handleCancelDelete = () => {
    setDeletePopup(false);
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                className="notification_search_button"
                onClick={handleSearch}
              >
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
              className="notification_actions_btn notification_actions_btn_primary"
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
              {loading ? (
                <Loader />
              ) : (
                undeliveredNotification.map((notification) => (
                  <NotificationCard
                    key={notification.notificationID}
                    data={notification}
                    handleAction={handleAction}
                  />
                ))
              )}
            </div>
          </div>

          <div className="notification-content-section notification-delivered-section">
            <div className="notification-content-header">
              <span className="notification-content-heading">
                Delivered Notifications
              </span>
            </div>

            {loading ? (
              <Loader />
            ) : (
              <div className="notification-delivered-cards">
                {deliveredNotifications.map((notification) => (
                  <NotificationCard
                    key={notification.notificationID}
                    data={notification}
                    handleAction={handleAction}
                  />
                ))}
              </div>
            )}
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
        <div className="delete_content_wrapper">
          <div className="delete_content">
            <img src={delete_img} alt="delete-img" />
            <span className="delete_heading">Delete Notification</span>
            <span className="delete_label">
              Your file has been processed, and the summary has been sent to
              your registered email ID.
            </span>
            <div className="delete_action_btns">
              <button
                className="notification_actions_btn notification_actions_btn_secondary"
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
              <button className="notification_actions_btn notification_actions_btn_primary">
                Delete
              </button>
            </div>
          </div>
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
            <span className="filters_heading">Sort By</span>
            <div className="filters_items">
              <div
                className="filter_sort_field"
                onClick={() => handleSortBy("desc")}
              >
                <input
                  type="radio"
                  name="sort"
                  checked={filters.sortBy === "desc"}
                  onChange={() => handleSortBy("desc")}
                />
                <span>Most Recent</span>
              </div>

              <div
                className="filter_sort_field"
                onClick={() => handleSortBy("asc")}
              >
                <input
                  type="radio"
                  name="sort"
                  checked={filters.sortBy === "asc"}
                  onChange={() => handleSortBy("asc")}
                />
                <span>Oldest First</span>
              </div>
            </div>
          </div>

          <div className="filters_section">
            <span className="filters_heading">Channels</span>
            <div className="filters_items">
              {channels.map((item) => (
                <div
                  key={item.id}
                  className={`filters_item ${
                    filters.channels.includes(item.id)
                      ? "filters_item-active"
                      : ""
                  }`}
                  onClick={() => toggleChannel(item.id)}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          <div className="filters_section">
            <span className="filters_heading">Actions</span>
            <div className="filters_items">
              {actions.map((item) => (
                <div
                  key={item.id}
                  className={`filters_item ${
                    filters.actions.includes(item.id)
                      ? "filters_item-active"
                      : ""
                  }`}
                  onClick={() => toggleAction(item.id)}
                >
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
