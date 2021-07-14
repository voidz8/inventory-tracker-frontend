import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import IconInputfield from "./IconInputfield";
import priceicon from "../assets/dollar.png";
import { sneakerContext } from "../contexts/SneakerContext";

function SaleForm() {
  const { handleSubmit, register } = useForm();
  const { saleMenuOpen, setSaleMenuOpen } = useContext(sneakerContext);

  async function onFormSubmit() {}

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <IconInputfield
        name={"salePrice"}
        icon={priceicon}
        placeholder={"SALE PRICE"}
        {...register("salePrice")}
      />
      <button type={"submit"}>Submit</button>
      <button type={"button"} onClick={() => setSaleMenuOpen(false)}>
        Cancel
      </button>
    </form>
  );
}

export default SaleForm;
