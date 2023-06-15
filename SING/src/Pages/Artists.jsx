import { useState, useEffect } from "react";
import ArtistVotes from "../Components/ArtistVotes";
import ModalUsername from "../Components/ModalUsername";

const airtableURL = `https://api.airtable.com/v0/appKdsyRVyAZYTgt2/ArtistData`;

export default function Artists({ musixmatchAPI, airTable }) {
  const [search, setSearch] = useState("");
  const [artists, setArtists] = useState([]);
  const [votes, setMyVotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [artistId, setArtistId] = useState(0);

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

  function handleClickLike(e) {
    setShowModal(true);
    const artistId = parseInt(e.target.id);
    setArtistId(artistId);
  }

  useEffect(() => {
    fetchArtistLikesAT();
  }, []);

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
      {showModal && (
        <ModalUsername
          setShowModal={setShowModal}
          artistId={artistId}
          artists={artists}
          airtableURL={airtableURL}
          airTable={airTable}
          fetchArtistLikesAT={fetchArtistLikesAT}
        />
      )}
    </>
  );
}
