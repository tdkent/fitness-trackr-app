import { useState, useEffect } from "react";

import CreateRoutine from "../components/CreateRoutine";
import { getMyPublicRoutines } from "../api";

const MyRoutines = ({ token, userData, useModal, setUseModal }) => {
  useEffect(() => {
    const getMyRoutinesHandler = async () => {
      const data = await getMyPublicRoutines(userData.username);
      console.log("Result of user's routines get request: ", data);
      setMyRoutines(data);
    };
    getMyRoutinesHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [myRoutines, setMyRoutines] = useState([]);
  const clickHandler = (e) => {
    e.preventDefault();
    setUseModal(true);
  };
  return (
    <main>
      <h2>My Routines</h2>
      <section>
        <div>
          <form>
            <label>Create a new routine:</label>
            <button onClick={clickHandler}>New Routine</button>
          </form>
        </div>
        {useModal && (
          <CreateRoutine
            token={token}
            userData={userData}
            setUseModal={setUseModal}
          />
        )}
      </section>
      <section>
        <h3>{`${userData.username}'s Routines:`}</h3>
        <div>
          {myRoutines.map((routine) => {
            return (
              <div key={routine.id}>
                <h4>{routine.name}</h4>
                <p>{routine.goal}</p>
                {routine.isPublic ? (
                  <p>You have set this Routine to Public.</p>
                ) : (
                  <p>You have set this Routine to Private.</p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default MyRoutines;
