import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Lyric({ musixmatchAPI }) {
  const [lyric, setLyric] = useState("");
  const [track, setTrack] = useState({});
  const { track_id } = useParams();

  useEffect(() => {
    async function getLyric() {
      const response = await fetch(
        `https://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=${musixmatchAPI}&track_id=${track_id}`
      );
      const data = await response.json();
      const lyricData = data.message.body.lyrics.lyrics_body;
      console.log(lyricData);
      setLyric(lyricData);
    }

    async function getTrack() {
      console.log(track_id);
      const response = await fetch(
        `https://api.musixmatch.com/ws/1.1/track.get?apikey=${musixmatchAPI}&track_id=${track_id}`
      );
      const data = await response.json();
      const trackData = data.message.body.track;
      console.log(trackData);
      setTrack(trackData);
    }

    getLyric();
    getTrack();
  }, [track_id]);

  function handleLike() {
    console.log("+1 like");
  }

  return (
    <>
      <div className="lyricPage">
        <h1>Track: {track.track_name}</h1>
        <div>Artist: {track.artist_name}</div>
        <div>From album: {track.album_name}</div>
        <div>
          {track.num_favourite} <button onClick={handleLike}>🤍</button>
        </div>
        <h5 className="lyric">
          {lyric.split("\n").map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </h5>
      </div>
    </>
  );
}
