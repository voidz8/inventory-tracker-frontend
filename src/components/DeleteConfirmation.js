import React, { useContext, useEffect } from "react";
import "./DeleteConfirmation.css";
import { sneakerContext } from "../contexts/SneakerContext";
import axios from "axios";
import { itemContext } from "../contexts/ItemContext";
import { botContext } from "../contexts/BotContext";

function DeleteConfirmation({ variety }) {
  const { setDeleteConf, sneaker, setSneaker, setSneakerError } =
    useContext(sneakerContext);
  const { item, setItem, setItemError } = useContext(itemContext);
  const { bot, setBot, setBotError } = useContext(botContext);

  const handleClick = () => {
    if (variety === "sneaker") {
      if (sneaker.sneakerId !== null) {
        setSneakerError("");
        try {
          axios.delete(`http://localhost:8080/sneakers/${sneaker.sneakerId}`);
          setDeleteConf(false);
        } catch (e) {
          setSneakerError("Error while deleting Sneaker. " + e);
        }
        setSneaker({
          sneakerId: null,
          sneakerName: "",
          size: null,
          priceBought: null,
          pid: null,
        });
      }
    }
    if (variety === "item") {
      if (item.itemId !== null) {
        setItemError("");
        try {
          axios.delete(`http://localhost:8080/items/${item.itemId}`);
          setDeleteConf(false);
        } catch (e) {
          setSneakerError("Error while deleting Item. " + e);
        }
        setItem({
          itemId: null,
          itemName: "",
          size: null,
          priceBought: null,
        });
      }
    }
    if (variety === "bot") {
      if (bot.botId !== null) {
        setBotError("");
        try {
          axios.delete(`http://localhost:8080/bots/${bot.botId}`);
          setDeleteConf(false);
        } catch (e) {
          setBotError("Error while deleting Bot. " + e);
        }
      }
    }
  };

  return (
    <div className={"del-container"}>
      {variety === "sneaker" && (
        <div>
          <header className={"del-header"}>Delete Sneaker</header>
          <h3>
            Are you sure you want to delete: <br />
            {sneaker.sneakerName}?
          </h3>
        </div>
      )}
      {variety === "item" && (
        <div>
          <header className={"del-header"}>Delete Item</header>
          <h3>
            Are you sure you want to delete: <br />
            {item.itemName}?
          </h3>
        </div>
      )}
      {variety === "bot" && (
        <div>
          <header className={"del-header"}>Delete Bot</header>
          <h3>
            Are you sure you want to delete: <br />
            {bot.botName}?
          </h3>
        </div>
      )}
      <div className={"del-btn"}>
        <button className={"green-button"} onClick={() => handleClick()}>
          Yes
        </button>
        <button onClick={() => setDeleteConf(false)} className={"red-button"}>
          No
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmation;
