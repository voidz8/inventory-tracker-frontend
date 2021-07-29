import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import IconInputfield from "./IconInputfield";
import priceicon from "../assets/dollar.png";
import { sneakerContext } from "../contexts/SneakerContext";
import "./SaleForm.css";
import axios from "axios";

function SaleForm() {
  const { handleSubmit, register } = useForm();
  const { setSaleMenuOpen, sneaker, setSneaker, setSneakerError } =
    useContext(sneakerContext);

  async function onFormSubmit(data) {
    setSneakerError("");
    try {
      await axios.post(
        `http://localhost:8080/sneakers/sell/${sneaker.sneakerId}`,
        {
          priceSold: data.salePrice,
        }
      );
    } catch (e) {
      setSneakerError("Error while setting sneaker on sold. " + e);
    }
    setSneaker({
      sneakerId: null,
      sneakerName: "",
      size: null,
      priceBought: null,
      pid: null,
    });
  }

  return (
    <div className={"sale-container"}>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <header className={"form-header"}>Sneaker Sold</header>
        <div className={"s-form"}>
          <h3 className={"s-h"}>For how much dit you sold your</h3>
          <h3>{sneaker.sneakerName}?</h3>
          <IconInputfield
            type={"text"}
            id={"s-p"}
            name={"salePrice"}
            icon={priceicon}
            placeholder={"SALE PRICE"}
            {...register("salePrice")}
          />
        </div>
        <div className={"form-btn"}>
          <button className={"green-button"} type={"submit"}>
            Submit
          </button>
          <button
            id={"s-c"}
            className={"red-button"}
            type={"button"}
            onClick={() => setSaleMenuOpen(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default SaleForm;
