import { useState } from "react";

import { postAddActivityToRoutine, getMyPublicRoutines } from "../api";
import "./AddActivity.css";
const AddActivity = ({
  routineId,
  activitiesData,
  useModal,
  setUseModal,
  userData,
  setMyRoutines,
  setDbMessage,
}) => {
  const [activityId, setActivityId] = useState("");
  const [activityCount, setActivityCount] = useState("");
  const [activityDuration, setActivityDuration] = useState("");
  const [activityName, setActivityName] = useState("");
  const selectionHandler = (e) => {
    e.preventDefault();
    setActivityName(e.target.value);
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
    const duration = activityDuration;
    const result = await postAddActivityToRoutine(
      routineId,
      activityId,
      count,
      duration
    );
    console.log("Result after add activity to routine request: ", result);
    if (result.id) {
      setUseModal(true);
      const data = await getMyPublicRoutines(userData.username);
      setMyRoutines(data);
    } else if (result.error) {
      setDbMessage(result.message);
      setUseModal(true);
    } else {
      alert("An unknown error occured. Please try again later.");
    }
    setActivityCount("");
    setActivityDuration("");
    setActivityId("");
    setActivityName("");
  };
  return (
    <div className="add-activity">
      <header>
        <h5>Add Activity</h5>
      </header>
      <form onSubmit={submitHandler}>
        <label htmlFor="activity-select">Name:</label>
        <select
          id="activity-select"
          onChange={selectionHandler}
          value={activityName}
          required
        >
          <option placeholder="Select activity:"></option>
          {activitiesData.map((activity) => {
            return (
              <option key={activity.id}>
                {activity.id} - {activity.name}
              </option>
            );
          })}
        </select>
        <div>
          <label>Count:</label>
          <input
            type="number"
            min="1"
            max="100"
            onChange={countChangeHandler}
            value={activityCount}
            required
          />
          <label>Duration:</label>
          <input
            type="number"
            min="1"
            max="100"
            onChange={durationChangeHandler}
            value={activityDuration}
            required
          />
        </div>
        <button type="submit" className="primary">Submit</button>
      </form>
    </div>
  );
};

export default AddActivity;
