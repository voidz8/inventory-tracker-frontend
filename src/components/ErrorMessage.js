import React from "react";
import "./ErrorMessage.css";

function ErrorMessage({ message }) {
  return <p className={"error"}>{message}</p>;
}

export default ErrorMessage;
