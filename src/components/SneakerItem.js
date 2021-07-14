import React, { useContext } from "react";
import "./SneakerItem.css";
import { sneakerContext } from "../contexts/SneakerContext";
import SaleForm from "./SaleForm";

function SneakerItem({
  name,
  image,
  size,
  price,
  date,
  sell,
  dateSold,
  priceSold,
}) {
  const { saleMenuOpen, setSaleMenuOpen } = useContext(sneakerContext);

  return (
    <div className={"sneaker-container"}>
      <header className={"sneaker-header"}>{name}</header>
      {saleMenuOpen && <SaleForm />}
      <div className={"fields"}>
        {!saleMenuOpen && (
          <>
            <img src={image} alt="image" />
            {sell && (
              <div className={"item-fields"}>
                <h3>Size: {size}</h3>
                <h3>Price: {price}</h3>
                <h3>Date: {date}</h3>
                <h3>Invoice</h3>
              </div>
            )}
          </>
        )}
        {!sell && (
          <div className={"item-fields"}>
            <h3>Size: {size}</h3>
            <h3>Price: ${price}</h3>
            <h3>Price Sold: ${priceSold}</h3>
            <h3>Date: {date}</h3>
            <h3>Date Sold: {dateSold}</h3>
          </div>
        )}
      </div>
      {sell && !saleMenuOpen && (
        <button
          type={"button"}
          className={"sold-button"}
          onClick={() => setSaleMenuOpen(true)}
        >
          Sold
        </button>
      )}
    </div>
  );
}

export default SneakerItem;
