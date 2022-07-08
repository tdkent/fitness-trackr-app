import { useState } from "react";

import { postAddActivityToRoutine, getMyPublicRoutines } from "../api";

const AddActivity = ({ routineId, activitiesData, useModal, setUseModal,setSuccessMessage, userData, setMyRoutines }) => {
  const [activityId, setActivityId] = useState("");
  const [activityCount, setActivityCount] = useState("");
  const [activityDuration, setActivityDuration] = useState("");
  const selectionHandler = (e) => {
    e.preventDefault();
    const [id, name] = e.target.value.split(" - ");
    setActivityId(Number(id));
  };
  const countChangeHandler = (e) => {
    setActivityCount(Number(e.target.value));
  };
  const durationChangeHandler = (e) => {
    setActivityDuration(Number(e.target.value));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const count = activityCount;
    const duration = activityDuration
    const result = await postAddActivityToRoutine(routineId, activityId, count, duration);
    console.log("Result after add activity to routine request: ", result);
    if(result.id) {
      setUseModal(true)
      setSuccessMessage(true);
      const data = await getMyPublicRoutines(userData.username);
      setMyRoutines(data);
    }
  };
  return (
    <div>
      <header>Add Activity</header>
      <form onSubmit={submitHandler}>
        <label htmlFor="add-activity">Name:</label>
        <select id="add-activity" onChange={selectionHandler}>
          <option></option>
          {activitiesData.map((activity) => {
            return (
              <option key={activity.id}>
                {activity.id} - {activity.name}
              </option>
            );
          })}
        </select>
        <label>Count:</label>
        <input type="number" min="0" max="100" onChange={countChangeHandler} />
        <label>Duration:</label>
        <input
          type="number"
          min="0"
          max="100"
          onChange={durationChangeHandler}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddActivity;
