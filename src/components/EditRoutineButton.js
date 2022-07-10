const EditRoutineButton = ({ setEditRoutine, routineData, setCurrentRoutineData }) => {
  const clickHandler = e => {
    e.preventDefault();
    setEditRoutine(true);
    setCurrentRoutineData(routineData);
  }
  return (
    <button onClick={clickHandler} className="neutral">Edit Routine</button>
  )
}

export default EditRoutineButton;