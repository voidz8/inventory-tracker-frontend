import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import IconInputfield from "./IconInputfield";
import priceicon from "../assets/dollar.png";
import { sneakerContext } from "../contexts/SneakerContext";
import "./SaleForm.css";
import axios from "axios";
import { itemContext } from "../contexts/ItemContext";
import { botContext } from "../contexts/BotContext";

function SaleForm({ variety }) {
  const { handleSubmit, register } = useForm();
  const { setSaleMenuOpen, sneaker, setSneaker, setSneakerError } =
    useContext(sneakerContext);
  const { setItem, setItemError, item } = useContext(itemContext);
  const { setBot, setBotError, bot } = useContext(botContext);

  async function onFormSubmit(data) {
    if (variety === "sneaker") {
      setSneakerError("");
      try {
        await axios.post(
          `http://localhost:8080/sneakers/sell/${sneaker.sneakerId}`,
          {
            priceSold: data.price,
          }
        );
      } catch (e) {
        setSneakerError("Error while setting sneaker to sold. " + e);
      }
      setSneaker({
        sneakerId: null,
        sneakerName: "",
        size: null,
        priceBought: null,
        pid: null,
      });
    }
    if (variety === "item") {
      setItemError("");
      try {
        console.log(data.price);
        await axios.post(`http://localhost:8080/items/sell/${item.itemId}`, {
          priceSold: data.price,
        });
      } catch (e) {
        setItemError("Error while setting item to sold. " + e);
      }
      setItem({ itemId: null, itemName: "", size: null, priceBought: null });
    }
    if (variety === "bot") {
      setBotError("");
      try {
        await axios.post(`http://localhost:8080/bots/sell/${bot.botId}`, {
          priceSold: data.price,
        });
      } catch (e) {
        setBotError("Error while setting bot to sold. " + e.response.data);
      }
      setBot({ botId: null, botName: "", priceBought: null });
    }
  }

  return (
    <div className={"sale-container"}>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        {variety === "sneaker" && (
          <header className={"form-header"}>Sneaker Sold</header>
        )}
        {variety === "item" && (
          <header className={"form-header"}>Item Sold</header>
        )}
        {variety === "bot" && (
          <header className={"form-header"}>Bot Sold</header>
        )}
        <div className={"s-form"}>
          {variety === "sneaker" && (
            <div>
              <h3 className={"s-h"}>For how much dit you sold your</h3>
              <h3>{sneaker.sneakerName}?</h3>
            </div>
          )}
          {variety === "item" && (
            <div>
              <h3 className={"s-h"}>For how much dit you sold your</h3>
              <h3>{item.itemName}?</h3>
            </div>
          )}
          {variety === "bot" && (
            <div>
              <h3 className={"s-h"}>For how much dit you sold your</h3>
              <h3>{bot.botName}?</h3>
            </div>
          )}
          <IconInputfield
            type={"number"}
            id={"s-p"}
            icon={priceicon}
            placeholder={"SALE PRICE"}
            required={"required"}
            {...register("price")}
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
