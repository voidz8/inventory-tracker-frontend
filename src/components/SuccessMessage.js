import React from "react";
import "./SuccessMessage.css";

function SuccessMessage({ message }) {
  return <p className={"success"}>{message}</p>;
}

export default SuccessMessage;
