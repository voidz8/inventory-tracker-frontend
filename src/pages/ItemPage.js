import React, { useEffect, useState, useContext } from "react";
import TopMenu from "../components/TopMenu";
import axios from "axios";
import Item from "../components/Item";
import ItemForm from "../components/ItemForm";
import { itemContext } from "../contexts/ItemContext";
import ItemEditForm from "../components/ItemEditForm";
import "./SneakerPage.css";

function ItemPage() {
  const [items, setItems] = useState([]);
  const { itemFormOpen, isItemFormOpen, setItemFormOpen, itemEditFormOpen } =
    useContext(itemContext);

  useEffect(() => {
    async function getItemData() {
      try {
        const response = await axios.get("http://localhost:8080/items/all", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setItems(response.data);
      } catch (e) {
        console.error(e);
      }
    }

    getItemData();
  }, [isItemFormOpen]);

  return (
    <div className={"sneaker-page"}>
      <TopMenu />
      <div className={"pop-up"}>
        {itemFormOpen && <ItemForm />}
        {itemEditFormOpen && <ItemEditForm />}
        {}
      </div>

      <div className={"items"}>
        {items.map((item) => {
          let image = `data:${item.image.fileType};base64,${item.image.data}`;
          return (
            <Item
              image={image}
              className={"sneaker-item"}
              name={item.itemName}
              date={item.dateBought}
              price={item.priceBought}
              size={item.itemSize}
              sell={true}
              id={item.id}
              sneaker={false}
            />
          );
        })}
        {!isItemFormOpen() && (
          <button
            type={"button"}
            onClick={() => setItemFormOpen(true)}
            className={"add-button"}
          >
            +
          </button>
        )}
      </div>
    </div>
  );
}

export default ItemPage;
