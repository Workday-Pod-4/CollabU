import * as React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import Hero from "../Hero/Hero";
import AboutUs from "../AboutUs/AboutUs";

export default function LandingPage({}) {
  return (
    <div className="landing-page">
      <div className="hero-banner">
        <Hero />
      </div>
      <div className="about-us-section">
        <AboutUs />
      </div>
    </div>
  );
}
