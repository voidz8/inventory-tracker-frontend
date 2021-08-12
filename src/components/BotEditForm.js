import React, { useContext, useState } from "react";
import { botContext } from "../contexts/BotContext";
import { useForm } from "react-hook-form";
import IconInputField from "./IconInputfield";
import botIcon from "../assets/robot.png";
import priceicon from "../assets/dollar.png";
import axios from "axios";

function BotEditForm() {
  const { setBotEditFormOpen, bot, setBot, setBotError } =
    useContext(botContext);
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [botName, setBotname] = useState(bot.botName);
  const [priceBought, setPriceBought] = useState(bot.priceBought);

  async function onFormSubmit(data) {
    try {
      const response = axios.patch(`http://localhost:8080/bots/${bot.botId}`, {
        botName: data.botName,
        priceBought: data.price,
      });
    } catch (e) {
      setBotError(e);
    }
  }

  const handleNameChange = (e) => setBotname(e.target.value);
  const handlePriceChange = (e) => setPriceBought(e.target.value);

  return (
    <div className={"edit-form-container"}>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <header className={"form-header"}>Edit Bot</header>
        <div className={"fieldset-container"}>
          <fieldset>
            <IconInputField
              value={botName}
              icon={botIcon}
              placeholder={"BOT NAME"}
              {...register("botName", { required: true, maxLength: 35 })}
              onChange={(e) => handleNameChange(e)}
            />
            <IconInputField
              value={priceBought}
              name={"price"}
              icon={priceicon}
              placeholder={"PRICE"}
              {...register("price")}
              onChange={(e) => handlePriceChange(e)}
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
            onClick={() => setBotEditFormOpen(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default BotEditForm;
