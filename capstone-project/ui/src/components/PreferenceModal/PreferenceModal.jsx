import * as React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/auth"
import "./PreferenceModal.css";

export default function PreferenceModal() {
return(




















    


)
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
            <button id="close-modal" onClick={togglePrefModal}>
              close button
            </button>
            <button id="close-modal" onClick={() => { setIsStudying(false); setIsWorking(false)}}> Back</button>
            <div className="form-wrapper">
              {isStudying?<div className="preference-study-form">
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
                <ul>
                  <li>
                    <span>
                      <input
                        className="form-input"
                        type="text"
                        name="work"
                        placeholder="Type of work"
                        value=""
                      ></input>
                    </span>
                  </li>
                  <li>
                    <span>
                      <input
                        className="form-input"
                        type="text"
                        name="industry"
                        placeholder="industry"
                        value=""
                      ></input>
                    </span>
                  </li>
                </ul>
              </div>:<div className="preference-btns">
         <button className="study-btn" onClick={handleToggleStudy}> Studying</button> 
         <button className="work-btn" onClick = {handleToggleWork}> Working</button>
            </div>)}
            </div>
            <button className="find"> Find a buddy</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
