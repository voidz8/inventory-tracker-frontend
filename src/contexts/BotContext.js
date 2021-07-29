import { createContext, useState } from "react";

export const botContext = createContext({});

function BotContextProvider(props) {
  const [botError, setBotError] = useState(false);
  const [botEditFormOpen, setBotEditFormOpen] = useState(false);
  const [botFormOpen, setBotFormOpen] = useState(false);
  const [bot, setBot] = useState({
    botId: null,
    botName: "",
    priceBought: null,
  });

  const isBotFormOpen = () => {
    return !!(botFormOpen || botEditFormOpen);
  };

  const data = {
    botError,
    setBotError,
    botEditFormOpen,
    setBotEditFormOpen,
    botFormOpen,
    setBotFormOpen,
    bot,
    setBot,
    isBotFormOpen,
  };
  return (
    <botContext.Provider value={data}>{props.children}</botContext.Provider>
  );
}

export default BotContextProvider;
