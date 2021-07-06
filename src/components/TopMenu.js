import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./TopMenu.css";

function TopMenu() {
  const history = useHistory();

  return (
    <div className={"top-menu"}>
      <h1>Inventory Tracker</h1>
      <nav className={"nav-container"}>
        <NavLink to="/" exact className={"nav-item"}>
          HOME
        </NavLink>
        <NavLink to="/sneakers" className={"nav-item"}>
          SNEAKERS
        </NavLink>
        <NavLink to="/items" className={"nav-item"}>
          ITEMS
        </NavLink>
        <NavLink to="/proxies" className={"nav-item"}>
          PROXIES
        </NavLink>
        <NavLink to="/bots" className={"nav-item"}>
          BOTS
        </NavLink>
      </nav>
      <button
        onClick={() => history.push("/login")}
        type={"button"}
        className={"signin"}
      >
        Sign in
      </button>
    </div>
  );
}

export default TopMenu;
