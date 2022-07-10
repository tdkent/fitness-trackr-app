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
      <header>
        <h3>Edit Activity</h3>
      </header>
      <form onSubmit={submitHandler}>
        <div>
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
        </div>
        <button type="submit" className="primary">Submit</button>
        <button onClick={clickHandler} className="neutral">Cancel</button>
      </form>
    </EditRoutineActivityModal>
  );
};

export default EditRoutineActivity;
