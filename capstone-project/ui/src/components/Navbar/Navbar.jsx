import * as React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/auth";
import NavLinks from "../NavLinks/NavLinks";
import "./Navbar.css";

export default function Navbar() {
  const { user } = useAuthContext();
  return (
    <div>
      <nav className="Navbar">
        <div className="content">
          <div className="logo">
            <Link to={ user?.email ? "/profile" : "/"}>
              <img src="../src/assets/CollabU-1.png" ></img>
            </Link>
          </div>
          <NavLinks />
        </div>
      </nav>
    </div>
  );
}
