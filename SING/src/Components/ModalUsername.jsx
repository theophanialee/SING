import { useState } from "react";

export default function ModalUsername({
  setShowModal,
  artistId,
  airtableURL,
  airTable,
  fetchArtistLikesAT,
  artists,
}) {
  const [userInput, setUserInput] = useState("");
  function handleCancel() {
    setShowModal(false); // Close the modal when cancel is clicked
  }

  function handleUsername(e) {
    setUserInput(e.target.value);
  }
  function handleConfirm() {
    console.log("add vote for artistId ", artistId);
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
              ArtistLikes: +1, // Increment artistLikes by 1
              ArtistName: artistName,
              ArtistId: artistId,
              VotedBy: userInput,
            },
          }),
        });
      };
      postArtistData().then(() => {
        fetchArtistLikesAT();
      });
    }
    setShowModal(false); // Close the modal after delete action is completed
  }

  return (
    <>
      <dialog id="modal" open>
        <h2>Please input your username</h2>
        <label>Username: </label>
        <input onChange={handleUsername}></input>
        <div className="modal-actions">
          <button onClick={handleCancel} className="cancel">
            Cancel
          </button>
          <button onClick={handleConfirm} className="confirm">
            Confirm
          </button>
        </div>
      </dialog>
    </>
  );
}
