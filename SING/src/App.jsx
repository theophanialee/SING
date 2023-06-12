import { Route, Routes } from "react-router-dom";
import Chart from "./Pages/Chart";
import NavBar from "./Components/NavBar";
import "./App.css";
import Artists from "./Pages/Artists";
import Tracks from "./Pages/Tracks";
import MyLists from "./Pages/MyLists";
import Lyric from "./Components/Lyric";

export default function App() {
  const musixmatchAPI = "296e4de1657cf99dd0e0883d536a592d";
  return (
    <>
      <header className="apphHeader">SING!</header>
      <NavBar />
      <main className="content">
        <Routes>
          <Route
            path="/chart"
            element={<Chart musixmatchAPI={musixmatchAPI} />}
          />
          <Route
            path="/artists"
            element={<Artists musixmatchAPI={musixmatchAPI} />}
          />
          <Route
            path="/tracks"
            element={<Tracks musixmatchAPI={musixmatchAPI} />}
          />
          <Route
            path="/tracks/:track_id"
            element={<Lyric musixmatchAPI={musixmatchAPI} />}
          />
          <Route
            path="/mylists"
            element={<MyLists musixmatchAPI={musixmatchAPI} />}
          />
        </Routes>
      </main>
    </>
  );
}
