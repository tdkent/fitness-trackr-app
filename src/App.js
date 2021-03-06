import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Routines from "./routes/Routines";
import MyRoutines from "./routes/MyRoutines";
import Activities from "./routes/Activities";
import Auth from "./routes/Auth";
import Unknown from "./routes/Unknown";
import Nav from "./components/Nav";
import "./App.css";

function App() {
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [username, setUsername] = useState(window.localStorage.getItem("username"));
  const [userData, setUserData] = useState({});
  const [routinesData, setRoutinesData] = useState([]);
  const [activitiesData, setActivitiesData] = useState([]);
  const [useModal, setUseModal] = useState(false);

  return (
    <>
    <div id="container">
    <Routes>
      <Route path="/" element={<Nav token={token} setToken={setToken} />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/routines"
          element={
            <Routines
              setRoutinesData={setRoutinesData}
              routinesData={routinesData}
            />
          }
        />
        <Route
          path="/my-routines"
          element={
            <MyRoutines
              token={token}
              userData={userData}
              setUserData={setUserData}
              useModal={useModal}
              setUseModal={setUseModal}
              activitiesData={activitiesData}
              setActivitiesData={setActivitiesData}
              username={username}
            />
          }
        />
        <Route
          path="/activities"
          element={
            <Activities
              token={token}
              activitiesData={activitiesData}
              setActivitiesData={setActivitiesData}
              useModal={useModal}
              setUseModal={setUseModal}
            />
          }
        />
        <Route
          path="/auth"
          element={
            <Auth
              setToken={setToken}
              setUsersName={setUsername}
              setUserData={setUserData}
              useModal={useModal}
              setUseModal={setUseModal}
            />
          }
        />
        <Route path="*" element={<Unknown />} />
      </Route>
    </Routes>
    </div>
    <footer>Copyright &copy; 2022 Tim Kent</footer>
    </>
  );
}

export default App;
