import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./TopMenu.css";
import DropDown from "./DropDown";
import DropDownItem from "./DropDownItem";
import { authContext } from "../contexts/AuthContext";

function TopMenu() {
  const history = useHistory();
  const { authenticated } = useContext(authContext);

  return (
    <div className={"top-menu"}>
      <h1>Inventory Tracker</h1>
      <nav className={"nav-container"}>
        <NavLink to="/" exact className={"home"}>
          HOME
        </NavLink>
        <DropDown name={"SNEAKERS"} disabled={!authenticated}>
          <DropDownItem to={"/sneakers"} name={"Sneaker-Inventory"} />
          <DropDownItem to={"/sold-sneakers"} name={"Sneaker-Sales"} />
        </DropDown>
        <DropDown name={"ITEMS"} disabled={!authenticated}>
          <DropDownItem to={"/items"} name={"Item-Inventory"} />
          <DropDownItem to={"/sold-items"} name={"Item-Sales"} />
        </DropDown>
        <DropDown name={"BOTS"} disabled={!authenticated}>
          <DropDownItem to={"/bots"} name={"Bot-Inventory"} />
          <DropDownItem to={"/sold-bots"} name={"Bot Sales"} />
        </DropDown>
      </nav>
      <div className={"my-acc"}>
        {!authenticated && (
          <button
            onClick={() => history.push("/login")}
            type={"button"}
            className={"signin"}
          >
            Sign in
          </button>
        )}
        {authenticated && (
          <DropDown to={""} name={"My Account"}>
            <DropDownItem to={"/settings"} name={"Settings"} />
            <DropDownItem to={"/logout"} name={"Sign Out"} />
          </DropDown>
        )}
      </div>
    </div>
  );
}

export default TopMenu;
