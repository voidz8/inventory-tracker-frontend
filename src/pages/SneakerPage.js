import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
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

function SneakerPage() {
  const history = useHistory();
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

  useEffect(() => {
    async function getSneakerData() {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/sneakers/all", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSneakers(response.data);
      } catch (e) {
        setSneakerError(e);
      }
    }
    getSneakerData();
    setLoading(false);
  }, [isFormOpen]);

  return (
    <div className={"sneaker-page"}>
      <TopMenu />
      {loading && <h1>Loading...</h1>}
      {sneakerError && <ErrorMessage message={sneakerError} />}
      <div className={"pop-up"}>
        {sneakerEditFormOpen && <SneakerEditForm />}
        {saleMenuOpen && <SaleForm />}
        {sneakerFormOpen && <SneakerForm className={"sneaker-form"} />}
        {deleteConf && <DeleteConfirmation />}
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
              sneaker={true}
            />
          );
        })}
        {!isFormOpen() && (
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
  );
}

export default SneakerPage;
