import React, { useState } from "react";
import "./notificationForm.css";
import { CaretDown } from "@phosphor-icons/react";

const NotificationForm = ({ formData, handleChange, handleAction }) => {
  const [open, setOpen] = useState(false);

  const channels = [
    { label: "Email", value: "email" },
    { label: "SMS", value: "sms" },
    { label: "Push", value: "push" },
  ];

  const toggleValue = (value) => {
    const updated = formData.channel.includes(value)
      ? formData.channel.filter((v) => v !== value)
      : [...formData.channel, value];

    handleChange("channel", updated);
  };
  return (
    <div className="form-wrapper">
      <div className="form-group form-select">
        <label className="form-label">Channel</label>

        <div
          className={`multi-select ${open && "multi-select-active"}`}
          onClick={() => setOpen(!open)}
        >
          {formData.channel.length > 0
            ? formData.channel
                .map((val) => channels.find((c) => c.value === val)?.label)
                .join(", ")
            : "Select"}
          <div className={open && "multi-select-icon"}>
            <CaretDown size={14} />
          </div>
        </div>

        {open && (
          <div className="dropdown">
            {channels.map((ch) => (
              <label className="dropdown-option" key={ch.value}>
                <input
                  type="checkbox"
                  checked={formData.channel.includes(ch.value)}
                  onChange={() => toggleValue(ch.value)}
                />
                {ch.label}
              </label>
            ))}
          </div>
        )}
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
              checked={formData.like}
              onChange={(e) => handleChange("like", e.target.checked)}
            />
            <span>Like</span>
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
