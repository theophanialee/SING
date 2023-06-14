import { useState } from "react";
import { Link } from "react-router-dom";
import SearchTracks from "../Components/SearchTracks";

export default function Tracks({ musixmatchAPI }) {
  return (
    <>
      <h1>Tracks</h1>
      <h5>
        <i>------ Search for lyrics by track name ------</i>
      </h5>
      <SearchTracks musixmatchAPI={musixmatchAPI} />
    </>
  );
}
