import React, { useContext, useState } from "react";
import "./Item.css";
import { sneakerContext } from "../contexts/SneakerContext";
import editIcon from "../assets/edit.png";
import trashIcon from "../assets/trash.png";
import { itemContext } from "../contexts/ItemContext";
import { botContext } from "../contexts/BotContext";

function Item({
  name,
  image,
  size,
  price,
  date,
  sell,
  dateSold,
  priceSold,
  id,
  pid,
  variety,
}) {
  const {
    saleMenuOpen,
    setSaleMenuOpen,
    sneakerEditFormOpen,
    setSneakerEditFormOpen,
    setSneaker,
    isFormOpen,
    setDeleteConf,
  } = useContext(sneakerContext);
  const { isItemFormOpen, setItemEditFormOpen, setItem } =
    useContext(itemContext);

  const { setBotEditFormOpen, setBot, isBotFormOpen } = useContext(botContext);

  const onEditClick = () => {
    if (variety === "sneaker") {
      setSneakerEditFormOpen(true);
      setSneaker({
        sneakerId: id,
        sneakerName: name,
        size: size,
        priceBought: price,
        pid: pid,
      });
    }
    if (variety === "item") {
      setItemEditFormOpen(true);
      setItem({
        itemId: id,
        itemName: name,
        size: size,
        priceBought: price,
      });
    }
    if (variety === "bot") {
      setBotEditFormOpen(true);
      setBot({
        botId: id,
        botName: name,
        priceBought: price,
      });
    }
  };

  const onDeleteClick = () => {
    if (variety === "sneaker") {
      setDeleteConf(true);
      setSneaker({
        sneakerId: id,
        sneakerName: name,
        size: size,
        priceBought: price,
        pid: pid,
      });
    }
    if (variety === "item") {
      setDeleteConf(true);
      setItem({
        itemId: id,
        itemName: name,
        size: size,
        priceBought: price,
      });
    }
    if (variety === "bot") {
      setDeleteConf(true);
      setBot({
        botId: id,
        botName: name,
        priceBought: price,
      });
    }
    console.log(variety);
  };

  const onSoldClick = () => {
    if (variety === "sneaker") {
      setSaleMenuOpen(true);
      setSneaker({
        sneakerId: id,
        sneakerName: name,
        size: size,
        priceBought: price,
        pid: pid,
      });
    }
    if (variety === "item") {
      setSaleMenuOpen(true);
      setItem({
        itemId: id,
        itemName: name,
        size: size,
        priceBought: price,
      });
    }
    if (variety === "bot") {
      setSaleMenuOpen(true);
      setBot({
        botId: id,
        botName: name,
        priceBought: price,
      });
    }
  };

  return (
    <div
      className={
        isFormOpen() || isItemFormOpen() || isBotFormOpen()
          ? "form-open-container"
          : "item-container"
      }
    >
      <header className={"item-header"}>{name}</header>
      <div className={"fields"}>
        {!saleMenuOpen && (
          <>
            <img src={image} alt="image" />
            {sell && (
              <div className={"item-fields"}>
                {variety === "sneaker" && <h3>Stylecode: {pid}</h3>}
                {size && <h3>Size: {size}</h3>}
                <h3>Price: {price}</h3>
                <h3>Date: {date}</h3>
              </div>
            )}
          </>
        )}
        {!sell && (
          <div className={"item-fields"}>
            {variety === "sneaker" && <h3>Stylecode: {pid}</h3>}
            {size && <h3>Size: {size}</h3>}
            <h3>Price: ${price}</h3>
            <h3>Price Sold: ${priceSold}</h3>
            <h3>Date: {date}</h3>
            <h3>Date Sold: {dateSold}</h3>
          </div>
        )}
      </div>
      {sell && !saleMenuOpen && (
        <div className={"item-button-group"}>
          <div className={"image-buttons"}>
            <button
              disabled={sneakerEditFormOpen}
              className={"img-btn"}
              onClick={() => onDeleteClick()}
            >
              <img id={"trash-button"} src={trashIcon} alt={"delete"} />
            </button>
            <button
              disabled={sneakerEditFormOpen}
              className={"img-btn"}
              onClick={() => onEditClick()}
            >
              <img id="edit-button" src={editIcon} alt={"edit"} />
            </button>
          </div>
          <div className={"sold-button"}>
            <button
              disabled={sneakerEditFormOpen}
              type={"button"}
              className={"green-button"}
              onClick={() => onSoldClick()}
            >
              Sold
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Item;
