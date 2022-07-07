import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

const DatabaseMessage = ({dbMessage, setDbMessage, setUseModal}) => {
  let navigate = useNavigate();
  const clickHandler = () => {
    setUseModal(false);
    dbMessage === "you're logged in!" && navigate("/");
    setDbMessage("");
  }
  return (
    <Modal setUseModal={setUseModal} dbMessage={dbMessage} >
      <header>
        <h3>{dbMessage}</h3>
      </header>
      <div>
        <button onClick={clickHandler}>Okay</button>
      </div>
    </Modal>
  )
}

export default DatabaseMessage;