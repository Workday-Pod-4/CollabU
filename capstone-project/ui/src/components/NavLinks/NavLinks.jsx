import * as React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/auth"
import "./NavLinks.css";


export default function NavLinks() {
  
  const {user, logoutUser} = useAuthContext() 
  const {togglePrefModal, inRoom, setInRoom, setExiting, setFindingAnotherBuddy} = useAuthContext() 

  return (
    <div className="nav-links">
      <ul className="links">
        <li>
          { user?.email && inRoom==false ? <li className="logout-button" onClick={logoutUser}> <Link to="/">Logout</Link></li> 
          : 
          user?.email && inRoom ? <li className="btn" onClick={() =>{setExiting(true)}}> <a>Exit Room</a> </li>
          :
          <Link to="/login">
          Login
          </Link>}
        </li>
          { user?.email && inRoom==false ?
          <li onClick={togglePrefModal} className = "btn" id= "open-modal"><Link to="/profile"> Find a buddy</Link></li>
          :
          user?.email && inRoom ?
          <li className="btn" onClick={() =>{setFindingAnotherBuddy(true)}}> <a>Find another buddy</a> </li>
          :  
          <li className="btn"><Link to="/register">Register</Link></li>
          }
      </ul>
    </div>
  );
}