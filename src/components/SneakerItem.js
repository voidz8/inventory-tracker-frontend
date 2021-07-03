import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SneakerItem.css";

function SneakerItem() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(undefined);
  const [size, setSize] = useState(null);
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState(undefined);
  const [invoice, setInvoice] = useState(undefined);

  useEffect(() => {
    async function getSneakerData() {
      try {
        const response = await axios.get("http://localhost:8080/sneakers/all");
        console.log(response);
      } catch (e) {
        console.error(e);
      }
    }
    getSneakerData();
  }, []);

  return (
    <div className={"container"}>
      <header>{name}</header>
      <div className={"fields"}>
        <img src={image} alt="image" />
        <div className={"item-fields"}>
          <h3>Size: {size}</h3>
          <h3>Price: {price}</h3>
          <h3>Date: {date}</h3>
          <h3>Invoice</h3>
        </div>
      </div>
    </div>
  );
}
export default SneakerItem;
