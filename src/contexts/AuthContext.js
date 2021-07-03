import { createContext } from "react";

const authContext = createContext({});

function AuthContextProvider({ childeren }) {
  const data = {};
  return <authContext.Provider value={data}>childeren</authContext.Provider>;
}

export default AuthContextProvider;
