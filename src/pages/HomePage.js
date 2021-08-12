import React, { useContext, useEffect, useState } from "react";
import TopMenu from "../components/TopMenu";
import axios from "axios";
import Chart from "../components/Chart";
import "./HomePage.css";
import { sortByDate } from "../helpers/DateConverter";
import ErrorMessage from "../components/ErrorMessage";
import { authContext } from "../contexts/AuthContext";

function HomePage() {
  const [loading, setLoading] = useState(false);
  const [sneakerError, setSneakerError] = useState("");
  const [itemError, setItemError] = useState("");
  const [botError, setBotError] = useState("");
  const [sneakerData, setSneakerData] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [botData, setBotData] = useState([]);
  const url = "http://localhost:8080/";
  const header = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const { authenticated } = useContext(authContext);

  useEffect(() => {
    async function getSneakerData() {
      setLoading(true);
      setSneakerError("");
      try {
        const response = await axios.get(url + "sneakers/data", header);
        setSneakerData(response.data.sort(sortByDate));
      } catch (e) {
        setSneakerError(
          "Couldn't retrieve sneaker data. " + e.response.data.message
        );
      }
      setLoading(false);
    }

    async function getItemData() {
      setLoading(true);
      setItemError("");
      try {
        const response = await axios.get(url + "items/data", header);
        setItemData(response.data.sort(sortByDate));
      } catch (e) {
        setItemError("Couldn't retrieve item data. " + e.response.data.message);
      }
      setLoading(false);
    }

    async function getBotData() {
      setLoading(true);
      setBotError("");
      try {
        const response = await axios.get(url + "bots/data", header);
        setBotData(response.data.sort(sortByDate));
      } catch (e) {
        setBotError("Couldn't retrieve bot data. " + e.response.message);
      }
      setLoading(false);
    }

    getSneakerData();
    getItemData();
    getBotData();
  }, []);

  return (
    <div className={loading ? "loading-cursor" : ""}>
      <div className={"home-page"}>
        <TopMenu />
        <header className={"title"}>Home</header>
        {!authenticated && (
          <h3 id={"home-info"} className={"white-h3"}>
            Login to see your data.
          </h3>
        )}
        {authenticated && sneakerError && (
          <ErrorMessage message={sneakerError} />
        )}
        {authenticated && itemError && <ErrorMessage message={itemError} />}
        {authenticated && botError && <ErrorMessage message={botError} />}
        <div>
          <div className={"charts-container"}>
            <div className={"chart"}>
              <label className={"chart-name"}>Sneaker Overview</label>
              <Chart
                data={sneakerData}
                firstDataKey={"buy"}
                secondDataKey={"sell"}
              />
            </div>
            <div className={"chart"}>
              <label className={"chart-name"}>Item Overview</label>
              <Chart
                data={itemData}
                firstDataKey={"buy"}
                secondDataKey={"sell"}
              />
            </div>
            <div className={"chart"}>
              <label className={"chart-name"}>Bot Overview</label>
              <Chart
                data={botData}
                firstDataKey={"buy"}
                secondDataKey={"sell"}
              />
            </div>
          </div>
        </div>
        )
      </div>
    </div>
  );
}

export default HomePage;
