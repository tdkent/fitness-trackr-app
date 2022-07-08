import { deleteMyRoutine, getMyPublicRoutines } from "../api";

const DeleteButton = ({ token, userData, routineId, setMyRoutines }) => {
  const clickHandler = async(e) => {
    e.preventDefault();
    await deleteMyRoutine(token, routineId);
    const data = await getMyPublicRoutines(userData.username);
    setMyRoutines(data);
  }
  return (
    <button onClick={clickHandler}>Delete Routine</button>
  )
}

export default DeleteButton;