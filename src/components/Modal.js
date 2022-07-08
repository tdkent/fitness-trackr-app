import { useNavigate } from "react-router-dom";
import "./Modal.css";

const Modal = (props) => {
  let navigate = useNavigate();
  const clickHandler = () => {
    props.setUseModal(false);
    props.setCreateRoutine(false);
    props.dbMessage === "you're logged in!" && navigate("/");
  }
  return (
    <>
    <div className="background" onClick={clickHandler} />
    <div className="modal">{props.children}</div>
    </>
  )
}

export default Modal;