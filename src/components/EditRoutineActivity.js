import { useState } from "react";
import EditRoutineActivityModal from "./EditRoutineActivityModal";
import { patchMyRoutineActivity, getMyPublicRoutines } from "../api";

const EditRoutineActivity = ({
  setEditRoutineActivity,
  routineActivityData,
  token,
  setMyRoutines,
  userData,
}) => {
  const [count, setCount] = useState("");
  const [duration, setDuration] = useState("");
  const countChangeHandler = (e) => {
    setCount(e.target.value);
  };
  const durationChangeHandler = (e) => {
    setDuration(e.target.value);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setEditRoutineActivity(false);
    const result = await patchMyRoutineActivity(
      token,
      routineActivityData.routineActivityId,
      count,
      duration
    );
    console.log("Result of of patch routine activity request: ", result);
    if (result) {
      const data = await getMyPublicRoutines(userData.username);
      setMyRoutines(data);
    } else {
      alert("An unknown error occurred. Please try again.");
    }
  };
  const clickHandler = (e) => {
    e.preventDefault();
    setEditRoutineActivity(false);
  };
  return (
    <EditRoutineActivityModal setEditRoutineActivity={setEditRoutineActivity}>
      <header>Add Activity</header>
      <form onSubmit={submitHandler}>
        <label>Count:</label>
        <input
          type="number"
          min="1"
          max="100"
          onChange={countChangeHandler}
          required
        />
        <label>Duration:</label>
        <input
          type="number"
          min="1"
          max="100"
          onChange={durationChangeHandler}
          required
        />
        <button type="submit">Submit</button>
        <button onClick={clickHandler}>Cancel</button>
      </form>
    </EditRoutineActivityModal>
  );
};

export default EditRoutineActivity;
