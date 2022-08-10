import * as React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/auth";
import NavLinks from "../NavLinks/NavLinks";
import logo from "../../assets/CollabU-1.png"
import "./Navbar.css";

export default function Navbar() {
  const { user } = useAuthContext();
  return (
    <div>
      <nav className="Navbar">
        <div className="content">
          <div className="logo">
            <Link to={ user?.email ? "/profile" : "/"}>
              <img src={logo} ></img>
            </Link>
          </div>
          <NavLinks />
        </div>
      </nav>
    </div>
  );
}
