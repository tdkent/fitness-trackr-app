import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

const DatabaseMessage = ({dbMessage, setDbMessage, setUseModal, setCreateRoutine}) => {
  let navigate = useNavigate();
  const clickHandler = () => {
    setUseModal(false);
    dbMessage === "you're logged in!" && navigate("/");
    setDbMessage("");
  }
  return (
    <Modal setUseModal={setUseModal} dbMessage={dbMessage} setCreateRoutine={setCreateRoutine} >
      <header>
      {!dbMessage === "you're logged in!" && <h3>There was an error!</h3>}
        <p>{dbMessage}</p>
      </header>
      <div>
        <button onClick={clickHandler} className="primary">Okay</button>
      </div>
    </Modal>
  )
}

export default DatabaseMessage;