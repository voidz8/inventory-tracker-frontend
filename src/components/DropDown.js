import React, { useEffect, useRef, useState } from "react";
import "./DropDown.css";
import { set } from "react-hook-form";

function DropDown(props) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (open && ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [open]);

  const handleClick = () => setOpen(!open);

  return (
    <div className={"menu-container"}>
      <button
        ref={ref}
        className={open ? "menu-btn-open" : "menu-btn"}
        onClick={handleClick}
      >
        {props.name}
      </button>
      <div className={"dropdown"}>
        {open && <ul className={"menu-list"}>{props.children}</ul>}
      </div>
    </div>
  );
}

export default DropDown;
