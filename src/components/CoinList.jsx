import React, { useContext, useEffect, useState } from "react";

import axiosCreator from "../api/apiGecko";
import { WatchListContext } from "../context/watchListContext";
import Coin from "./Coin";

const CoinList = () => {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { watchList, deleteCoin } = useContext(WatchListContext);

  const fetchData = async () => {
    setIsLoading(true);
    const resp = await axiosCreator.get("/coins/markets", {
      params: {
        vs_currency: "usd",
        ids: watchList.join(","),
      },
    });
    setCoins(resp.data);
    setIsLoading(false);
  };
  useEffect(() => {
    if (watchList.length > 0) {
      fetchData();
    } else {
      setCoins([]);
    }
  }, [watchList]);

  const renderCoins = () => {
    if (isLoading) {
      return <div>Loading ...</div>;
    }
    return (
      <ul className="coinlist list-group mt-2">
        {coins.map((c) => {
          return <Coin key={c.id} coin={c} deleteCoin={deleteCoin} />;
        })}
      </ul>
    );
  };

  return <div>{renderCoins()}</div>;
};

export default CoinList;
