import { useState, useEffect } from "react";
import Airtable from "airtable";

const apiKey = "keytizXwCOakHLb4x";
const baseId = "appKdsyRVyAZYTgt2";
const tableName = "ArtistData";

export default function Artists() {
  const [search, setSearch] = useState("");
  const [artists, setArtists] = useState([]);
  const [myLikes, setMyLikes] = useState([]);

  async function getArtists() {
    const response = await fetch(
      `https://api.musixmatch.com/ws/1.1/artist.search?apikey=f4d5ffcfb46322bbf6020445b3d741ae&q_artist=${encodeURIComponent(
        search
      )}&page_size=10`
    );
    const data = await response.json();
    const artistsData = data.message.body.artist_list;
    console.log("artists: ", artistsData);
    setArtists(artistsData);
  }

  function handleChange(e) {
    console.log(e.target.value);
    setSearch(e.target.value);
  }

  function handleClickSearch() {
    console.log("search artist");
    getArtists();
  }

  const base = new Airtable({
    apiKey: apiKey,
  }).base(baseId);

  useEffect(() => {
    base("ArtistData")
      .select({ view: "Grid view" })
      .eachPage((records, fetchNextPage) => {
        console.log("airtable - ArtistData: ", records);
        fetchNextPage();
      });
  }, []);

  function handleClickLike(e) {
    console.log("+1 like");
    const artistId = e.target.id;
    const artist = artists.find(
      (artist) => artist.artist.artist_id === artistId
    );

    if (artist) {
      setMyLikes([...myLikes, artist]);

      const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;
      const headers = {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      };

      const requestBody = {
        records: [
          {
            fields: {
              ArtistId: artist.artist.artist_id,
              ArtistName: artist.artist.artist_name,
              Likes: artist.artist.artist_rating,
            },
          },
        ],
      };

      fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestBody),
      });
    }
  }

  return (
    <>
      <h1>Artists</h1>
      <h5>
        <i>------ Vote for your favourite artists ------</i>
      </h5>
      <fieldset>
        <label>Search for artist: </label>
        <br />
        <input onChange={handleChange} />
        <br />
        <button onClick={handleClickSearch}>Find artist</button>
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
                <td>{artist.artist.artist_rating}</td>
                <th>
                  <button
                    id={artist.artist.artist_id}
                    onClick={handleClickLike}
                  >
                    🤍
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {myLikes > 0 && (
        <>
          <h1>Liked Artists</h1>
          {myLikes.map((liked) => (
            <div key={liked.artist.artist_id}>{liked.artist.artist_name}</div>
          ))}
        </>
      )}
    </>
  );
}
