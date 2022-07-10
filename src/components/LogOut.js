import { Link, useNavigate } from "react-router-dom";
import "./Nav.css"

const LogOut = ({ setToken }) => {
  let navigate = useNavigate();
  const clickHandler = async (e) => {
    e.preventDefault();
    window.localStorage.clear();
    setToken(null);
    navigate("/");
  };
  return (
    <Link to="#" onClick={clickHandler}  className="nav-link">
      Log Out
    </Link>
  );
};

export default LogOut;
