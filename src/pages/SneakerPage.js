import React, { useContext, useEffect, useState } from "react";
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
  const [imagesWithId, setImagesWithId] = useState([]);
  const { addSneakerForm, setAddSneakerForm } = useContext(sneakerContext);

  useEffect(async () => {
    await fetchData();
  }, []);

  function getSneakerData() {
    try {
      axios
        .get("http://localhost:8080/sneakers/all", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => setSneakers(response.data));
    } catch (e) {
      console.error(e);
    }
    return sneakers;
  }

  function getSneakerImages(sneakers) {
    for (const sneaker of sneakers) {
      console.log(sneaker);
      try {
        axios
          .get("http://localhost:8080/sneakers/image", {
            params: {
              sneakerId: sneaker.id,
            },
          })
          .then((response) =>
            setImagesWithId({ image: response.data, sneakerId: sneaker.id })
          );
      } catch (e) {}
    }
  }

  function fetchData() {
    getSneakerData();
    getSneakerImages(sneakers);
  }

  function getImage(sneaker) {
    if (sneaker.id === imagesWithId.id) {
      return `data:image/png;base64${imagesWithId.image}`;
    }
  }

  return (
    <div className={"sneaker-page"}>
      <TopMenu />
      <div className={"items"}>
        {sneakers.map((sneaker) => {
          let image = getImage(sneaker);
          console.log(image);
          return (
            <SneakerItem
              image={image}
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
