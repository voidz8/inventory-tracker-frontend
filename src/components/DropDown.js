import React, { useState } from "react";
import "./DropDown.css";

function DropDown(props) {
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(!open);

  return (
    <div className={"menu-container"}>
      <button className={"menu-btn"} onClick={handleClick}>
        {props.name}
      </button>
      <div className={"dropdown"}>
        {open && <ul className={"menu-list"}>{props.children}</ul>}
      </div>
    </div>
  );
}

export default DropDown;
