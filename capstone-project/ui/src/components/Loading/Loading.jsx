import * as React from "react";
import { useAuthContext } from "../../contexts/auth";
import "./Loading.css";


export default function Loading() {

  const { setIsLoading, togglePrefModal } = useAuthContext();

  function closeModal(){
    setIsLoading(false);
    togglePrefModal();
  }

  return (
    <div className="container">
        <div className="content">
          <div className="header">
            <div className="button-container">
              <button className="close" onClick={closeModal}> x </button>
            </div>
          </div>
          <h1>Finding you a Match...</h1>
          <p> If it's taking a while to find a match, it's possible there's no one online. </p>
          <p> If that's the case, please try again later. </p>
        </div>
    </div>
  );
}