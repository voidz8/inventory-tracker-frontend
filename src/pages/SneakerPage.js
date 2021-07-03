import React from "react";
import { useHistory } from "react-router-dom";
import TopMenu from "../components/TopMenu";
import SneakerForm from "../components/SneakerForm";
import "./SneakerPage.css";
import SneakerItem from "../components/SneakerItem";

function SneakerPage() {
  const history = useHistory();
  return (
    <div>
      <TopMenu />
      <div className={"items"}>
        <SneakerItem name={"Adidas YeezyBoost 350 V2 'Zebra'"} />
      </div>
      <SneakerForm className={"sneaker-form"} />
    </div>
  );
}

export default SneakerPage;
