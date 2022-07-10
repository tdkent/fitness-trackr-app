import { useState } from "react";

import { postCreateActivityRequest, getActivitiesRequest } from "../api";
import Modal from "./Modal";

const CreateActivity = ({
  token,
  useModal,
  setUseModal,
  setActivitiesData,
  setDbMessage,
  setCreateActivity,
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
    setCreateActivity(false);
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
    setCreateActivity(false);
  };
  return (
    <Modal setUseModal={setUseModal} setCreateActivity={setCreateActivity}>
      <header>
        <h3>Create New Activity</h3>
      </header>
      <form onSubmit={submitHandler}>
        <div>
        <label>Name:</label>
        <input
          id="name"
          type="text"
          onChange={nameChangeHandler}
          className="text-input"
          required
        />
        </div>
        <div>
        <label>Description:</label>
        <input
          id="description"
          type="text"
          onChange={descChangeHandler}
          className="text-input"
          required
        />
        </div>
        <button type="submit" className="primary">Submit</button>
        <button onClick={clickHandler} className="neutral">Cancel</button>
      </form>
    </Modal>
  );
};

export default CreateActivity;
