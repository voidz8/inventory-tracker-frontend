import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./SneakerForm.css";
import IconInputField from "./IconInputfield";
import sneakericon from "../assets/sneaker-icon.png";
import priceicon from "../assets/dollar.png";
import stylecodeicon from "../assets/stylecode-icon.png";
import sizeicon from "../assets/size.png";

function SneakerForm() {
  const { handleSubmit } = useForm();

  function onFormSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className={"form-container"}>
      <form onSubmit={onFormSubmit}>
        <header className={"form-header"}>Add Sneaker</header>
        <div className={"fieldset-container"}>
          <fieldset>
            <IconInputField
              icon={sneakericon}
              placeholder={"SNEAKER NAME"}
              maxlength={35}
            />
            <IconInputField icon={priceicon} placeholder={"PRICE"} />
            <IconInputField icon={stylecodeicon} placeholder={"STYLECODE"} />
          </fieldset>
          <fieldset id={"second-fieldset"}>
            <IconInputField icon={sizeicon} placeholder={"SIZE"} />
            <button className={"upload"}>Upload Invoice</button>
            <button className={"upload"}>Upload Picture</button>
          </fieldset>
        </div>
        <button type={"button"} id={"cancel"} onClick={""}>
          Cancel
        </button>
        <button type={"submit"} id={"add"}>
          Add
        </button>
      </form>
    </div>
  );
}

export default SneakerForm;
