import { useState, useEffect } from "react";
import ArtistVotes from "../Components/ArtistVotes";

const airtableURL = `https://api.airtable.com/v0/appKdsyRVyAZYTgt2/ArtistData`;

export default function Artists({ musixmatchAPI, airTable }) {
  const [search, setSearch] = useState("");
  const [artists, setArtists] = useState([]);
  const [votes, setMyVotes] = useState([]);

  async function fetchArtistLikesAT() {
    const response = await fetch(airtableURL, {
      method: "GET",
      headers: airTable.header,
    });
    const jsonData = await response.json();
    setMyVotes(jsonData.records);
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
          headers: airTable.header,
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

  // fetch the table again to render the Voted list, to transfer to new component
  useEffect(() => {
    fetchArtistLikesAT();
  }, []);

  // // Sort the artists array based on the time added, to transfer to new component
  // const sortedArtistsData = votes.sort((a, b) => {
  //   const timeAddedA = new Date(a.timeAdded).getTime();
  //   const timeAddedB = new Date(b.timeAdded).getTime();
  //   return timeAddedB - timeAddedA;
  // });

  // console.log(sortedArtistsData);

  // setArtists(sortedArtistsData);

  return (
    <>
      <h1>Vote Artists</h1>
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
      <ArtistVotes votes={votes} />
    </>
  );
}


