import React, { useState, useContext } from "react";
import { itemContext } from "../contexts/ItemContext";
import { useForm } from "react-hook-form";
import axios from "axios";
import IconInputField from "./IconInputfield";
import itemicon from "../assets/item.png";
import priceicon from "../assets/dollar.png";
import sizeicon from "../assets/size.png";

function ItemEditForm() {
  const [loading, setLoading] = useState(false);
  const { setItemEditFormOpen, setItemError, item } = useContext(itemContext);
  const { register, handleSubmit } = useForm();
  const [itemName, setItemName] = useState(item.itemName);
  const [size, setSize] = useState(item.size);
  const [priceBought, setPriceBought] = useState(item.priceBought);

  async function onFormSubmit(data) {
    setItemError("");
    setLoading(true);
    try {
      await axios.patch(`http://localhost:8080/items/${item.itemId}`, {
        itemName: data.itemName,
        priceBought: data.price,
        size: data.size,
      });
    } catch (e) {}
  }

  const handleNameChange = (e) => setItemName(e.target.value);
  const handlePriceChange = (e) => setPriceBought(e.target.value);
  const handleSizeChange = (e) => setSize(e.target.value);

  return (
    <div className={"edit-form-container"}>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <header className={"form-header"}>Edit Item</header>
        <div className={"fieldset-container"}>
          <fieldset>
            <IconInputField
              type={"text"}
              value={itemName}
              name={"itemName"}
              icon={itemicon}
              placeholder={"ITEM NAME*"}
              {...register("itemName", { required: true, maxLength: 35 })}
              onChange={(e) => handleNameChange(e)}
            />
            <IconInputField
              type={"text"}
              value={priceBought}
              icon={priceicon}
              placeholder={"PRICE"}
              {...register("price")}
              onChange={(e) => handlePriceChange(e)}
            />
            <IconInputField
              type={"text"}
              value={size}
              icon={sizeicon}
              placeholder={"SIZE"}
              {...register("size")}
              onChange={(e) => handleSizeChange(e)}
            />
          </fieldset>
        </div>
        <div className={"edit-btn-div"}>
          <button disabled={loading} className={"green-button"} type={"submit"}>
            Edit
          </button>
          <button
            disabled={loading}
            className={"red-button"}
            onClick={() => setItemEditFormOpen(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ItemEditForm;
