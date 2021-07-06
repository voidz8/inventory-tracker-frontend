import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import TopMenu from "../components/TopMenu";
import SneakerForm from "../components/SneakerForm";
import "./SneakerPage.css";
import SneakerItem from "../components/SneakerItem";
import axios from "axios";

function SneakerPage() {
  const history = useHistory();
  const [sneakers, setSneakers] = useState([]);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    async function getSneakerData() {
      try {
        const response = await axios.get("http://localhost:8080/sneakers/all", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSneakers(response.data);
        console.log(response);
      } catch (e) {
        console.error(e);
      }
    }

    getSneakerData();
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
            />
          );
        })}
        {/*</div>*/}
        {/*<div className={"button-form"}>*/}
        {!formOpen && (
          <button
            type={"button"}
            onClick={() => setFormOpen(true)}
            className={"add-button"}
          >
            +
          </button>
        )}
        {formOpen && <SneakerForm className={"sneaker-form"} />}
      </div>
    </div>
  );
}

export default SneakerPage;
