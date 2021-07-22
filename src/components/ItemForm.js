import React, { useState, useContext } from "react";
import IconInputField from "./IconInputfield";
import itemicon from "../assets/item.png";
import priceicon from "../assets/dollar.png";
import sizeicon from "../assets/size.png";
import { useForm } from "react-hook-form";
import { itemContext } from "../contexts/ItemContext";
import axios from "axios";

function ItemForm() {
  const [loading, setLoading] = useState();
  const { handleSubmit, register } = useForm();
  const { setItemFormOpen, setItemError } = useContext(itemContext);

  function onFormSubmit(data) {
    setLoading(true);

    let formData = new FormData();

    formData.append("itemName", data.itemName);
    formData.append("size", data.size);
    formData.append("priceBought", data.price);
    formData.append("photo", data.photo[0]);

    try {
      axios.post("http://localhost:8080/items", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "content-type": "mulitpart/form-data",
        },
      });
    } catch (e) {
      setItemError("Error while adding item. " + e);
    }
    setItemFormOpen(false);
    setLoading(false);
  }

  return (
    <div className={"form-container"}>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <header className={"form-header"}>Add Item</header>
        <div className={"fieldset-container"}>
          <fieldset>
            <IconInputField
              name={"itemName"}
              icon={itemicon}
              placeholder={"ITEM NAME*"}
              {...register("itemName", { required: true, maxLength: 35 })}
            />
            <IconInputField
              name={"price"}
              icon={priceicon}
              placeholder={"PRICE*"}
              {...register("price")}
            />
            <IconInputField
              name={"size"}
              icon={sizeicon}
              placeholder={"SIZE"}
              {...register("size")}
            />
          </fieldset>
          <fieldset id={"second-fieldset"}>
            <label>
              Upload Picture*
              <input
                type={"file"}
                onClick={(e) => (e.target.value = null)}
                name={"photo"}
                {...register("photo")}
              />
            </label>
          </fieldset>
        </div>
        <div className={"form-btn"}>
          <button
            disabled={loading}
            type={"submit"}
            id={"add"}
            className={"conf-button"}
          >
            Add
          </button>
          <button
            className={"conf-button"}
            disabled={loading}
            type={"button"}
            id={"cancel"}
            onClick={() => setItemFormOpen(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ItemForm;
