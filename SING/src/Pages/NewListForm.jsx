import { useState, useEffect } from "react";
import AddTrackSearch from "../Components/AddTrackSearch";

const airtableURL = `https://api.airtable.com/v0/appKdsyRVyAZYTgt2/MyLists`;

export default function NewListForm({ airTable, musixmatchAPI }) {
  const [newList, setNewList] = useState({ ListName: "", TracksIdsArr: "" });
  const [addTrack, setAddTrack] = useState([]);

  function handleNameInput(e) {
    setNewList({ ...newList, ListName: e.target.value });
  }

  useEffect(() => {
    const addTrackString = addTrack.join(",");
    setNewList({ ...newList, TracksIdsArr: addTrackString });
  }, [addTrack]);

  function handlePost() {
    console.log("track id data", newList.TracksIdsArr);

    async function createList(payload) {
      await fetch(airtableURL, {
        method: "POST",
        headers: airTable.header,
        body: JSON.stringify({ fields: payload }),
      });
    }
    createList(newList);
  }

  function handleAddTrackClick(e) {
    const newTrackId = parseInt(e.target.id);
    setAddTrack([...addTrack, newTrackId]);
  }

  return (
    <>
      <h2>Create a new list</h2>
      <fieldset>
        <label>List Name: </label>
        <input onChange={handleNameInput}></input>
        <br></br>
        <AddTrackSearch
          musixmatchAPI={musixmatchAPI}
          handleAddTrackClick={handleAddTrackClick}
        />
        <br></br>
        <button onClick={handlePost}>Create!</button>
      </fieldset>
    </>
  );
}
