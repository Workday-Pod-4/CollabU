import * as React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/auth"
import "./NavLinks.css";

export default function NavLinks() {

  const { user, logoutUser } = useAuthContext()

  return (
    <div className="nav-links">
      <ul className="links">
        <li>
          { user?.email ? <Link to="/"><button className="logout-button" onClick={logoutUser}>Logout</button></Link> : <Link to="/login">
          Login
          </Link>}
        </li>
          { user?.email ?
          <li className = "btn"><Link to="/profile"> Find a buddy</Link></li>
          :
          <li className="btn"><Link to="/register">Register</Link></li>
          }
      </ul>
    </div>
  );
}
