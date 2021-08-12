import React from "react";
import { NavLink } from "react-router-dom";

function DropDownItem({ name, ...props }) {
  return (
    <li key={name}>
      <NavLink className={"nav-item"} {...props}>
        {name}
      </NavLink>
    </li>
  );
}

export default DropDownItem;
