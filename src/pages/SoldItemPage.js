import React, { useState, useContext, useEffect } from "react";
import TopMenu from "../components/TopMenu";
import axios from "axios";
import Item from "../components/Item";

function SoldItemPage() {
  const [soldItems, setSoldItems] = useState([]);

  useEffect(() => {
    async function getSoldItemData() {
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
        console.error(e);
      }
    }
    getSoldItemData();
  }, []);

  return (
    <div className={"sneaker-page"}>
      <TopMenu />
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
  );
}
export default SoldItemPage;
