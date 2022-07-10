import { useState, useEffect } from "react";

import CreateRoutine from "../components/CreateRoutine";
import DatabaseMessage from "../components/DatabaseMessage";
import { getMyPublicRoutines, getActivitiesRequest, getMe } from "../api";
import DisplayMyRoutines from "../components/DisplayMyRoutines";
import EditRoutine from "../components/EditRoutine";
import EditRoutineActivity from "../components/EditRoutineActivity";

const MyRoutines = ({
  token,
  userData,
  setUserData,
  useModal,
  setUseModal,
  activitiesData,
  setActivitiesData,
  username,
}) => {
  useEffect(() => {
    const getUserData = async () => {
      const user = await getMe(token);
      setUserData(user);
    };
    const getMyRoutinesHandler = async () => {
      const data = await getMyPublicRoutines(username);
      console.log("Result of user's routines get request (MyRoutines): ", data);
      setMyRoutines(data);
    };
    const fetchActivitiesHandler = async () => {
      const data = await getActivitiesRequest();
      console.log("Result of activities data request (MyRoutines): ", data);
      setActivitiesData(data);
    };
    getUserData();
    getMyRoutinesHandler();
    fetchActivitiesHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [myRoutines, setMyRoutines] = useState([]);
  const [dbMessage, setDbMessage] = useState("");
  const [createRoutine, setCreateRoutine] = useState(false);
  const [editRoutine, setEditRoutine] = useState(false);
  const [editRoutineActivity, setEditRoutineActivity] = useState(false);
  const [currentRoutineData, setCurrentRoutineData] = useState([]);
  const [currentRoutineActivityData, setCurrentRoutineActivityData] = useState(
    []
  );
  const clickHandler = (e) => {
    e.preventDefault();
    setUseModal(true);
    setCreateRoutine(true);
  };
  return (
    <>
      <main>
        <h2>My Routines</h2>
        <section>
          <div>
            <form>
              <label>Create a new routine:</label>
              <button onClick={clickHandler} className="primary">
                New Routine
              </button>
            </form>
          </div>
          {createRoutine && useModal && (
            <CreateRoutine
              token={token}
              userData={userData}
              setUseModal={setUseModal}
              setDbMessage={setDbMessage}
              setMyRoutines={setMyRoutines}
              setCreateRoutine={setCreateRoutine}
            />
          )}
          {dbMessage && useModal && (
            <DatabaseMessage
              dbMessage={dbMessage}
              setDbMessage={setDbMessage}
              setUseModal={setUseModal}
              setCreateRoutine={setCreateRoutine}
            />
          )}
          {editRoutine && (
            <EditRoutine
              setEditRoutine={setEditRoutine}
              routineData={currentRoutineData}
              token={token}
              setMyRoutines={setMyRoutines}
            />
          )}
          {editRoutineActivity && (
            <EditRoutineActivity
              setEditRoutineActivity={setEditRoutineActivity}
              routineActivityData={currentRoutineActivityData}
              token={token}
              setMyRoutines={setMyRoutines}
              userData={userData}
            />
          )}
        </section>
        <section>
          <h3>{`${userData.username}'s Routines:`}</h3>
          <DisplayMyRoutines
            token={token}
            userData={userData}
            myRoutines={myRoutines}
            useModal={useModal}
            setUseModal={setUseModal}
            setMyRoutines={setMyRoutines}
            activitiesData={activitiesData}
            setDbMessage={setDbMessage}
            setEditRoutine={setEditRoutine}
            setEditRoutineActivity={setEditRoutineActivity}
            setCurrentRoutineData={setCurrentRoutineData}
            setCurrentRoutineActivityData={setCurrentRoutineActivityData}
          />
        </section>
      </main>
    </>
  );
};

export default MyRoutines;
