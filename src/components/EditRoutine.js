import { useState } from "react";
import EditRoutineModal from "./EditRoutineModal";
import { patchMyRoutine, getMyPublicRoutines } from "../api";
const EditRoutine = ({ setEditRoutine, routineData, token, setMyRoutines }) => {
  const [editRoutineName, setEditRoutineName] = useState("");
  const [editRoutineGoal, setEditRoutineGoal] = useState("");
  const nameChangeHandler = (e) => {
    setEditRoutineName(e.target.value);
  };
  const goalChangeHandler = (e) => {
    setEditRoutineGoal(e.target.value);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setEditRoutine(false);
    const result = await patchMyRoutine(
      token,
      routineData.id,
      editRoutineName,
      editRoutineGoal
    );
    console.log("Result of patch routine request: ", result);
    if(result) {
      const data = await getMyPublicRoutines(routineData.creatorName);
      setMyRoutines(data);
    } else {
      alert("An unknown error occured. Please try again later.")
    }
    
  };
  const clickHandler = (e) => {
    e.preventDefault();
    setEditRoutine(false);
  };
  return (
    <EditRoutineModal setEditRoutine={setEditRoutine}>
      <header>
        <h3>Edit Routine</h3>
      </header>
      <form onSubmit={submitHandler}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          placeholder="Edit name of routine"
          onChange={nameChangeHandler}
          required
        />
        <label htmlFor="goal">Goal:</label>
        <input
          id="goal"
          type="text"
          placeholder="Edit goal of routine"
          onChange={goalChangeHandler}
          required
        />
        <button type="submit">Submit</button>
        <button onClick={clickHandler}>Cancel</button>
      </form>
    </EditRoutineModal>
  );
};

export default EditRoutine;
