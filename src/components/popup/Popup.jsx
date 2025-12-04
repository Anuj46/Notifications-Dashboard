import React, { useState } from "react";
import { X } from "@phosphor-icons/react";
import "./popup.css";

const Popup = ({ isOpen, onClose, title, footer, children }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        {title && (
          <div className="popup-header">
            <h2 className="popup-title">{title}</h2>
            {onClose && (
              <button onClick={onClose} className="close-btn">
                <X size={20} />
              </button>
            )}
          </div>
        )}

        <div className="popup-content">{children}</div>

        {footer && (
          <div className="popup-footer">
            <button onClick={footer.onCancel} className="btn btn-secondary">
              {footer.cancelButtonText || "Cancel"}
            </button>
            <button onClick={footer.onAdd} className="btn btn-primary">
              {footer.addButtonText || "Add"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Popup;
