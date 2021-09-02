import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { optionChart } from "../util/chartConfig";
import "chartjs-adapter-moment";
const HistoryPage = ({ data }) => {
  const chartRef = useRef();

  const { day, week, year, detail } = data;

  const [timeFormat, setTimeFormat] = useState("24h");

  const determinseTimeFomrat = () => {
    switch (timeFormat) {
      case "24h":
        return day;
      case "7d":
        return week;
      case "1y":
        return year;
      default:
        return day;
    }
  };

  useEffect(() => {
    let chartInstance = null;
    if (chartRef && chartRef.current && detail) {
      chartInstance = new Chart(chartRef.current, {
        type: "line",
        data: {
          datasets: [
            {
              label: `${detail.name} price`,
              //label: `prices`,
              data: determinseTimeFomrat(),
              backgroundColor: "rgba(174,305,194,0.5)",
              borderColor: "rgba(174,305,194,0.4)",
              borderWidth: 1,
              fill: true,
              pointRadius: 0,
            },
          ],
        },
        options: { ...optionChart },
      });
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [timeFormat]);

  const renderPrice = () => {
    if (detail) {
      const pclassName =
        (detail.price_change_24h < 0
          ? "text-danger my-0"
          : "text-success my-0") + " fw-bolder";
      return (
        <>
          <p className="my-0">{detail.current_price.toFixed(2)}$</p>
          <p className={pclassName}>
            {detail.price_change_percentage_24h.toFixed(2)}
          </p>
        </>
      );
    }
  };

  return (
    <div className="bg-white border mt-2 rounded p-3">
      <div>{renderPrice()}</div>
      <div>
        <canvas ref={chartRef} id="myChart" width={250} height={250}></canvas>
      </div>
      <div className="chart-button mt-1">
        <div
          className="btn btn-outline-secondary btn-sm"
          onClick={() => {
            setTimeFormat("24h");
          }}
        >
          24h
        </div>
        <div
          className="btn btn-outline-secondary btn-sm mx-1"
          onClick={() => {
            setTimeFormat("7d");
          }}
        >
          7d
        </div>
        <div
          className="btn btn-outline-secondary btn-sm"
          onClick={() => {
            setTimeFormat("1y");
          }}
        >
          1y
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
