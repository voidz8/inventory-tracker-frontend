import React from "react";
import "./IconInputfield.css";

function IconInputfield({
  placeholder,
  icon,
  maxlength,
  name,
  type,
  ...props
}) {
  return (
    <div className={"input-field"}>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={"input"}
        maxLength={maxlength}
        {...props}
      />
      <img src={icon} alt={"icon"} className={"input-image"} />
    </div>
  );
}

export default IconInputfield;
