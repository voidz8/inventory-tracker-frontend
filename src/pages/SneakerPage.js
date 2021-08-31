import React, { useContext, useEffect, useState } from "react";
import TopMenu from "../components/TopMenu";
import SneakerForm from "../components/SneakerForm";
import "./SneakerPage.css";
import Item from "../components/Item";
import axios from "axios";
import { sneakerContext } from "../contexts/SneakerContext";
import SneakerEditForm from "../components/SneakerEditForm.js";
import SaleForm from "../components/SaleForm";
import DeleteConfirmation from "../components/DeleteConfirmation";
import ErrorMessage from "../components/ErrorMessage";
import { authContext } from "../contexts/AuthContext";

function SneakerPage() {
  const [sneakers, setSneakers] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    sneakerFormOpen,
    setSneakerFormOpen,
    sneakerEditFormOpen,
    saleMenuOpen,
    isFormOpen,
    deleteConf,
    sneakerError,
    setSneakerError,
  } = useContext(sneakerContext);
  const { authenticated } = useContext(authContext);

  useEffect(() => {
    async function getSneakerData() {
      setLoading(true);
      setSneakerError("");
      try {
        const response = await axios.get("http://localhost:8080/sneakers/all", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSneakers(response.data);
      } catch (e) {
        setSneakerError(e.response.message);
      }
      setLoading(false);
    }

    getSneakerData();
  }, [isFormOpen]);

  return (
    <div className={loading ? "loading-cursor" : ""}>
      <div className={"sneaker-page"}>
        <TopMenu />
        <header className={"title"}>Sneaker Inventory</header>
        {sneakerError && <ErrorMessage message={sneakerError} />}
        <div className={"pop-up"}>
          {sneakerEditFormOpen && <SneakerEditForm />}
          {saleMenuOpen && <SaleForm variety={"sneaker"} />}
          {sneakerFormOpen && <SneakerForm className={"sneaker-form"} />}
          {deleteConf && <DeleteConfirmation variety={"sneaker"} />}
        </div>
        <div className={"items"}>
          {sneakers.map((sneaker) => {
            let image = `data:${sneaker.image.fileType};base64,${sneaker.image.data}`;
            return (
              <Item
                image={image}
                className={"sneaker-item"}
                name={sneaker.sneakerName}
                date={sneaker.dateBought}
                price={sneaker.priceBought}
                size={sneaker.sneakerSize}
                pid={sneaker.pid}
                sell={true}
                id={sneaker.id}
                variety={"sneaker"}
              />
            );
          })}
          {authenticated && !isFormOpen() && (
            <button
              type={"button"}
              onClick={() => setSneakerFormOpen(true)}
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

export default SneakerPage;
