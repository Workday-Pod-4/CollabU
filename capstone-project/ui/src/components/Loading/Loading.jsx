import * as React from "react";
import "./Loading.css";


export default function Loading() {
  return (
    <div className="container">
        <div className="content">
          <h1>Finding you a Match...</h1>
          <p> If it's taking a while to find a match, it's possible there's no one online. </p>
          <p> If that's the case, please try again later. </p>
        </div>
    </div>
  );
}