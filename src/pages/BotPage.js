import React, { useEffect, useState, useContext } from "react";
import TopMenu from "../components/TopMenu";
import axios from "axios";
import Item from "../components/Item";
import { botContext } from "../contexts/BotContext";

function BotPage() {
  const [bots, setBots] = useState([]);
  const { isBotFormOpen } = useContext(botContext);

  useEffect(() => {
    async function getBots() {
      try {
        const response = await axios.get("http://localhost:8080/bots/all", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setBots(response.data);
      } catch (e) {
        console.error(e);
      }
    }
    getBots();
  }, []);
  return (
    <div className={"sneaker-page"}>
      <TopMenu />
      <div className={"items"}>
        {bots.map((bot) => {
          return (
            <Item
              className={"sneaker-item"}
              name={bot.botName}
              date={bot.dateBought}
              price={bot.priceBought}
              sneaker={false}
              id={bot.id}
              sell={true}
            />
          );
        })}
        {!isBotFormOpen() && (
          <button type={"button"} className={"add-button"}>
            +
          </button>
        )}
      </div>
    </div>
  );
}

export default BotPage;
