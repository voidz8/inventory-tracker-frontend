import { createContext, useEffect, useState } from "react";

function SneakerContextProvider(props) {
  const [sold, setSold] = useState(false);

  async function markAsSold() {
    setSold(true);
  }

  useEffect(() => {}, []);
}

export default SneakerContextProvider;
