import { getMyPublicRoutines, deleteActivityFromRoutine } from "../api";

const DeleteActivityButton = ({ token, userData, routineActivityId, setMyRoutines }) => {
  const clickHandler = async(e) => {
    e.preventDefault();
    const result = await deleteActivityFromRoutine(token, routineActivityId);
    console.log("attempt to delete activity from routine: ", result);
    const data = await getMyPublicRoutines(userData.username);
    setMyRoutines(data);
  }
  return (
    <button onClick={clickHandler}>Delete</button>
  )
}

export default DeleteActivityButton;