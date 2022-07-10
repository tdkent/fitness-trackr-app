import { useEffect } from "react";
import { getPublicRoutinesRequest } from "../api";
import "./Routines.css";
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
      <p>These are the current publicly-available routines.</p>
      <section>
        {routinesData.map((routine) => {
          return (
            <div key={routine.id} className="routine-container">
              <header>
                <h3>{routine.name}</h3>
                <p>Goal: {routine.goal}</p>
              </header>
              <div>
                <h4>Related Activities:</h4>
                {routine.activities.length ? (
                  routine.activities.map((activity) => {
                    return (
                      <div key={activity.id} className="related-activity-container">
                        <h5>{activity.name}</h5>
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
