import * as React from "react";
import { Link } from "react-router-dom";
import NavLinks from "../NavLinks/NavLinks";
import "./Navbar.css";

export default function Navbar({}) {
  return (
    <div>
      <nav className="Navbar">
        <div className="content">
          <div className="logo">
            <Link to="/">
            <img src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/qp8rxi2jae4uinry2dv7" height ="80" width ="80" alt="logo"></img>
            </Link>
          </div>
          <NavLinks />
        </div>
      </nav>
    </div>
  );
}
