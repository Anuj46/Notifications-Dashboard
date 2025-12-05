import React from "react";
import { PencilLine, Trash } from "@phosphor-icons/react";
import "./notificationCard.css";

const NotificationCard = ({ data, handleAction, user = false }) => {
  return (
    <div className="notification-card">
      {!data.sent && !user && (
        <div className="notification-actions">
          <input
            type="checkbox"
            className="notification-checkbox"
            onChange={(e) => {
              handleAction({
                action: "select",
                id: data.notificationID,
                checked: e.target.checked,
              });
            }}
          />
          <div className="notification-actions-right">
            <button
              className="notification-action-btn"
              onClick={() => {
                handleAction({
                  action: "edit",
                  id: data.notificationID,
                });
              }}
            >
              <PencilLine size={14} color="#0277CA" />
            </button>
            <button
              className="notification-action-btn"
              onClick={() => {
                handleAction({
                  action: "delete",
                  id: data.notificationID,
                });
              }}
            >
              <Trash size={14} color="#F5000E" />
            </button>
          </div>
        </div>
      )}
      {!user && (
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
              <div className="notification-plus">
                +{data.channels.length - 3}
              </div>
            )}
          </div>
        </div>
      )}

      <p className="notification-title">{data.title}</p>
      <p className="notification-description">{data.description}</p>
      {!user && (
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
      )}
      {user && (
        <div className="notification-actions">
          <div className="notification-actions-btns">
            {data?.actionItems?.map((item) => (
              <button
                className={`notification-actions-btn ${
                  item.status && "notification-actions-btn-active"
                }`}
                key={item.id}
                onClick={() => {
                  handleAction({
                    notificationID: data.notificationID,
                    action: item.id,
                    status: !item.status,
                  });
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
          <span className="notification-time">{data.sentTime}</span>
        </div>
      )}
    </div>
  );
};

export default NotificationCard;
