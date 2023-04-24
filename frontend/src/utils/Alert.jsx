import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const Alert = ({ message, clear, type }) => {
  const dispatch = useDispatch();
  // State to store the alert message
  const [alertMessage, setAlertMessage] = useState(message);

  // Effect to clear alert message after 5 seconds
  useEffect(() => {
    let timeout;
    if (alertMessage) {
      // Set a timeout to clear the alert message and call clear function
      timeout = setTimeout(() => {
        setAlertMessage("");
        // Clear alert is clear parametar is defined
        if (clear) {
          dispatch(clear());
        }
      }, 5000);
    }
  }, [alertMessage, clear, dispatch]);

  // If there is an alert message, display an alert
  return alertMessage ? (
    <h3 className={`alert show alert-${type}`} role="alert">
      {alertMessage}
    </h3>
  ) : null;
};

export default Alert;
