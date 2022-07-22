import * as React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/auth";
import "./PreferenceModal.css";

export default function PreferenceModal() {
  //if user selects studying in preference modal it will display study preference form
  const [isStudying, setIsStudying] = React.useState(false);
  const [isWorking, setIsWorking] = React.useState(false)
  const { prefModal, setPrefModal, togglePrefModal } = useAuthContext();

  //if user clicks study, set isStudying = true and isWorking = false
  function handleToggleStudy() {
    setIsWorking(false)
    setIsStudying(true);
  }
  //if user clicks work, set isWorking = true and isStudying = false
  function handleToggleWork(){
  setIsStudying(false)
  setIsWorking(true)
  }

  console.log("isStudying:", isStudying);
  return (
    <div>
      {prefModal ? (
        <div
          className="preference-modal-container"
          id="preference-modal-container"
        >
          <div className="modal">
            <div className="header">
              <h1>Are you studying or working?</h1>
            </div>
            <button className="close-modal" onClick={togglePrefModal}> 
            x
            </button>
            <div className="form-wrapper">
              {isStudying?<div className="preference-study-form">
              <div className ="sub-header"> Study </div>
                <ul>
                  <li>
                    <input
                      className="form-input"
                      type="text"
                      name="subject"
                      placeholder="Subject/Course"
                      value=""
                    ></input>
                  </li>
                  <li>
                    <span>
                      <input
                        className="form-input"
                        type="text"
                        name="topic"
                        placeholder="Topic Area"
                        value=""
                      ></input>
                    </span>
                  </li>
                </ul>
              </div>:(isWorking?<div className="preference-work-form">
                <div className ="sub-header"> Work </div>
                <ul>
                  <li>
                    <span>
                    <label>Type of Work</label>
                    <select className="form-input" name="type-of-work" placeholder="Select type of work" >
                        <option value={"Software-Developement"}>Software Development</option>
                        <option value={"Electrical-Engineering"}>Electrical Engineering</option>
                        <option value={"Consulting"}>Financial Consulting</option>
                    </select>
                    </span>
                  </li>
                  <li>
                  <span>
                    <label>Industry</label>
                    <br></br>
                    <select className="form-input" name="industry" placeholder="Select industry" >
                        <option value={"Technology"}>Technology</option>
                        <option value={"Medicine"}>Medicine</option>
                        <option value={"Consulting"}>Consulting</option>
                    </select>
                    </span>
                  </li>
                </ul>
              </div>:<div className="preference-btns">
         <button className="study-btn" onClick={handleToggleStudy}> Studying</button> 
         <button className="work-btn" onClick = {handleToggleWork}> Working</button>
            </div>)}
            </div>
            {isStudying || isWorking?<button id="back-btn" onClick={() => { setIsStudying(false); setIsWorking(false)}}> Back</button>: null}
            <button className="find"> Find a buddy</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
