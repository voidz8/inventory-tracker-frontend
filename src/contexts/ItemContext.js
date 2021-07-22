import { createContext, useState } from "react";

export const itemContext = createContext({});

function ItemContextProvider(props) {
  const [itemError, setItemError] = useState(false);
  const [itemEditFormOpen, setItemEditFormOpen] = useState(false);
  const [itemFormOpen, setItemFormOpen] = useState(false);
  const [item, setItem] = useState({
    itemId: null,
    itemName: "",
    size: null,
    priceBought: null,
  });

  const isItemFormOpen = () => {
    return !!(itemFormOpen || itemEditFormOpen);
  };

  const data = {
    itemError,
    setItemError,
    itemEditFormOpen,
    setItemEditFormOpen,
    isItemFormOpen,
    itemFormOpen,
    setItemFormOpen,
    item,
    setItem,
  };
  return (
    <itemContext.Provider value={data}>{props.children}</itemContext.Provider>
  );
}

export default ItemContextProvider;
