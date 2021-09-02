import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { optionChart } from "../util/chartConfig";
import "chartjs-adapter-moment";
const HistoryPage = ({ data }) => {
  const chartRef = useRef();

  const { day, week, year, detail } = data;

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
              data: day,
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
  }, []);

  return (
    <div className="bg-white border mt-2 rounded p-3">
      <div></div>
      <div>
        <canvas ref={chartRef} id="myChart" width={250} height={250}></canvas>
      </div>
    </div>
  );
};

export default HistoryPage;
