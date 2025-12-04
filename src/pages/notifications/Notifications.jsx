import React, { useState } from "react";
import "./notification.css";
import Popup from "../../components/popup/Popup";

const Notifications = () => {
  // ////////////////////
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    channel: "",
    frequency: "",
    validTill: "",
    markAsRead: false,
    dismiss: false,
  });

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    setIsPopupOpen(false);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const footer = {
    addButtonText: "Add",
    onAdd: handleSubmit,
    cancelButtonText: "Cancel",
    onCancel: () => setIsPopupOpen(false),
  };

  const content = (
    <div className="form-container">
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Add Icon/Visual</label>
          <button className="upload-btn">Upload</button>
        </div>

        <div className="form-group">
          <label className="form-label">Channel</label>
          <select
            className="form-select"
            value={formData.channel}
            onChange={(e) => handleChange("channel", e.target.value)}
          >
            <option value="">Select</option>
            <option value="email">Email</option>
            <option value="sms">SMS</option>
            <option value="push">Push</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Valid Till</label>
          <div className="input-icon-wrapper">
            <input
              type="date"
              className="form-input with-icon"
              value={formData.validTill}
              onChange={(e) => handleChange("validTill", e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Frequency</label>
          <select
            className="form-select"
            value={formData.frequency}
            onChange={(e) => handleChange("frequency", e.target.value)}
          >
            <option value="">Select</option>
            <option value="once">Once</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Title</label>
        <input
          type="text"
          placeholder="Write title"
          className="form-input"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          placeholder="Write here..."
          rows={4}
          className="form-textarea"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Actions</label>
        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={formData.markAsRead}
              onChange={(e) => handleChange("markAsRead", e.target.checked)}
            />
            <span>Mark as read</span>
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={formData.dismiss}
              onChange={(e) => handleChange("dismiss", e.target.checked)}
            />
            <span>Dismiss</span>
          </label>
        </div>
      </div>
    </div>
  );

  // //////////////'
  return (
    <div>
      <div>
        <button
          onClick={() => setIsPopupOpen(true)}
          className="btn btn-primary"
        >
          Open Popup with Header & Footer
        </button>
        <Popup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          title="Add Notification"
          footer={footer}
        >
          {content}
        </Popup>
      </div>
      
    </div>
  );
};

export default Notifications;
