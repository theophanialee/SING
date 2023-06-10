import React, { useState, useEffect } from "react";

export default function Chart() {
  const [chart, setChart] = useState([]);

  useEffect(() => {
    async function getChart() {
      const response = await fetch(
        "https://api.musixmatch.com/ws/1.1/chart.tracks.get?apikey=296e4de1657cf99dd0e0883d536a592d&page=1&page_size=50&country=sg"
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
