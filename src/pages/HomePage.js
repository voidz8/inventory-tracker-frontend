import React from "react";
import { useHistory } from "react-router-dom";
import TopMenu from "../components/TopMenu";

function HomePage() {
  const history = useHistory();

  return (
    <div className={"HomePage"}>
      <TopMenu />
    </div>
  );
}
export default HomePage;
