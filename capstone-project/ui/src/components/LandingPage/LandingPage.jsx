import * as React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import Hero from "../Hero/Hero";
import About from "../About/About";

export default function LandingPage({}) {
  return (
    <div className="landing-page">
      <div className="hero-banner">
        <Hero />
      </div>
      <div className="about-section">
        <About/>
      </div>
    </div>
  );
}
