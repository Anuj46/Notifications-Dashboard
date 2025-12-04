import React from "react";
import { PencilLine, Trash } from "@phosphor-icons/react";
import "./notificationCard.css";

const NotificationCard = ({ data }) => {
  return (
    <div className="notification-card">
      {!data.sent && (
        <div className="notification-actions">
          <input type="checkbox" className="notification-checkbox" />
          <div className="notification-actions-right">
            <button className="notification-action-btn">
              <PencilLine size={14} color="#0277CA" />
            </button>
            <button className="notification-action-btn">
              <Trash size={14} color="#F5000E" />
            </button>
          </div>
        </div>
      )}
      <div className="notification-metadata">
        Channels:
        <div className="notification-metadata">
          {data.channels.slice(0, 3).map((item, index) => (
            <div
              style={{
                padding: index === 2 && "0",
                borderRight: index === 2 && "none",
              }}
              className="notification-metadata-items"
              key={item.id}
            >
              {item.label}
            </div>
          ))}
          {data.channels.length > 3 && (
            <div className="notification-plus">+{data.channels.length - 3}</div>
          )}
        </div>
      </div>
      <p className="notification-title">{data.title}</p>
      <p className="notification-description">{data.description}</p>
      <div className="notification-metadata">
        Actions:
        <div className="notification-metadata">
          {data.actions.map((item, index) => (
            <div
              key={item.id}
              className="notification-metadata-items"
              style={{
                padding: index === data.actions.length - 1 && "0",
                borderRight: index === data.actions.length - 1 && "none",
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
