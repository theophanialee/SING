import React, { useState, useEffect } from "react";

function Chart() {
  const [chart, setChart] = useState([]);

  useEffect(() => {
    async function getChart() {
      const response = await fetch("http://localhost:3000/message");
      const chartData = await response.json();
      console.log(chartData);
      setChart(chartData.body.track_list);
    }
    getChart();
  }, []);

  console.log("chart: ", chart);
  return (
    <>
      <h1>SG TOP 100</h1>
      {chart.map((item, id) => (
        <div key={id}>
          {id + 1}. {item.track.track_name}
        </div>
      ))}
    </>
  );
}

export default Chart;
