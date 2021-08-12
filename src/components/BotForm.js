import React, { useContext, useState } from "react";
import { botContext } from "../contexts/BotContext";
import { useForm } from "react-hook-form";
import IconInputField from "./IconInputfield";
import botIcon from "../assets/robot.png";
import priceicon from "../assets/dollar.png";

function BotForm() {
  const [loading, setLoading] = useState();
  const { setBotFormOpen, setBotError } = useContext(botContext);
  const { handleSubmit, register } = useForm();

  async function onFormSubmit(data) {
    let formData = new FormData();
  }

  return (
    <div className={"form-container"}>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <header className={"form-header"}>Add Bot</header>
        <div className={"fieldset-container"}>
          <fieldset>
            <IconInputField
              icon={botIcon}
              placeholder={"BOT NAME"}
              {...register("botName", { required: true, maxLength: 35 })}
            />
            <IconInputField
              name={"price"}
              icon={priceicon}
              placeholder={"PRICE"}
              {...register("price")}
            />
          </fieldset>
          <label>
            Upload Picture
            <input
              type={"file"}
              onClick={(e) => (e.target.value = null)}
              name={"photo"}
              {...register("photo")}
            />
          </label>
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
            onClick={() => setBotFormOpen(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default BotForm;
