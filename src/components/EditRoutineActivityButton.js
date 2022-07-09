const EditRoutineActivityButton = ({setEditRoutineActivity, setCurrentRoutineActivityData, activityData}) => {
  const clickHandler = e => {
    e.preventDefault();
    setEditRoutineActivity(true);
    setCurrentRoutineActivityData(activityData);
  }
  return (
    <button onClick={clickHandler}>Edit Activity</button>
  )
}

export default EditRoutineActivityButton;