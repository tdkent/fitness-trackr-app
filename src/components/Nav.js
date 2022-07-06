import { Link, Outlet } from "react-router-dom";

import LogOut from "./LogOut";

const Nav = ({token, setToken}) => {
  return (
    <header>
      <h1>FitnessTrackr</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/routines">Routines</Link>
        {token && <Link to="/my-routines">My Routines</Link>}
        <Link to="/activities">Activities</Link>
        {token ? <LogOut setToken={setToken}/> : <Link to="/auth">Log In</Link> }
      </nav>
      <Outlet />
    </header>
  );
};

export default Nav;
