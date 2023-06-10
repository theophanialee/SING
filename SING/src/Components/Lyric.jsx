import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Lyric() {
  const [lyric, setLyric] = useState("");
  const { track_id } = useParams();

  console.log(track_id);

  useEffect(() => {
    async function getLyric() {
      console.log(track_id);
      const response = await fetch(
        `https://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=04c537e986c14289a5ed77faf1cefcdf&track_id=${track_id}`
      );
      const data = await response.json();
      const lyricData = data.message.body.lyrics.lyrics_body;
      console.log(lyricData);
      setLyric(lyricData);
    }
    getLyric();
  }, [track_id]);

  return (
    <>
      <h1>Lyrics Page</h1>
      <div>{lyric}</div>
    </>
  );
}
