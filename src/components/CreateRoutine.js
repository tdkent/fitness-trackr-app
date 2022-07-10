import { useState } from "react";

import { postCreateRoutineRequest, getMyPublicRoutines } from "../api";
import Modal from "./Modal";

const CreateRoutine = ({ token, userData, setUseModal, setDbMessage, setMyRoutines, setCreateRoutine }) => {
  const [routineName, setRoutineName] = useState("");
  const [routineGoal, setRoutineGoal] = useState("");
  const [makePublic, setMakePublic] = useState(false);
  const nameChangeHandler = (e) => {
    setRoutineName(e.target.value);
  };
  const goalChangeHandler = (e) => {
    setRoutineGoal(e.target.value);
  };
  const publicChangeHandler = e => {
    setMakePublic(e.target.checked);
  }
  const submitHandler = async(e) => {
    e.preventDefault();
    setUseModal(false);
    setCreateRoutine(false);
    const name = routineName;
    const goal = routineGoal;
    const isPublic = makePublic;
    const routineData = {
      token,
      name,
      goal,
      isPublic,
    }
    const result = await postCreateRoutineRequest(routineData);
    console.log("Result after attempting to create a new routine: ", result);
    if(result.error) {
      setDbMessage(result.message);
      setUseModal(true);
    } else {
      const data = await getMyPublicRoutines(userData.username);
      setMyRoutines(data);
    }
  }
  const clickHandler = (e) => {
    e.preventDefault();
    setUseModal(false);
    setCreateRoutine(false);
  };
  return (
    <Modal setUseModal={setUseModal} setCreateRoutine={setCreateRoutine}>
      <header>
        <h3>Create a Routine</h3>
      </header>
      <form onSubmit={submitHandler}>
        <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          onChange={nameChangeHandler}
          className="text-input"
          required
        />
        </div>
        <div>
        <label htmlFor="goal">Goal:</label>
        <input
          id="goal"
          type="text"
          onChange={goalChangeHandler}
          className="text-input"
          required
        />
        </div>
        <div>
        <label htmlFor="public">Make routine public?</label>
        <input id="public" type="checkbox" onChange={publicChangeHandler} />
        </div>
        <button type="submit" className="primary">Submit</button>
        <button onClick={clickHandler} className="neutral">Cancel</button>
      </form>
    </Modal>
  );
};

export default CreateRoutine;
