import { useState, useEffect } from "react";
import Airtable from "airtable";

//airtable data
const apiKey = "keytizXwCOakHLb4x";
const baseId = "appKdsyRVyAZYTgt2";
const tableName = "ArtistData";
const airtableURL = `https://api.airtable.com/v0/${baseId}/${tableName}`;

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

  // const base = new Airtable({
  //   apiKey: apiKey,
  // }).base(baseId);

  // useEffect(() => {
  //   base("ArtistData")
  //     .select({ view: "Grid view" })
  //     .eachPage((records, fetchNextPage) => {
  //       console.log("airtable - ArtistData: ", records);
  //       fetchNextPage();
  //     });
  // }, []);

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
      setMyLikes([...myLikes, artist]);
      console.log(myLikes);
      //toggle

      const headers = {
        Authorization: `Bearer keytizXwCOakHLb4x`,
        "Content-Type": "application/json",
      };
      const postArtistData = async () => {
        await fetch(airtableURL, {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            fields: {
              ArtistLikes: artistLikes,
              ArtistName: artistName,
              ArtistId: artistId,
            },
          }),
        });
      };
      postArtistData();
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
      {/* {myLikes > 0 && (
        <>
          <h1>Liked Artists</h1>
          {myLikes.map((liked) => (
            <div key={liked.artist.artist_id}>{liked.artist.artist_name}</div>
          ))}
        </>
      )} */}
    </>
  );
}
