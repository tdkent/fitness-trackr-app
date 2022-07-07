import { useState, useEffect } from "react";

import { getActivitiesRequest } from "../api";
import CreateActivity from "../components/CreateActivity";
import DatabaseMessage from "../components/DatabaseMessage";

const Activities = ({
  token,
  useModal,
  setUseModal,
  activitiesData,
  setActivitiesData,
}) => {
  useEffect(() => {
    const fetchActivitiesHandler = async () => {
      const data = await getActivitiesRequest();
      console.log("Result of activities data request: ", data);
      setActivitiesData(data);
    };
    fetchActivitiesHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [dbMessage, setDbMessage] = useState("");
  const clickHandler = (e) => {
    e.preventDefault();
    setUseModal(true);
  };
  return (
    <main>
      <h2>Activities</h2>
      <section>
        {token && (
          <div>
            <form>
              <label>Create a new activity:</label>
              <button onClick={clickHandler}>New Activity</button>
            </form>
          </div>
        )}
        {token && useModal && (
          <CreateActivity
            token={token}
            useModal={useModal}
            setUseModal={setUseModal}
            setActivitiesData={setActivitiesData}
            setDbMessage={setDbMessage}
          />
        )}
        {dbMessage && useModal && (
          <DatabaseMessage dbMessage={dbMessage} setDbMessage={setDbMessage} setUseModal={setUseModal} />
        )}
        {activitiesData.map((activity) => {
          return (
            <div key={activity.id}>
              <h3>{activity.name}</h3>
              <p>{activity.description}</p>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default Activities;
