import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import TopMenu from "../components/TopMenu";
import authContext from "../contexts/AuthContext";

function HomePage() {
  const authData = useContext(authContext);
  const history = useHistory();

  console.log(authData);
  return (
    <div className={"HomePage"}>
      <TopMenu />
    </div>
  );
}

export default HomePage;
