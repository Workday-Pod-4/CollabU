import * as React from "react";
import "./LandingPage.css";
import Hero from "../Hero/Hero";
import About from "../About/About";
import ContactUs from "../ContactUs/ContactUs";
import Footer from "../Footer/Footer";

export default function LandingPage() {
  
  return (
    <div className="landing-page">
      <div className="hero-banner">
        <Hero />
      </div>
      <div className="about-section">
        <About/>
      </div>
      <div className = "contact-section">
        <ContactUs/>
      </div>
      <div className = "footer-section">
      <Footer/>
      </div>
    </div>
  );
}
