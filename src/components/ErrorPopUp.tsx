import React from "react";
import "../styles/ErrorPopUp.css";

interface ErrorPopupProps {
  message: string;
  type?: "error" | "warning" | "success"; // Optional, defaults to 'error'
  visible: boolean;
  onClose: () => void; // Callback to close the popup
}

const ErrorPopup: React.FC<ErrorPopupProps> = ({
  message,
  type = "error",
  visible,
  onClose,
}) => {
  if (!visible) return null;

  const getBackgroundColor = () => {
    switch (type) {
      case "warning":
        return "#f7b731"; // Yellow
      case "success":
        return "#4caf50"; // Green
      case "error":
      default:
        return "#e74c3c"; // Red
    }
  };

  const popupStyle: React.CSSProperties = {
    padding: "10px 20px",
    color: "white",
    backgroundColor: getBackgroundColor(),
    borderRadius: "5px",
    position: "fixed",
    top: "10%",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 1000,
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
  };

  return (
    <div style={popupStyle}>
      <p>{message}</p>
      <button
        onClick={onClose}
        style={{
          background: "none",
          border: "none",
          color: "white",
          cursor: "pointer",
        }}
      >
        Close
      </button>
    </div>
  );
};

export default ErrorPopup;
