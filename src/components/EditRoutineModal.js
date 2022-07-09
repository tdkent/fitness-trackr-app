import "./Modal.css";

const EditRoutineModal = (props) => {
  const clickHandler = () => {
    props.setEditRoutine(false);
  };
  return (
    <>
      <div className="background" onClick={clickHandler} />
      <div className="modal">{props.children}</div>
    </>
  );
};

export default EditRoutineModal;
