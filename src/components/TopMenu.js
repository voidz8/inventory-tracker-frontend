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
        <DropDown name={"SNEAKERS"}>
          <DropDownItem to={"/sneakers"} name={"Sneaker-Inventory"} />
          <DropDownItem to={"/sold-sneakers"} name={"Sneaker-Sales"} />
        </DropDown>
        <DropDown name={"ITEMS"}>
          <DropDownItem to={"/items"} name={"Item-Inventory"} />
          <DropDownItem to={"/sold-items"} name={"Item-Sales"} />
        </DropDown>
        <DropDown name={"PROXIES"}>
          <DropDownItem to={""} name={"Datacenter-Proxies"} />
          <DropDownItem to={""} name={"Residential-Proxies"} />
        </DropDown>
        <DropDown name={"BOTS"}>
          <DropDownItem to={""} name={"Bot-Inventory"} />
          <DropDownItem to={""} name={"Bot Sales"} />
        </DropDown>
      </nav>
      {!authenticated && (
        <button
          onClick={() => history.push("/login")}
          type={"button"}
          className={"signin"}
        >
          Sign in
        </button>
      )}
      <div className={"my-acc"}>
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
