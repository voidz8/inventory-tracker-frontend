import React, { useState, useContext, useEffect } from "react";
import TopMenu from "../components/TopMenu";
import axios from "axios";
import Item from "../components/Item";
import { authContext } from "../contexts/AuthContext";
import ErrorMessage from "../components/ErrorMessage";

function SoldItemPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [soldItems, setSoldItems] = useState([]);

  useEffect(() => {
    async function getSoldItemData() {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          "http://localhost:8080/items/sold-items",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSoldItems(response.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    }
    getSoldItemData();
  }, []);

  return (
    <div className={loading ? "loading-cursor" : ""}>
      <div className={"sneaker-page"}>
        <TopMenu />
        <header className={"title"}>Item Sales</header>
        {error && <ErrorMessage message={error} />}
        <div className={"items"}>
          {soldItems.map((item) => {
            let image = `data:${item.image.fileType};base64,${item.image.data}`;
            return (
              <Item
                className={"sneaker-item"}
                image={image}
                name={item.itemName}
                date={item.dateBought}
                price={item.priceBought}
                size={item.itemSize}
                sell={false}
                id={item.id}
                sneaker={false}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default SoldItemPage;
