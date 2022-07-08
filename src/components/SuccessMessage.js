import Modal from "./Modal";
const SuccessMessage = ({ setUseModal }) => {
  const clickHandler = e => {
    e.preventDefault();
    setUseModal(false);
  }
  return (
    <Modal setUseModal={setUseModal}>
      <h2>Success!</h2>
      <p>Your action was completed successfully!</p>
      <button onClick={clickHandler}>Got It</button>
    </Modal>
  )
}

export default SuccessMessage;