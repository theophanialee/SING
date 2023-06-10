import { Route, Routes } from "react-router-dom";
import Chart from "./Pages/Chart";
import NavBar from "./Components/NavBar";
import "./App.css";
import Artists from "./Pages/Artists";
import Lyrics from "./Pages/Lyrics";
import MyLists from "./Pages/MyLists";

export default function App() {
  return (
    <>
      <header className="apphHeader">SING!</header>
      <NavBar />
      <main className="content">
        <Routes>
          <Route path="/chart" element={<Chart />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/lyrics" element={<Lyrics />} />
          <Route path="/mylists" element={<MyLists />} />
        </Routes>
      </main>
    </>
  );
}
