import { useState, useEffect } from "react";

export default function Chart() {
  const [chart, setChart] = useState([]);

  useEffect(() => {
    async function getChart() {
      const response = await fetch(
        "https://api.musixmatch.com/ws/1.1/chart.tracks.get?apikey=04c537e986c14289a5ed77faf1cefcdf&page=1&page_size=50&country=sg"
      );
      const data = await response.json();
      const chartData = data.message.body.track_list;
      console.log(chartData);
      setChart(chartData);
    }
    getChart();
  }, []);

  console.log("chart: ", chart);

  const trackIdArr = chart.map((track) => track.track.track_id);
  console.log(trackIdArr);

  return (
    <>
      <h1>SG TOP 50</h1>
      <table>
        <caption></caption>
        <thead>
          <tr>
            <th>No.</th>
            {/* <th></th> */}
            <th>Track</th>
            <th>Artist</th>
          </tr>
        </thead>
        <tbody>
          {chart.map((item, id) => (
            <tr key={id}>
              <th>{id + 1}</th>
              {/* <th>img</th> */}
              <th>{item.track.track_name}</th>
              <th>{item.track.artist_name}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
