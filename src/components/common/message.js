import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AlertMessage = ({ message, duration }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, duration * 1000);
  }, [duration]);

  return (
    <div
      className={isVisible ? "alert alert-info" : "hidden"}
      role="alert"
    >
      {message}
    </div>
  );
};

export default AlertMessage;