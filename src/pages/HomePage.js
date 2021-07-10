import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import TopMenu from "../components/TopMenu";
import authContext from "../contexts/AuthContext";
import {
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import axios from "axios";

function HomePage() {
  const authData = useContext(authContext);
  const history = useHistory();
  const [sneakerData, setSneakerData] = useState();

  useEffect(async () => {
    const response = await axios.get("http://localhost:8080/sneakers/data", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setSneakerData(response.data);
    console.log(response.data);
  }, []);

  return (
    <div className={"HomePage"}>
      <TopMenu />
      <ResponsiveContainer>
        <AreaChart data={sneakerData}>
          <XAxis dataKey={"date"} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area dataKey={"priceBought"} />
          <Area dataKey={"priceSold"} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default HomePage;
