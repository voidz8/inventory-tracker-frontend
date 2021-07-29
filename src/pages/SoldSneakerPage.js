import React, { useEffect, useState } from "react";
import TopMenu from "../components/TopMenu";
import axios from "axios";
import Item from "../components/Item";

function SoldSneakerPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [soldSneakers, setSoldSneakers] = useState([]);

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
        setSoldSneakers(response.data);
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
        {soldSneakers.map((sneaker) => {
          return (
            <Item
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
