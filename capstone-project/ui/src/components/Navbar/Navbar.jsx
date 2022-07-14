import * as React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({}) {
  return (
    <div>
      <nav className="Navbar">
        <div className="content">
          <div className="logo">
            {/* <Link to="/"> */}
              <img
                src=""
                alt="logo"
              ></img>
            {/* </Link> */}
          </div>
        </div>
      </nav>
    </div>
  );
}
