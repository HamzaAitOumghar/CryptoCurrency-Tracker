import React from "react";
import { createContext, useState } from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = (props) => {
  const [watchList, setWatchList] = useState([
    "bitcoin",
    "ethereum",
    "ripple",
    "solana",
    "dogecoin",
  ]);

  const deleteCoin = (id) => {
    // watchList.filter(r -> r===id);
    setWatchList(
      watchList.filter((elt) => {
        return elt !== id;
      })
    );
  };

  return (
    <WatchListContext.Provider value={{ watchList, deleteCoin }}>
      {props.children}
    </WatchListContext.Provider>
  );
};
