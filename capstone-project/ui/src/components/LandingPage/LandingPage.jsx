import * as React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import Hero from "../Hero/Hero";

export default function LandingPage({}) {
  return (
    <div className="landing-page">
      <div className="hero">
        <Hero/>
      </div>
    </div>
  );
}
