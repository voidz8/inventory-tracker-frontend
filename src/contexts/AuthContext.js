import { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export const authContext = createContext({});

function AuthContextProvider(props) {
  const history = useHistory();
  const url = "http://localhost:8080/";
  const [authState, setAuthState] = useState({
    user: null,
    userId: null,
    email: null,
    status: "pending",
  });
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      login(token);
    } else {
      setAuthState({ user: null, status: "done" });
      history.push("/login");
    }
  }, [authenticated]);

  async function login(token) {
    localStorage.setItem("token", token);
    const response = await axios.get(url + "account-info", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setAuthState({
      user: response.data.username,
      userId: response.data.id,
      email: response.data.email,
      status: "done",
    });
    setAuthenticated(true);
  }

  function logout() {
    localStorage.removeItem("token");
    setAuthState({ user: null, userId: null, email: null, status: "done" });
    history.push("/login");
    setAuthenticated(false);
  }

  const data = {
    authState,
    setAuthState,
    login,
    logout,
    url,
    authenticated,
  };
  return (
    <authContext.Provider value={data}>{props.children}</authContext.Provider>
  );
}

export default AuthContextProvider;
