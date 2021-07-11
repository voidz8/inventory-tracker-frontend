import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import TopMenu from "../components/TopMenu";
import authContext from "../contexts/AuthContext";
import axios from "axios";
import Chart from "../components/Chart";
import "./HomePage.css";

function HomePage() {
  const authData = useContext(authContext);
  const history = useHistory();
  const [sneakerData, setSneakerData] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [botData, setBotData] = useState([]);
  const url = "http://localhost:8080/";
  const header = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  useEffect(async () => {
    const sneakerResponse = await axios.get(url + "sneakers/data", header);
    const itemResponse = await axios.get(url + "items/data", header);
    const botResponse = await axios.get(url + "bots/data", header);

    setSneakerData(sneakerResponse.data.sort(sortByDate));
    setItemData(itemResponse.data.sort(sortByDate));
    setBotData(botResponse.data.sort(sortByDate));
  }, []);

  function sortByDate(a, b) {
    let dateA = new Date(a.date),
      dateB = new Date(b.date);
    return dateA - dateB;
  }

  return (
    <div className={"HomePage"}>
      <TopMenu />
      <div className={"charts-container"}>
        <div className={"chart"}>
          <label className={"chart-name"}>Sneaker Overview</label>
          <Chart
            data={sneakerData}
            firstDataKey={"priceBought"}
            secondDataKey={"priceSold"}
          />
        </div>
        <div className={"chart"}>
          <label className={"chart-name"}>Item Overview</label>
          <Chart
            data={itemData}
            firstDataKey={"priceBought"}
            secondDataKey={"priceSold"}
          />
        </div>
        <div className={"chart"}>
          <label className={"chart-name"}>Bot Overview</label>
          <Chart
            data={botData}
            firstDataKey={"priceBought"}
            secondDataKey={"priceSold"}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
