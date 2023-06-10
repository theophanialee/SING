import { Route, Routes } from "react-router-dom";
import Chart from "./Pages/Chart";
import NavBar from "./Components/NavBar";
import "./App.css";
import Artists from "./Pages/Artists";
import Tracks from "./Pages/Tracks";
import MyLists from "./Pages/MyLists";
import Lyric from "./Components/Lyric";

export default function App() {
  return (
    <>
      <header className="apphHeader">SING!</header>
      <NavBar />
      <main className="content">
        <Routes>
          <Route path="/chart" element={<Chart />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/tracks" element={<Tracks />} />
          <Route path="/tracks/:track_id" element={<Lyric />} />

          <Route path="/mylists" element={<MyLists />} />
        </Routes>
      </main>
    </>
  );
}
