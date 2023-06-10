import { useState } from "react";

export default function Lyrics() {
  const [search, setSearch] = useState("");

  function handleChange(e) {
    console.log(e.target.value);
    setSearch(e.target.value);
  }

  function handleClick(e) {
    console.log("search lyrics");
    // search here
  }
  return (
    <>
      <h1>Lyrics</h1>
      <label>Search track: </label>
      <br></br>
      <input onChange={handleChange}></input>
      <br></br>
      <button onClick={handleClick}>LET'S SING</button>
    </>
  );
}
