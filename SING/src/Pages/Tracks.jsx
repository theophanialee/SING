import { useState } from "react";
import { Link } from "react-router-dom";

export default function Lyrics({ musixmatchAPI }) {
  const [search, setSearch] = useState("");
  const [tracks, setTracks] = useState([]);

  async function getTracks() {
    const response = await fetch(
      `https://api.musixmatch.com/ws/1.1/track.search?apikey=${musixmatchAPI}&q_track=${search}&page=1&page_size=100&f_has_lyrics=1&s_artist_rating=desc`
    );
    const data = await response.json();
    const trackData = data.message.body.track_list;
    console.log(trackData);
    setTracks(trackData); // returns an array of tracks with the search value
  }

  function handleChange(e) {
    console.log(e.target.value);
    setSearch(e.target.value);
  }

  function handleClick() {
    console.log("search tracks");
    // search query here
    getTracks();
  }
  return (
    <>
      <h1>Tracks</h1>
      <h5>
        <i>------ Search for lyrics by track name ------</i>
      </h5>
      <fieldset>
        <label>Search track: </label>
        <br></br>
        <input onChange={handleChange}></input>
        <br></br>
        <button onClick={handleClick}>LET'S SING</button>
      </fieldset>
      {tracks.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Track</th>
              <th>Artist</th>
            </tr>
          </thead>
          <tbody>
            {tracks.map((track) => (
              <tr key={track.track.track_id}>
                <td>
                  <Link to={`/tracks/${track.track.track_id}`}>
                    {track.track.track_name}
                  </Link>
                </td>
                <td>{track.track.artist_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
