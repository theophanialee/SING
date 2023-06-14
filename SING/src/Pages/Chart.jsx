import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

export default function Chart({ musixmatchAPI }) {
  const [chart, setChart] = useState([]);
  const [imgArr, setImgArr] = useState([]);
  const [loading, setLoading] = useState(true);

  //fetch chart data
  useEffect(() => {
    async function getChart() {
      const response = await fetch(
        `https://api.musixmatch.com/ws/1.1/chart.tracks.get?apikey=${musixmatchAPI}&page=1&page_size=10&country=sg`
      );
      const data = await response.json();
      const chartData = data.message.body.track_list;
      setChart(chartData);
    }
    getChart();
  }, []);

  //fetch images upon change in chart
  useEffect(() => {
    async function loadCoverArt(albumNames, artistNames) {
      const newImgArr = [];
      for (let i = 0; i < chart.length; i++) {
        try {
          const imgData = await getCoverArt(albumNames[i], artistNames[i]);
          newImgArr.push(imgData);
        } catch (error) {
          console.error("Error fetching cover art:", error);
          newImgArr.push("");
        }
      }
      setImgArr(newImgArr);
      setLoading(false); // Mark images as loaded
    }
    if (chart.length > 0) {
      loadCoverArt(
        chart.map((song) => song.track.album_name),
        chart.map((song) => song.track.artist_name)
      );
    }
  }, [chart]);

  //using a promise so we can fetch multiple images at a time instead of waiting for one after another
  console.log(imgArr);
  function getCoverArt(albumName, artistName) {
    return new Promise((resolve, reject) => {
      fetch(
        `http://ws.audioscrobbler.com/2.0/?api_key=cf5619506ab5a43e5fc9335c86a5ca72&format=json&method=album.getInfo&album=${albumName}&artist=${artistName}`
      )
        .then((response) => response.json())
        .then((data) => {
          const imgData = data.album.image[1]["#text"];
          resolve(imgData);
        })
        .catch((error) => {
          reject(new Error("Error fetching cover art: " + error));
        });
    });
  }

  //while waiting for all data to render
  if (loading) {
    return (
      <>
        <CircularProgress color="secondary" />
        <CircularProgress color="success" />
        <CircularProgress color="inherit" />
      </>
    );
  }
  return (
    <>
      <h1>SG TOP 10</h1>
      <table>
        <caption></caption>
        <thead>
          <tr>
            <th>No.</th>
            <th></th>
            <th>Track</th>
            <th>Artist</th>
          </tr>
        </thead>
        <tbody>
          {chart.map((song, id) => (
            <tr key={id}>
              <th>{id + 1}</th>
              <th>
                {imgArr[id] !== "" ? <img src={imgArr[id]} /> : <span>🏞</span>}
              </th>

              <th>
                <Link to={`/chart/${song.track.track_id}`}>
                  {song.track.track_name}
                </Link>
              </th>
              <th>{song.track.artist_name}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
 
