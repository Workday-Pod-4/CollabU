import * as React from "react";
import "./ProfilePage.css";
import "../PreferenceModal/PreferenceModal.css";
import { useAuthContext } from "../../contexts/auth";
import { io } from "socket.io-client"

import UpdateForm from "./UpdateForm";
import AdditionalInfo from "./AdditionalInfo";
import Loading from "../Loading/Loading";

export default function ProfilePage() {

  const { user , firstTime, isUpdating, setIsUpdating, isLoading, setIsLoading} = useAuthContext();

  //if user selects studying in preference modal it will display study preference form
  const [isStudying, setIsStudying] = React.useState(false);
  const [isWorking, setIsWorking] = React.useState(false)
  const { prefModal, setPrefModal, togglePrefModal } = useAuthContext();

  //if user clicks study, set isStudying = true and isWorking = false
    function handleToggleStudy() {
      user.activity = 'studying'
      user.industry = undefined
      user.workType = undefined
      setIsWorking(false)
      setIsStudying(true);
  }

  //if user clicks work, set isWorking = true and isStudying = false
  function handleToggleWork() {
    user.activity = 'working'
    user.topic = undefined
    user.subject = undefined
    setIsStudying(false)
    setIsWorking(true)
  }

  function handleOnChangeTopic (event) {
    user.topic = event.target.value
  }

  function handleOnChangeSubject (event) {
    user.subject = event.target.value
  }

  function handleOnChangeIndustry (event) {
    user.industry = event.target.value
  }

  function handleOnChangeWork (event) {
    user.workType = event.target.value
  }

  const client = React.useRef();

  function handleOnSubmit (event) {
    event.preventDefault()
    setIsLoading(true);
    client.current.emit('submit', {user});
  }

  React.useEffect(() => {

    const socket = io("http://localhost:3001")

    // socket.on('connect', (socket) => {
    //     console.log(`Client connected: ${socket.id}`)
    // });

    socket.on('redirectToRoom', (roomURL) => {
      setIsLoading(false);
      // redirect to new URL
      window.location = roomURL;
    });

    client.current = socket;

    socket.on('disconnect', () => {
        socket.removeAllListeners();
    });

    return () => socket.disconnect();

  }, []);

  return (
    <div className="profile-page">
      { firstTime ? <AdditionalInfo /> : null}
      <h1>Information</h1>
      <div className="sections">
        <div className="left-section">
          <div className="profile-pic">
            <img
              src="https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"
              height="150px"
              width="150px"
            />
          </div>
          <div className="profile-name">
            <h2>
              {user.first_name} {user.last_name}
            </h2>
          </div>
          <div className="location">
            { user?.location ? 
            <b>{user.location}</b>
            :
            null
            }
            { user?.timezone ?
              <b> | {user.timezone}</b>
              :
              null
            }     
          </div>
          <div className="social-media-links">
            <ul>
            {user?.social_media_link_1 ?
                <li className="link-1">
                  <a href={user.social_media_link_1}>
                    <span>{user.social_media_link_1}</span>
                  </a>
                </li>
              :
                null
              }
              {user?.social_media_link_2 ?
                <li className="link-2">
                  <a href={user.social_media_link_2}>
                    <span>{user.social_media_link_2}</span>
                  </a>
                </li>
              :
                null
              }
              {user?.social_media_link_3 ?
                <li className="link-3">
                  <a href={user.social_media_link_3}>
                    <span>{user.social_media_link_3}</span>
                  </a>
                </li>
              :
                null
              }
            </ul>
          </div>
          <div className="settings">
            <button className="settings-btn">Settings</button>
          </div>
          <div className="report-issue">
            <b>Report issue</b>
          </div>
        </div>
        <div className="middle-section">
          { isUpdating ? <UpdateForm />
          :
          <div className="info-cards">
              <div className="work-card">
                <div className="job-title-row">
                {user?.job_title ?
                <b>{user.job_title}</b>
                  :
                <b>Insert your Work Title</b>
                }
                </div>
              <div className="company-row">
                <p>at</p>
                {user?.company ?
                <b>{user.company}</b>
                :
                <b>Add Your Company!</b>
                }  
              </div>
              </div>
              { (user?.major || user?.college) ? 
              <div className="school-card">
                <b>{user.major} student</b>
                <p>at</p>
                <b>{user.college}</b>
              </div>
              :
              null  
              }
              <div className="update-btn-container">
                <button className="update-btn" onClick={() => (setIsUpdating(true))}>Update</button>
              </div>
          </div>
          }
        </div>
        <div className="right-section">
          <div className="match-history">
            <ul>
              <li><img src = "https://s-media-cache-ak0.pinimg.com/736x/f0/d3/5f/f0d35ff9618e0ac7c0ec929c8129a39d.jpg" alt = "img" width = "70px" height= "70px"/><span>Person 1</span></li>
              <li><img src = "https://pbs.twimg.com/profile_images/536210858809249792/UgauTnaG_400x400.jpeg" alt = "img" width = "70px" height= "70px"/><span>Person 2</span></li>
              <li><img src = "" alt = "profile-pic" width = "70px" height= "70px"/><span>Person 3</span></li>
            </ul>
          </div>
        </div>
      </div>
      <div>
      {prefModal  && (isLoading == false) ? (
        <div
          className="preference-modal-container"
          id="preference-modal-container"
        >
          <div className="modal">
            <div className="header">
              <h1>Are you studying or working?</h1>
            </div>
            <li className="close-modal" onClick={togglePrefModal}> 
            x
            </li>
            <div className="preference-form-wrapper">
              {isStudying?<div className="preference-study-form">
              <div className ="sub-header"> Study </div>
                <ul>
                <li>
                    <span>
                    <label>Topic</label>
                    <select className="form-input" name="topic" placeholder="Select topic" onChange={handleOnChangeTopic}>
                        <option value={""} selected>Select A Topic</option>
                        <option value={"Mathematics"}>Mathematics</option>
                        <option value={"Computer Science"}>Computer Science</option>
                        <option value={"Biology"}>Biology</option>
                        <option value={"Chemistry"}>Chemistry</option>
                    </select>
                    </span>
                  </li>
                <li>
                  <span>
                    <label>Subject/Course</label>
                    <br></br>
                    <select className="form-input" name="subject" placeholder="Select Subject" onChange={handleOnChangeSubject}>
                        <option value={""} selected>Select A Subject</option>
                        <option value={"Intro to programmings"}>Intro to programming</option>
                        <option value={"Calculus 1"}>Calculus 1</option>
                        <option value={"Intro to Biology"}>Intro to biology</option>
                        <option value={"Organic Chemistry"}>Organic chemistry</option>
                    </select>
                    </span>
                  </li>
                </ul>
              </div>:(isWorking?<div className="preference-work-form">
                <div className ="sub-header"> Work </div>
                <ul>
                <li>
                  <span>
                    <label>Industry</label>
                    <br></br>
                    <select className="form-input" name="industry" placeholder="Select industry" onChange={handleOnChangeIndustry}>
                        <option value={""} selected>Select an Industry</option>
                        <option value={"Technology"}>Technology</option>
                        <option value={"Medicine"}>Medicine</option>
                        <option value={"Consulting"}>Consulting</option>
                    </select>
                    </span>
                  </li>
                  <li>
                    <span>
                    <label>Type of Work</label>
                    <select className="form-input" name="type-of-work" placeholder="Select type of work" onChange={handleOnChangeWork}>
                        <option value={""} selected>Type of Work You're Working On</option>
                        <option value={"Software-Developement"}>Software Development</option>
                        <option value={"Electrical-Engineering"}>Electrical Engineering</option>
                        <option value={"Consulting"}>Financial Consulting</option>
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
            <button className="find" onClick={handleOnSubmit}>Find a buddy</button>
          </div>
        </div>
      ) : (isLoading ? <Loading /> : null)}
    </div>
    </div>
  );
}

