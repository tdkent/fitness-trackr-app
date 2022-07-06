import { useEffect } from "react";

import { getActivitiesRequest } from "../api";

const Activities = ({ activitiesData, setActivitiesData }) => {
  useEffect(() => {
    const fetchActivitiesHandler = async () => {
      const data = await getActivitiesRequest();
      console.log("Result of activities data request: ", data);
      setActivitiesData(data);
    };
    fetchActivitiesHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <main>
      <h2>Activities</h2>
      <section>
        {
          activitiesData.map(activity => {
            return (
              <div key={activity.id}>
                <h3>{activity.name}</h3>
                <p>{activity.description}</p>
              </div>
            )
          })
        }
      </section>
    </main>
  );
};

export default Activities;
