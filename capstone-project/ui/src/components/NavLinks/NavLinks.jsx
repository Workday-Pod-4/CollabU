import * as React from "react";
import { Link } from "react-router-dom";
import "./NavLinks.css";

export default function NavLinks() {
  return (
    <div className="nav-links">
      <ul className="links">
        <li>
          <Link to="/login">
          Login
          </Link>
        </li>
        <li>
          {/* <Link to="/register"> */}
          Register
          {/* </Link> */}
        </li>
      </ul>
    </div>
  );
}
