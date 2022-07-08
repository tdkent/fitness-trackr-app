import AddActivity from "./AddActivity";
import DeleteButton from "./DeleteButton";
import DeleteActivityButton from "./DeleteActivityButton";

const DisplayMyRoutines = ({
  token,
  userData,
  myRoutines,
  setMyRoutines,
  useModal,
  setUseModal,
  activitiesData,
  setSuccessMessage,
}) => {
  return (
    <div>
      {myRoutines.map((routine) => {
        return (
          <div key={routine.id}>
            <h4>{routine.name}</h4>
            <p>{routine.goal}</p>
            <div>
              <header>
                <h6>Activities</h6>
              </header>
              {routine.activities.map((activity) => {
                return (
                  <div key={activity.id}>
                    <p>Name: {activity.name}</p>
                    <p>Description: {activity.description}</p>
                    <p>Count: {activity.count}</p>
                    <p>Duration: {activity.duration}</p>
                    <form>
                      <button>Edit</button>
                      <DeleteActivityButton token={token} userData={userData} setMyRoutines={setMyRoutines} routineActivityId={activity.routineActivityId}/>
                    </form>
                  </div>
                );
              })}
            </div>
            {routine.isPublic ? (
              <p>You have set this Routine to Public.</p>
            ) : (
              <p>You have set this Routine to Private.</p>
            )}
            <AddActivity
              routineId={routine.id}
              activitiesData={activitiesData}
              useModal={useModal}
              setUseModal={setUseModal}
              setSuccessMessage={setSuccessMessage}
              userData={userData}
              setMyRoutines={setMyRoutines}
            />
            <form>
              <button>Edit</button>
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
