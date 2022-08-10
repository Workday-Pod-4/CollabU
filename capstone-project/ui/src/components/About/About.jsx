import * as React from "react";
import aboutImg from "../../assets/about-img.jpg"
import "./About.css";

export default function About() {
  return (
    <div className="about">
      <div className="content">
        <div className="about-img">
          <img src = {aboutImg} width="400px" height="266px"></img>
        </div>
          <div className="about-text">
            <h1>About CollabU</h1>
            <p>Taking the first step is always the hardest, especially when you're taking that step alone. CollabU provides access to a community of like-minded individuals who wish to form healthy habits and accomplish self-defined goals. No matter the time or place,  we make finding an accountability partner easy and accessible for you.</p>
          </div>
      </div>
    </div>
  );
}
