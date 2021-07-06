import React from "react";
import "./IconInputfield.css";

function IconInputfield({ placeholder, icon, maxlength }) {
  return (
    <div className={"input-field"}>
      <input
        type={"text"}
        placeholder={placeholder}
        className={"input"}
        maxLength={maxlength}
      />
      <img src={icon} alt={"icon"} className={"input-image"} />
    </div>
  );
}

export default IconInputfield;
