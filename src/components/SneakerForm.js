import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import "./SneakerForm.css";
import IconInputField from "./IconInputfield";
import sneakericon from "../assets/sneaker-icon.png";
import priceicon from "../assets/dollar.png";
import stylecodeicon from "../assets/stylecode-icon.png";
import sizeicon from "../assets/size.png";
import axios from "axios";
import { sneakerContext } from "../contexts/SneakerContext";

function SneakerForm() {
  const { setSneakerFormOpen, setSneakerError } = useContext(sneakerContext);
  const [loading, setLoading] = useState(false);
  const { handleSubmit, register } = useForm();

  const url = "http://localhost:8080/";

  async function onFormSubmit(data) {
    setLoading(true);

    let formData = new FormData();

    formData.append("sneakerName", data.sneakerName);
    formData.append("sneakerSize", data.size);
    formData.append("priceBought", data.price);
    formData.append("pid", data.style);
    formData.append("photo", data.photo[0]);

    try {
      console.log(data);
      axios.post(url + "sneakers", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "content-type": "mulitpart/form-data",
        },
      });
    } catch (e) {
      setSneakerError("Error while adding item. " + e);
    }
    setLoading(false);
    setSneakerFormOpen(false);
  }

  return (
    <div className={"form-container"}>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <header className={"form-header"}>Add Sneaker</header>
        <div className={"fieldset-container"}>
          <fieldset>
            <IconInputField
              icon={sneakericon}
              placeholder={"SNEAKER NAME"}
              {...register("sneakerName", { required: true, maxLength: 35 })}
            />
            <IconInputField
              name={"price"}
              icon={priceicon}
              placeholder={"PRICE"}
              {...register("price")}
            />
            <IconInputField
              name={"stylecode"}
              icon={stylecodeicon}
              placeholder={"STYLECODE"}
              {...register("style")}
            />
          </fieldset>
          <fieldset id={"second-fieldset"}>
            <IconInputField
              name={"size"}
              icon={sizeicon}
              placeholder={"SIZE"}
              {...register("size")}
            />
            <label>
              Upload Picture
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
            onClick={() => setSneakerFormOpen(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default SneakerForm;
