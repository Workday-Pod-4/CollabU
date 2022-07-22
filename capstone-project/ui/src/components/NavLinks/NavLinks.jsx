import * as React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/auth"
import "./NavLinks.css";


export default function NavLinks() {
  const {user, logoutUser} = useAuthContext() 
  const {prefModal, setPrefModal, togglePrefModal} = useAuthContext() 
  console.log("prefModal:",prefModal)


  return (
    <div className="nav-links">
      <ul className="links">
        <li>
          { user?.email ?<li className="logout-button" onClick={logoutUser}> <Link to="/">Logout</Link></li> : <Link to="/login">
          Login
          </Link>}
        </li>
          { user?.email ?
          <li onClick={togglePrefModal} className = "btn" id= "open-modal"><Link to="/profile"> Find a buddy</Link></li>
          :
          <li className="btn"><Link to="/register">Register</Link></li>
          }
      </ul>
    </div>
  );
}
