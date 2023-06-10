import { useState } from "react";

export default function Artists() {
  const [search, setSearch] = useState("");
  const [artists, setArtists] = useState([]);
  const [lyric, setLyric] = useState("");

  async function getArtists() {
    const response = await fetch(
      "https://api.musixmatch.com/ws/1.1/artist.search" +
        "?apikey=f4d5ffcfb46322bbf6020445b3d741ae" +
        "&q_artist=" +
        encodeURIComponent(search) +
        "&page_size=10"
    );
    const data = await response.json();
    const artistsData = data.message.body.artist_list;
    console.log(artistsData);
    setArtists(artistsData); // returns an array of tracks with the search value
  }

  function handleChange(e) {
    console.log(e.target.value);
    setSearch(e.target.value);
  }

  function handleClick() {
    console.log("search artist");
    // search here
    getArtists();
  }
  return (
    <>
      <h1>Artist</h1>
      <h5>
        <i>------ Vote for your favourite artists ------</i>
      </h5>
      <fieldset>
        <label>Search for artist: </label>
        <br></br>
        <input onChange={handleChange}></input>
        <br></br>
        <button onClick={handleClick}>Find artist</button>
      </fieldset>
      {artists.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Artist</th>
              <th>Likes</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {artists.map((artist) => (
              <tr key={artist.artist.artist_id}>
                <td>{artist.artist.artist_name}</td>
                <td>100</td>
                <th>
                  <button>🤍</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
