import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import TopMenu from "../components/TopMenu";
import SneakerForm from "../components/SneakerForm";
import "./SneakerPage.css";
import SneakerItem from "../components/SneakerItem";
import axios from "axios";
import { sneakerContext } from "../contexts/SneakerContext";

function SneakerPage() {
  const history = useHistory();
  const [sneakers, setSneakers] = useState([]);
  const [images, setImages] = useState([]);
  const { addSneakerForm, setAddSneakerForm } = useContext(sneakerContext);

  useEffect(() => {
    async function getSneakerData() {
      try {
        const response = await axios.get("http://localhost:8080/sneakers/all", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSneakers(response.data);
      } catch (e) {
        console.error(e);
      }
    }

    async function getSneakerImages(sneakers) {
      for (const sneaker of sneakers) {
        console.log(sneaker);
        try {
          const images = await axios.get(
            "http://localhost:8080/sneakers/image",
            {
              params: {
                sneakerId: sneaker.id,
              },
            }
          );
        } catch (e) {}
      }
    }

    getSneakerData();
    getSneakerImages(sneakers).then((r) => setImages(r));
  }, []);

  return (
    <div className={"sneaker-page"}>
      <TopMenu />
      <div className={"items"}>
        {sneakers.map((sneaker) => {
          return (
            <SneakerItem
              className={"sneaker-item"}
              name={sneaker.sneakerName}
              date={sneaker.dateBought}
              price={sneaker.priceBought}
              size={sneaker.sneakerSize}
              sell={true}
            />
          );
        })}
        {!addSneakerForm && (
          <button
            type={"button"}
            onClick={() => setAddSneakerForm(true)}
            className={"add-button"}
          >
            +
          </button>
        )}
        {addSneakerForm && <SneakerForm className={"sneaker-form"} />}
      </div>
    </div>
  );
}

export default SneakerPage;
