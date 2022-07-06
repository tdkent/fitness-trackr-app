import { useEffect } from "react";
import { getPublicRoutinesRequest } from "../api";
const Routines = ({ setRoutinesData, routinesData }) => {
  useEffect(() => {
    const getRoutinesHandler = async () => {
      const data = await getPublicRoutinesRequest();
      console.log(
        "/routines - Data returned from fetching all public routines: ",
        data
      );
      setRoutinesData(data);
    };
    getRoutinesHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <main>
      <h2>Routines</h2>
      <p>List of all publicly available routines.</p>
      <section>
        {routinesData.map((routine) => {
          return (
            <div key={routine.id}>
              <header>
                <h3>{routine.name}</h3>
                <p>{routine.goal}</p>
              </header>
              <div>
                <p>Activities:</p>
                {routine.activities.length ? (
                  routine.activities.map((activity) => {
                    return (
                      <div key={activity.id}>
                        <h4>{activity.name}</h4>
                        <p>Count: {activity.count}</p>
                        <p>Duration: {activity.duration}</p>
                      </div>
                    );
                  })
                ) : (
                  <p>No activities available for this routine.</p>
                )}
              </div>
              <p>Routine created by: {routine.creatorName}</p>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default Routines;
