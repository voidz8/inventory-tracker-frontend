import React, { useContext, useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./TopMenu.css";
import DropDown from "./DropDown";
import DropDownItem from "./DropDownItem";
import { authContext } from "../contexts/AuthContext";

function TopMenu() {
  const history = useHistory();
  const [showSignIn, setShowSignIn] = useState(true);
  const { authState, logout } = useContext(authContext);

  useEffect(() => {
    if (authState.user == null) {
      setShowSignIn(false);
    }
  }, []);

  return (
    <div className={"top-menu"}>
      <h1>Inventory Tracker</h1>
      <nav className={"nav-container"}>
        <NavLink to="/" exact className={"nav-item"}>
          HOME
        </NavLink>
        <DropDown name={"SNEAKERS"} className={"nav-item"}>
          <DropDownItem to={"/sneakers"} name={"Sneaker Inventory"} />
          <DropDownItem to={"/sold-sneakers"} name={"Sneaker Sales"} />
        </DropDown>
        <DropDown name={"ITEMS"}>
          <DropDownItem to={"/items"} name={"Item Inventory"} />
          <DropDownItem to={"/sold-items"} name={"Item Sales"} />
        </DropDown>
        <DropDown name={"PROXIES"}>
          <DropDownItem to={""} name={"Datacenter Proxies"} />
          <DropDownItem to={""} name={"Residential Proxies"} />
        </DropDown>
        <DropDown name={"BOTS"}>
          <DropDownItem to={""} name={"Bot Inventory"} />
          <DropDownItem to={""} name={"Bot Sales"} />
        </DropDown>
      </nav>
      {!showSignIn && (
        <button
          onClick={() => history.push("/login")}
          type={"button"}
          className={"signin"}
        >
          Sign in
        </button>
      )}
      {showSignIn && (
        <button onClick={logout} type={"button"} className={"signout"}>
          Sign out
        </button>
      )}
    </div>
  );
}

export default TopMenu;
