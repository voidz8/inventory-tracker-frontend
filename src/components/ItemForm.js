import React from "react";
import IconInputField from "./IconInputfield";
import itemicon from "../assets/item.png";
import priceicon from "../assets/dollar.png";
import stylecodeicon from "../assets/stylecode-icon.png";
import sizeicon from "../assets/size.png";
import { useForm } from "react-hook-form";

function ItemForm() {
  const { handleSubmit } = useForm();

  function onFormSubmit(e) {
    e.preventDefault();
  }
  return (
    <div className={"container"}>
      <form onSubmit={onFormSubmit}>
        <header>Add Sneaker</header>
        <div className={"fieldset-container"}>
          <fieldset>
            <IconInputField icon={itemicon} placeholder={"ITEM NAME"} />
            <IconInputField icon={priceicon} placeholder={"PRICE"} />
            <IconInputField icon={sizeicon} placeholder={"SIZE"} />
          </fieldset>
          <fieldset id={"second-fieldset"}>
            <button className={"upload"}>Upload Invoice</button>
            <button className={"upload"}>Upload Picture</button>
          </fieldset>
        </div>
        <button type={"submit"} id={"add"}>
          Add
        </button>
      </form>
    </div>
  );
}
export default ItemForm;
