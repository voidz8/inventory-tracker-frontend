import { createContext, useEffect, useState } from "react";

export const sneakerContext = createContext({});

function SneakerContextProvider(props) {
  const [saleMenuOpen, setSaleMenuOpen] = useState(false);
  const [addSneakerForm, setAddSneakerForm] = useState(false);

  const data = {
    saleMenuOpen,
    setSaleMenuOpen,
    addSneakerForm,
    setAddSneakerForm,
  };
  return (
    <sneakerContext.Provider value={data}>
      {props.children}
    </sneakerContext.Provider>
  );
}

export default SneakerContextProvider;
