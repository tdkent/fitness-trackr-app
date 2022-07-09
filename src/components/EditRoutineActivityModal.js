import "./Modal.css";

const EditRoutineActivityModal = (props) => {
  const clickHandler = () => {
    props.setEditRoutineActivity(false);
  };
  return (
    <>
      <div className="background" onClick={clickHandler} />
      <div className="modal">{props.children}</div>
    </>
  );
};

export default EditRoutineActivityModal;