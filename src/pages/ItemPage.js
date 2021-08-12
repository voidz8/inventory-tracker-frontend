import React, { useEffect, useState, useContext } from "react";
import TopMenu from "../components/TopMenu";
import axios from "axios";
import Item from "../components/Item";
import ItemForm from "../components/ItemForm";
import { itemContext } from "../contexts/ItemContext";
import ItemEditForm from "../components/ItemEditForm";
import "./SneakerPage.css";
import DeleteConfirmation from "../components/DeleteConfirmation";
import { sneakerContext } from "../contexts/SneakerContext";
import SaleForm from "../components/SaleForm";
import ErrorMessage from "../components/ErrorMessage";
import { authContext } from "../contexts/AuthContext";

function ItemPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [items, setItems] = useState([]);
  const { itemFormOpen, isItemFormOpen, setItemFormOpen, itemEditFormOpen } =
    useContext(itemContext);
  const { deleteConf, saleMenuOpen } = useContext(sneakerContext);
  const { authenticated } = useContext(authContext);

  useEffect(() => {
    async function getItemData() {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get("http://localhost:8080/items/all", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setItems(response.data);
      } catch (e) {
        setError(e.response.message);
      }
      setLoading(false);
    }

    getItemData();
  }, [isItemFormOpen]);

  return (
    <div className={loading ? "loading-cursor" : ""}>
      <div className={"sneaker-page"}>
        <TopMenu />
        <header className={"title"}>Item Inventory</header>
        {error && <ErrorMessage message={error} />}
        <div className={"pop-up"}>
          {itemFormOpen && <ItemForm />}
          {itemEditFormOpen && <ItemEditForm />}
          {saleMenuOpen && <SaleForm variety={"item"} />}
          {deleteConf && <DeleteConfirmation variety={"item"} />}
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
                variety={"item"}
              />
            );
          })}
          {authenticated && !isItemFormOpen() && (
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
    </div>
  );
}

export default ItemPage;
