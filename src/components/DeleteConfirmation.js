import React, { useContext } from "react";
import "./DeleteConfirmation.css";
import { sneakerContext } from "../contexts/SneakerContext";
import axios from "axios";

function DeleteConfirmation() {
  const { setDeleteConf, sneaker, setSneaker, setSneakerError } =
    useContext(sneakerContext);
  const handleClick = () => {
    if (sneaker.sneakerId !== null) {
      setSneakerError("");
      try {
        axios.delete(`http://localhost:8080/sneakers/${sneaker.sneakerId}`);

        setDeleteConf(false);
      } catch (e) {
        setSneakerError("Error while deleting Sneaker. " + e);
      }
      setSneaker({
        sneakerId: null,
        sneakerName: "",
        size: null,
        priceBought: null,
        pid: null,
      });
    }
  };

  return (
    <div className={"del-container"}>
      <header className={"del-header"}>Delete Sneaker</header>
      <h3>Are you sure you want to delete this sneaker?</h3>
      <div className={"del-btn"}>
        <button className={"green-button"} onClick={() => handleClick()}>
          Yes
        </button>
        <button onClick={() => setDeleteConf(false)} className={"red-button"}>
          No
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmation;
