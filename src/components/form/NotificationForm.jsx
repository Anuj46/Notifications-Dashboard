import React, { useState } from "react";
import "./notificationForm.css";

const NotificationForm = ({ formData, handleChange }) => {
  return (
    <div className="form-wrapper">
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
};

export default NotificationForm;
