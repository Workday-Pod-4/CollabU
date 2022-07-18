import * as React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";
export default function Hero({}) {
  return (
    <div className="hero">
      <div className="content">
        <div className="hero-img">
          <img src="" alt="placeholder" ></img>
        </div>
        <div className="intro">
          <h1>Welcome!</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta magni quis numquam minima culpa incidunt, quas, vitae voluptatum dolorem fuga inventore porro fugit at corporis, ad autem. Quas dolor totam beatae voluptatibus iusto libero ullam, ea maiores, aliquid veritatis, assumenda non doloribus vel iure molestiae.</p>
        </div>
      </div>
    </div>
  );
}
