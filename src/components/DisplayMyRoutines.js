import AddActivity from "./AddActivity";
import DeleteButton from "./DeleteButton";
import DeleteActivityButton from "./DeleteActivityButton";
import EditRoutineButton from "./EditRoutineButton";
import EditRoutineActivityButton from "./EditRoutineActivityButton";

const DisplayMyRoutines = ({
  token,
  userData,
  myRoutines,
  setMyRoutines,
  useModal,
  setUseModal,
  activitiesData,
  setDbMessage,
  setEditRoutine,
  setEditRoutineActivity,
  setCurrentRoutineData,
  setCurrentRoutineActivityData,
}) => {
  return (
    <div>
      {myRoutines.map((routine) => {
        return (
          <div key={routine.id} className="routine-container">
            <h3>{routine.name}</h3>
            <p>Goal: {routine.goal}</p>
            <div>
              <header>
                <h4>Related Activities:</h4>
              </header>
              {routine.activities.map((activity) => {
                return (
                  <div key={activity.id} className="related-activity-container">
                    <h5>{activity.name}</h5>
                    <p>Description: {activity.description}</p>
                    <p>Count: {activity.count}</p>
                    <p>Duration: {activity.duration}</p>
                    <form>
                      <EditRoutineActivityButton
                        setCurrentRoutineActivityData={
                          setCurrentRoutineActivityData
                        }
                        activityData={activity}
                        setEditRoutineActivity={setEditRoutineActivity}
                      />
                      <DeleteActivityButton
                        token={token}
                        userData={userData}
                        setMyRoutines={setMyRoutines}
                        routineActivityId={activity.routineActivityId}
                      />
                    </form>
                  </div>
                );
              })}
            </div>
            {routine.isPublic ? (
              <p>Routine Status: Public</p>
            ) : (
              <p>Routine Status: Private</p>
            )}
            <AddActivity
              routineId={routine.id}
              activitiesData={activitiesData}
              useModal={useModal}
              setUseModal={setUseModal}
              userData={userData}
              setMyRoutines={setMyRoutines}
              setDbMessage={setDbMessage}
            />
            <form>
              <EditRoutineButton
                setEditRoutine={setEditRoutine}
                setCurrentRoutineData={setCurrentRoutineData}
                routineData={routine}
              />
              <DeleteButton
                token={token}
                userData={userData}
                routineId={routine.id}
                setMyRoutines={setMyRoutines}
              />
            </form>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayMyRoutines;
