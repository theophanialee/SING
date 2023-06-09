import React, { useState, useEffect } from "react";

function Chart() {
  const [chart, setChart] = useState([]);

  useEffect(() => {
    async function getChart() {
      const response = await fetch(
        "https://api.musixmatch.com/ws/1.1/chart.tracks.get?apikey=296e4de1657cf99dd0e0883d536a592d&page=1&page_size=100&country=sg"
      );
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
