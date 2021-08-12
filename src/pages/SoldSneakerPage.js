import React, { useEffect, useState, useContext } from "react";
import TopMenu from "../components/TopMenu";
import axios from "axios";
import Item from "../components/Item";
import { authContext } from "../contexts/AuthContext";
import ErrorMessage from "../components/ErrorMessage";

function SoldSneakerPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [soldSneakers, setSoldSneakers] = useState([]);

  useEffect(() => {
    async function getSoldSneakerData() {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          "http://localhost:8080/sneakers/sold",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSoldSneakers(response.data);
      } catch (e) {
        console.error("Couldn't load page: " + e);
        setError(e);
      }
      setLoading(false);
    }
    getSoldSneakerData();
  }, []);

  return (
    <div className={loading ? "loading-cursor" : ""}>
      <div className={"sneaker-page"}>
        <TopMenu />
        <header className={"title"}>Sneaker Sales</header>
        {error && <ErrorMessage message={error} />}
        <div className={"items"}>
          {soldSneakers.map((sneaker) => {
            let image = `data:${sneaker.image.fileType};base64,${sneaker.image.data}`;
            return (
              <Item
                className={"sneaker-item"}
                image={image}
                name={sneaker.name}
                date={sneaker.dateBought}
                price={sneaker.priceBought}
                size={sneaker.sneakerSize}
                dateSold={sneaker.dateSold}
                priceSold={sneaker.salePrice}
                sell={false}
                variety={"sneaker"}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SoldSneakerPage;
