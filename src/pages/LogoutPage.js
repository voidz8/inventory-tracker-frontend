import React, { useContext, useEffect } from "react";
import { authContext } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import TopMenu from "../components/TopMenu";

function LogoutPage() {
  const history = useHistory();
  const { logout } = useContext(authContext);
  useEffect(() => {
    logout();
  });
  return <TopMenu />;
}
export default LogoutPage;
