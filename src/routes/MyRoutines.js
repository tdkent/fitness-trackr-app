import { useState, useEffect } from "react";

import CreateRoutine from "../components/CreateRoutine";
import DatabaseMessage from "../components/DatabaseMessage";
import { getMyPublicRoutines, getActivitiesRequest } from "../api";
import DisplayMyRoutines from "../components/DisplayMyRoutines";
import SuccessMessage from "../components/SuccessMessage";

const MyRoutines = ({
  token,
  userData,
  useModal,
  setUseModal,
  activitiesData,
  setActivitiesData,
}) => {
  useEffect(() => {
    const getMyRoutinesHandler = async () => {
      const data = await getMyPublicRoutines(userData.username);
      console.log("Result of user's routines get request (MyRoutines): ", data);
      setMyRoutines(data);
    };
    const fetchActivitiesHandler = async () => {
      const data = await getActivitiesRequest();
      console.log("Result of activities data request (MyRoutines): ", data);
      setActivitiesData(data);
    };
    getMyRoutinesHandler();
    fetchActivitiesHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [myRoutines, setMyRoutines] = useState([]);
  const [dbMessage, setDbMessage] = useState("");
  const [createRoutine, setCreateRoutine] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const clickHandler = (e) => {
    e.preventDefault();
    setUseModal(true);
    setCreateRoutine(true);
  };
  return (
    <>
    {(useModal && successMessage) && <SuccessMessage setUseModal={setUseModal}/>}
    <main>
      <h2>My Routines</h2>
      <section>
        <div>
          <form>
            <label>Create a new routine:</label>
            <button onClick={clickHandler}>New Routine</button>
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
          setSuccessMessage={setSuccessMessage}
        />
      </section>
    </main>
    </>
  );
};

export default MyRoutines;
