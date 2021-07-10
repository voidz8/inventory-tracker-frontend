import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./SneakerForm.css";
import IconInputField from "./IconInputfield";
import sneakericon from "../assets/sneaker-icon.png";
import priceicon from "../assets/dollar.png";
import stylecodeicon from "../assets/stylecode-icon.png";
import sizeicon from "../assets/size.png";
import axios from "axios";

function SneakerForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { handleSubmit, register } = useForm();
  const [invoice, setInvoice] = useState(null);
  const [photo, setPhoto] = useState(null);
  const url = "http://localhost:8080/";

  // function handleInvoice(e) {
  //   console.log(e);
  //   setInvoice(e.invoice[0]);
  //   console.log(invoice);
  // }
  //
  // function handlePhoto(e) {
  //   let file = e.photo[0];
  //   setPhoto(file);
  //   console.log(photo);
  // }

  async function onFormSubmit(data) {
    // data.preventDefault();
    console.log(data);

    let invoiceData = new FormData();
    invoiceData.append("invoice", invoice);
    console.log(invoiceData);

    let photoData = new FormData();
    invoiceData.append("photo", photo);
    console.log(photoData);

    console.log(data.invoice[0]);

    const response = axios.post(
      url + "sneakers",
      {
        sneakerName: data.sneakerName,
        size: data.size,
        priceBought: data.price,
        pid: data.stylecode,
        dateBought: new Date().toJSON(),
        invoice: data.invoice[0],
        photo: data.photo[0],
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "content-type": "mulitpart/form-data",
        },
      }
    );
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
              maxlength={35}
              {...register("sneakerName")}
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
              {...register("stylecode")}
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
              Upload Invoice
              <input
                value={invoice}
                id={"invoice"}
                onClick={(e) => (e.target.value = null)}
                type={"file"}
                name={"invoice"}
                // onChange={() => handleInvoice()}
                {...register("invoice")}
              />
            </label>
            <label>
              Upload Picture
              <input
                value={photo}
                onClick={(e) => (e.target.value = null)}
                type={"file"}
                // onChange={(e) => handlePhoto(e)}
                name={"photo"}
                {...register("photo")}
              />
            </label>
          </fieldset>
        </div>
        <button type={"button"} id={"cancel"}>
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
