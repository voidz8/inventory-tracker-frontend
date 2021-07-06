import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export const authContext = createContext({});

function AuthContextProvider(props) {
  const history = useHistory();
  const url = "http://localhost:8080/";
  const [authState, setAuthState] = useState({ user: null, status: "pending" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      login(token);
    } else {
      setAuthState({ user: null, status: "done" });
      history.push("/login");
    }
  }, []);

  async function getUserInfo(token) {
    try {
      const response = await axios.get(url + "/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (e) {
      console.error(e);
    }
  }

  function login(token) {
    localStorage.setItem("token", token);
  }

  function logout() {
    localStorage.removeItem("token");
    setAuthState({ user: null, status: "done" });
    history.push("/login");
  }

  const data = { authState: authState, login: login, logout: logout };
  return (
    <authContext.Provider value={data}>{props.children}</authContext.Provider>
  );
}

export default AuthContextProvider;
