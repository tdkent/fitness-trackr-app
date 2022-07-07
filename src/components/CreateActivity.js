import { useState } from "react";

import { postCreateActivityRequest, getActivitiesRequest } from "../api";
import Modal from "./Modal";

const CreateActivity = ({
  token,
  useModal,
  setUseModal,
  setActivitiesData,
  setDbMessage
}) => {
  const [activityName, setActivityName] = useState("");
  const [activityDesc, setActivityDesc] = useState("");
  const nameChangeHandler = (e) => {
    setActivityName(e.target.value);
  };
  const descChangeHandler = (e) => {
    setActivityDesc(e.target.value);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    setUseModal(false);
    const name = activityName;
    const description = activityDesc;
    const data = {
      name,
      description,
    };
    const result = await postCreateActivityRequest(data);
    console.log("Result after attempting to create a new activity: ", result);
    if (result.error) {
      setUseModal(true);
      setDbMessage(result.message);
    } else {
      const activities = await getActivitiesRequest();
      setActivitiesData(activities);
    }
  };
  const clickHandler = (e) => {
    e.preventDefault();
    setUseModal(false);
  };
  return (
    <Modal setUseModal={setUseModal}>
      <header>
        <h3>Create New Activity</h3>
      </header>
      <form onSubmit={submitHandler}>
        <label>Name:</label>
        <input
          id="name"
          type="text"
          placeholder="Enter name of activity"
          onChange={nameChangeHandler}
          required
        />
        <label>Description:</label>
        <input
          id="description"
          type="text"
          placeholder="Enter description of activity"
          onChange={descChangeHandler}
          required
        />
        <button type="submit">Submit</button>
        <button onClick={clickHandler}>Cancel</button>
      </form>
    </Modal>
  );
};

export default CreateActivity;
