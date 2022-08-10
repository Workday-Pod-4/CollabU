import * as React from "react";
import heroimg from "../../assets/hero-img.webp"
import "./Hero.css";

export default function Hero() {
  
  return (
    <div className="hero">
      <div className="content">
        <div className="hero-img">
        <img src = {heroimg} width="25px" height="25px"></img>
        <div className = "color-box"></div>
        </div>
        <div className="intro">
          <h1>Boost your Productivity and Success through New Connections</h1>
          <p>Easy to use, dynamic, and adapted to your needs, CollabU makes achieving your goals and making new connections a fast and enjoyable process </p>
        </div>
      </div>
    </div>
  );
}
