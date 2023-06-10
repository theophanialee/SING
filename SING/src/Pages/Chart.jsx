import React, { useState, useEffect } from "react";

export default function Chart() {
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
      <h1>SG TOP 50</h1>
      <table>
        <caption>Chart 50</caption>
        <tr>
          <th>No.</th>
          <th></th>
          <th>Track</th>
          <th>Artist</th>
        </tr>

        {chart.map((item, id) => (
          <tr key={id}>
            <th>{id + 1}</th>
            <th>img</th>
            <th>{item.track.track_name}</th>
            <th>{item.track.artist_name}</th>
          </tr>
        ))}
      </table>
    </>
  );
}
