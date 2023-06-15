import { json, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
// import EditTitle from "./EditTitle";

export default function OneList({ airTable, musixmatchAPI }) {
  const { record_id } = useParams();
  const airtableURL = `https://api.airtable.com/v0/appKdsyRVyAZYTgt2/MyLists/${record_id}`;
  console.log("recordID", record_id);
  const [oneList, setOneList] = useState({});
  const [trackIdsArr, setTrackIdsArr] = useState([]);
  const [listName, setListName] = useState("");
  const [editMode, setEditMode] = useState();
  const [newInput, setNewInput] = useState(listName);

  async function fetchOneListRecordAT() {
    const response = await fetch(airtableURL, {
      method: "GET",
      headers: airTable.header,
    });
    const jsonData = await response.json();
    setOneList(jsonData);
    console.log("one list: ", oneList);
    setTrackIdsArr(jsonData.fields.TracksIdsArr.split(",").map(Number));
    setListName(jsonData.fields.ListName);
  }

  useEffect(() => {
    fetchOneListRecordAT();
  }, []);

  useEffect(() => {
    if (trackIdsArr.length > 0) {
      console.log("track ids array: ", trackIdsArr);
      Promise.all([getLyrics(), getTracks()]).then(() => {
        setLoading(false);
      });
    }
  }, [trackIdsArr]);

  const [lyrics, setLyrics] = useState([]);
  const [tracks, setTracks] = useState({});
  const [loading, setLoading] = useState(true);

  async function getLyrics() {
    const lyricsDataArr = [];
    for (const trackId of trackIdsArr) {
      const response = await fetch(
        `https://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=${musixmatchAPI}&track_id=${trackId}`
      );
      const data = await response.json();
      const lyricData = data.message.body.lyrics.lyrics_body;

      lyricsDataArr.push(lyricData);
    }
    setLyrics(lyricsDataArr);
    console.log("lyrcs data: ", lyrics);
  }

  async function getTracks() {
    const tracksDataArr = [];
    for (const trackId of trackIdsArr) {
      const response = await fetch(
        `https://api.musixmatch.com/ws/1.1/track.get?apikey=${musixmatchAPI}&track_id=${trackId}`
      );
      const data = await response.json();
      const trackData = data.message.body.track;

      tracksDataArr.push(trackData);
    }
    setTracks(tracksDataArr);
    console.log("tracks data: ", tracks);
  }

  function handleEditClick() {
    setEditMode(true);
  }

  function handleChange(e) {
    setNewInput(e.target.value);
    console.log(e.target.value);
  }

  function handleSave() {
    setEditMode(false);
    handlePatchAT();
    console.log(newInput);
  }

  async function handlePatchAT() {
    await fetch(airtableURL, {
      method: "PATCH",
      headers: airTable.header,
      body: JSON.stringify({ fields: { ListName: newInput } }),
    });
      setListName(newInput);
    fetchOneListRecordAT();
  }

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
    <div className="oneListPage">
      {oneList.fields && (
        <>
          <h1>* ༘˚·⋆ {oneList.fields.ListName} ⋆·˚ ༘ *</h1>
          {editMode ? (
            <div>
              <input type="text" value={newInput} onChange={handleChange} />
              <button onClick={handleSave}>Save</button>
            </div>
          ) : (
            <button onClick={handleEditClick}>Edit</button>
          )}
          <div>
            {lyrics.map((lyric, id) => (
              <div key={id} className="one song">
                <h2>Track: {tracks[id].track_name}</h2>
                <div className="trackDetails">
                  <div>Artist: {tracks[id].artist_name}</div>
                  <div>Album: {tracks[id].album_name}</div>
                </div>
                <br></br>

                <div className="lyric">
                  {" "}
                  {lyric.split("\n").map((line, index) => (
                    <div key={index}>
                      {line
                        .replace(
                          "******* This Lyrics is NOT for Commercial use *******",
                          ""
                        )
                        .replace("(1409623484506)", "")}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* Render other data here */}
        </>
      )}
    </div>
  );
}
