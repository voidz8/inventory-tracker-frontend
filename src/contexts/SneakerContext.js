import { createContext, useState } from "react";

export const sneakerContext = createContext({});

function SneakerContextProvider(props) {
  const [saleMenuOpen, setSaleMenuOpen] = useState(false);
  const [sneakerFormOpen, setSneakerFormOpen] = useState(false);
  const [sneakerEditFormOpen, setSneakerEditFormOpen] = useState(false);
  const [deleteConf, setDeleteConf] = useState(false);
  const [sneaker, setSneaker] = useState({
    sneakerId: null,
    sneakerName: "",
    size: null,
    priceBought: null,
    pid: null,
  });
  const [sneakerError, setSneakerError] = useState("");

  const isFormOpen = () => {
    return !!(
      sneakerFormOpen ||
      sneakerEditFormOpen ||
      saleMenuOpen ||
      deleteConf
    );
  };

  const data = {
    saleMenuOpen,
    setSaleMenuOpen,
    sneakerFormOpen,
    setSneakerFormOpen,
    sneakerEditFormOpen,
    setSneakerEditFormOpen,
    sneaker,
    setSneaker,
    deleteConf,
    setDeleteConf,
    isFormOpen,
    sneakerError,
    setSneakerError,
  };
  return (
    <sneakerContext.Provider value={data}>
      {props.children}
    </sneakerContext.Provider>
  );
}

export default SneakerContextProvider;
