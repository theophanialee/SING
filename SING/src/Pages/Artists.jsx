import { useState, useEffect } from "react";
import ArtistLikes from "../Components/ArtistLikes";

//airtable data
const apiKey = "keytizXwCOakHLb4x";
const baseId = "appKdsyRVyAZYTgt2";
const tableName = "ArtistData";
const airtableURL = `https://api.airtable.com/v0/${baseId}/${tableName}`;
const header = {
  Authorization: `Bearer ${apiKey}`,
  "Content-Type": "application/json",
};

export default function Artists({ musixmatchAPI }) {
  const [search, setSearch] = useState("");
  const [artists, setArtists] = useState([]);
  const [myLikes, setMyLikes] = useState([]);

  async function fetchArtistLikesAT() {
    const response = await fetch(airtableURL, {
      method: "GET",
      headers: header,
    });
    const jsonData = await response.json();
    setMyLikes(jsonData.records);
    console.log("liked: ", jsonData);
  }

  async function getArtists() {
    const response = await fetch(
      `https://api.musixmatch.com/ws/1.1/artist.search?apikey=${musixmatchAPI}&q_artist=${encodeURIComponent(
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

  //update airtable upon click
  function handleClickLike(e) {
    const artistId = parseInt(e.target.id);
    const artist = artists.find(
      (artist) => artist.artist.artist_id === artistId
    );
    console.log(artist.artist.artist_name);
    console.log("+1 like to", artistId);
    const artistName = artist.artist.artist_name;
    const artistLikes = parseInt(artist.artist.artist_rating);
    console.log("artistId: ", artistId);
    console.log("artistName: ", artistName);
    console.log("artistLikes: ", artistLikes);

    if (artist) {
      const postArtistData = async () => {
        await fetch(airtableURL, {
          method: "POST",
          headers: header,
          body: JSON.stringify({
            fields: {
              ArtistLikes: +1,
              ArtistName: artistName,
              ArtistId: artistId,
            },
          }),
        });
      };
      postArtistData();
      fetchArtistLikesAT();
    }
  }

  useEffect(() => {
    fetchArtistLikesAT();
  }, []);

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
              <th>Vote</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {artists.map((artist, id) => (
              <tr key={id}>
                <td>{artist.artist.artist_name}</td>
                <td>
                  <button
                    id={artist.artist.artist_id}
                    onClick={handleClickLike}
                  >
                    ⬆
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <ArtistLikes myLikes={myLikes} />
    </>
  );
}


