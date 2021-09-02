import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinData from "../components/CoinData";
import HistoryPage from "../components/HistoryPage";
import axiosCreator from "../api/apiGecko";

const CoinDetailPage = () => {
  const { id } = useParams();
  const [coinData, setCoinData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const formatData = (data) => {
    return data.map((el) => {
      return {
        x: el[0],
        y: el[1].toFixed(2),
      };
    });
  };

  const fetchData = async () => {
    setIsLoading(true);
    const [respDay, respWeek, respYear, detail] = await Promise.all([
      axiosCreator.get(`coins/${id}/market_chart`, {
        params: {
          vs_currency: "usd",
          days: "1",
        },
      }),
      axiosCreator.get(`coins/${id}/market_chart`, {
        params: {
          vs_currency: "usd",
          days: "7",
        },
      }),
      axiosCreator.get(`coins/${id}/market_chart`, {
        params: {
          vs_currency: "usd",
          days: "356",
        },
      }),
      axiosCreator.get("/coins/markets", {
        params: {
          vs_currency: "usd",
          ids: id,
        },
      }),
    ]);

    setCoinData({
      day: formatData(respDay.data.prices),
      week: formatData(respWeek.data.prices),
      year: formatData(respYear.data.prices),
      detail: detail.data[0],
    });
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  const renderDate = () => {
    if (isLoading) {
      return <div>Loading....</div>;
    }
    return (
      <div className="coinlist">
        <HistoryPage data={coinData} />
        <CoinData />
      </div>
    );
  };

  return renderDate();
};

export default CoinDetailPage;
