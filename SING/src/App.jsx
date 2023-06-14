import { Route, Routes } from "react-router-dom";
import Chart from "./Pages/Chart";
import NavBar from "./Components/NavBar";
import "./App.css";
import Artists from "./Pages/Artists";
import Tracks from "./Pages/Tracks";
import MyLists from "./Pages/MyLists";
import Lyric from "./Components/Lyric";
import NewListForm from "./Pages/NewListForm";
import OneList from "./Components/OneList";

export default function App() {
  const musixmatchAPI = "296e4de1657cf99dd0e0883d536a592d";

  const airTable = {
    apiKey: "keytizXwCOakHLb4x",
    baseId: "appKdsyRVyAZYTgt2",
    header: {
      Authorization: `Bearer keytizXwCOakHLb4x`,
      "Content-Type": "application/json",
    },
  };

  return (
    <>
      <header className="apphHeader">SING!</header>
      <NavBar />
      <main className="content">
        <Routes>
          <Route
            path="/"
            element={
              <h1>
                CREATE YOUR MEMORY TODAY WITH <i>SING!</i>
              </h1>
            }
          />
          <Route
            path="/chart"
            element={<Chart musixmatchAPI={musixmatchAPI} />}
          />
          <Route
            path="/artists"
            element={
              <Artists musixmatchAPI={musixmatchAPI} airTable={airTable} />
            }
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
            path="/chart/:track_id"
            element={<Lyric musixmatchAPI={musixmatchAPI} />}
          />
          <Route
            path="/mylists"
            element={
              <MyLists musixmatchAPI={musixmatchAPI} airTable={airTable} />
            }
          />
          <Route
            path="/mylists/addnewlist"
            element={
              <NewListForm airTable={airTable} musixmatchAPI={musixmatchAPI} />
            }
          />
          <Route
            path="/mylists/:id"
            element={
              <OneList airTable={airTable} musixmatchAPI={musixmatchAPI} />
            }
          />
        </Routes>
      </main>
    </>
  );
}
