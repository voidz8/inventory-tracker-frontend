import React, { useEffect, useState, useContext } from "react";
import TopMenu from "../components/TopMenu";
import axios from "axios";
import Item from "../components/Item";
import { botContext } from "../contexts/BotContext";
import BotForm from "../components/BotForm";
import BotEditForm from "../components/BotEditForm";
import { sneakerContext } from "../contexts/SneakerContext";
import DeleteConfirmation from "../components/DeleteConfirmation";
import SaleForm from "../components/SaleForm";
import ErrorMessage from "../components/ErrorMessage";
import { authContext } from "../contexts/AuthContext";

function BotPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bots, setBots] = useState([]);
  const { isBotFormOpen, botFormOpen, setBotFormOpen, botEditFormOpen } =
    useContext(botContext);
  const { deleteConf, saleMenuOpen } = useContext(sneakerContext);
  const { authenticated } = useContext(authContext);

  useEffect(() => {
    async function getBots() {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get("http://localhost:8080/bots/all", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBots(response.data);
      } catch (e) {
        setError(e.response.message);
      }
      setLoading(false);
    }

    getBots();
  }, []);
  return (
    <div className={loading ? "loading-cursor" : ""}>
      <div className={"sneaker-page"}>
        <TopMenu />
        <header className={"title"}>Bot Inventory</header>
        {error && <ErrorMessage message={error} />}
        <div className={"pop-up"}>
          {botFormOpen && <BotForm />}
          {saleMenuOpen && <SaleForm variety={"bot"} />}
          {botEditFormOpen && <BotEditForm />}
          {deleteConf && <DeleteConfirmation variety={"bot"} />}
        </div>
        <div className={"items"}>
          {bots.map((bot) => {
            let image = `data:${bot.image.fileType};base64,${bot.image.data}`;
            return (
              <Item
                className={"sneaker-item"}
                name={bot.botName}
                date={bot.dateBought}
                price={bot.priceBought}
                sneaker={false}
                id={bot.id}
                sell={true}
                variety={"bot"}
              />
            );
          })}
          {authenticated && !isBotFormOpen() && (
            <button
              type={"button"}
              onClick={() => setBotFormOpen(true)}
              className={"add-button"}
            >
              +
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default BotPage;
