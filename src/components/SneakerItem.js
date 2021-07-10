import React, { useContext, useState } from "react";
import "./SneakerItem.css";
import soldIcon from "../assets/sold.png";
import axios from "axios";
import { authContext } from "../contexts/AuthContext";

function SneakerItem({ name, image, size, price, date }) {
  const { url } = useContext(authContext);

  // todo
  async function markAsSold() {
    const response = await axios.post(url + "");
    image = soldIcon;
  }

  return (
    <div className={"sneaker-container"}>
      <header className={"sneaker-header"}>{name}</header>
      <div className={"fields"}>
        <img src={image} alt="image" />
        <div className={"item-fields"}>
          <h3>Size: {size}</h3>
          <h3>Price: {price}</h3>
          <h3>Date: {date}</h3>
          <h3>Invoice</h3>
        </div>
      </div>
      <button type={"button"} className={"sold-button"}>
        Sold
      </button>
    </div>
  );
}

export default SneakerItem;
