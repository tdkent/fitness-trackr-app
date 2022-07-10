import { Link, Outlet } from "react-router-dom";

import LogOut from "./LogOut";
import "./Nav.css";

const Nav = ({token, setToken}) => {
  return (
    <header id="main-header">
      <h1>FitnessTrackr</h1>
      <nav>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/routines" className="nav-link">Routines</Link>
        {token && <Link to="/my-routines" className="nav-link">My Routines</Link>}
        <Link to="/activities" className="nav-link">Activities</Link>
        {token ? <LogOut setToken={setToken}/> : <Link to="/auth"  className="nav-link">Log In</Link> }
      </nav>
      <Outlet />
    </header>
  );
};

export default Nav;
