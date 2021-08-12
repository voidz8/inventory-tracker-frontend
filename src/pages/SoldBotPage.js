import React, { useContext, useEffect, useState } from "react";
import TopMenu from "../components/TopMenu";
import axios from "axios";
import Item from "../components/Item";
import { authContext } from "../contexts/AuthContext";
import { set } from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";

function SoldBotPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [soldBots, setSoldBots] = useState([]);

  useEffect(() => {
    async function getSoldBotData() {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get("http://localhost:8080/bots/sold", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSoldBots(response.data);
      } catch (e) {
        setError("Error while retrieving sold bots. " + e.response.message);
      }
      setLoading(false);
    }

    getSoldBotData();
  }, []);

  return (
    <div className={loading ? "loading-cursor" : ""}>
      <div className={"sneaker-page"}>
        <TopMenu />
        <header className={"title"}>Bot Sales</header>
        {error && <ErrorMessage message={error} />}
        <div className={"items"}>
          {soldBots.map((bot) => {
            let image = `data:${bot.image.fileType};base64,${bot.image.data}`;
            return (
              <Item
                className={"sneaker-item"}
                image={image}
                date={bot.dateBought}
                price={bot.priceBought}
                dateSold={bot.dateSold}
                priceSold={bot.priceSold}
                sell={false}
                variety={"bot"}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SoldBotPage;
