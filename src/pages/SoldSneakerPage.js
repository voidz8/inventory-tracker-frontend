import React, { useEffect, useState } from "react";
import TopMenu from "../components/TopMenu";
import axios from "axios";
import SneakerItem from "../components/SneakerItem";

function SoldSneakerPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sneakers, setSneakers] = useState([]);

  useEffect(() => {
    setLoading(true);

    async function getSoldSneakerData() {
      try {
        const response = await axios.get(
          "http://localhost:8080/sneakers/sold",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSneakers(response.data);
        console.log(response.data);
      } catch (e) {
        console.error("Couldn't load page: " + e);
        setError(e);
      }

      async function getSneakerImages(sneakers) {
        for (const sneaker of sneakers) {
          try {
            const images = await axios.get(
              "http://localhost:8080/sneakers/image",
              { params: { sneaker: sneaker } }
            );
          } catch (e) {}
        }
      }
    }

    getSoldSneakerData();
    setLoading(false);
    setError("");
  }, []);

  return (
    <div>
      <TopMenu />
      <div className={"items"}>
        {sneakers.map((sneaker) => {
          return (
            <SneakerItem
              name={sneaker.name}
              date={sneaker.dateBought}
              price={sneaker.priceBought}
              size={sneaker.sneakerSize}
              dateSold={sneaker.dateSold}
              priceSold={sneaker.salePrice}
              sell={false}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SoldSneakerPage;
