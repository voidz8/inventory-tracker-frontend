import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { sneakerContext } from "../contexts/SneakerContext";
import axios from "axios";
import IconInputField from "./IconInputfield";
import sneakericon from "../assets/sneaker-icon.png";
import priceicon from "../assets/dollar.png";
import stylecodeicon from "../assets/stylecode-icon.png";
import sizeicon from "../assets/size.png";
import "./SneakerEditForm.css";

function SneakerEditForm() {
  const {
    setSneakerEditFormOpen,
    sneaker,
    setSneaker,
    setSneakerError,
    sneakerError,
  } = useContext(sneakerContext);
  const [loading, setLoading] = useState(false);
  const { handleSubmit, register } = useForm();
  const [sneakerName, setSneakerName] = useState(sneaker.sneakerName);
  const [size, setSize] = useState(sneaker.size);
  const [priceBought, setPriceBought] = useState(sneaker.priceBought);
  const [pid, setPid] = useState(sneaker.pid);

  async function onFormSubmit(data) {
    setSneakerError("");
    setLoading(true);
    try {
      await axios.patch(`http://localhost:8080/sneakers/${sneaker.sneakerId}`, {
        sneakerName: data.sneakerName,
        priceBought: data.price,
        pid: data.style,
        size: data.size,
      });
    } catch (e) {
      setSneakerError("Error while editing sneaker. " + e);
    }
    setSneaker({
      sneakerId: null,
      sneakerName: "",
      size: null,
      priceBought: null,
      pid: null,
    });
    setLoading(false);
    setSneakerEditFormOpen(false);
  }

  const handleNameChange = (e) => setSneakerName(e.target.value);
  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };
  const handlePriceChange = (e) => {
    setPriceBought(e.target.value);
  };
  const handlePidChange = (e) => {
    setPid(e.target.value);
  };

  return (
    <div className={"edit-form-container"}>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <header className={"form-header"}>Edit Sneaker</header>
        <div className={"fieldset-container"}>
          <fieldset>
            <IconInputField
              type={"text"}
              value={sneakerName}
              icon={sneakericon}
              placeholder={"SNEAKER NAME"}
              {...register("sneakerName", { maxLength: 35 })}
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
          </fieldset>
          <fieldset>
            <IconInputField
              type={"text"}
              value={pid}
              icon={stylecodeicon}
              placeholder={"STYLECODE"}
              {...register("style")}
              onChange={(e) => handlePidChange(e)}
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
        <div className="edit-btn-div">
          <button disabled={loading} className={"green-button"} type={"submit"}>
            Edit
          </button>
          <button
            disabled={loading}
            className={"red-button"}
            onClick={() => setSneakerEditFormOpen(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default SneakerEditForm;
