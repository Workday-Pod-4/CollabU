
import * as React from "react";
import { useAuthContext } from "../../contexts/auth";
import { io } from "socket.io-client";
import Loading from "../Loading/Loading"
import UpdateForm from "./UpdateForm";
import AdditionalInfo from "./AdditionalInfo";
import SettingsModal from "../SettingsModal/SettingsModal";
import "./ProfilePage.css";
import "./PreferenceModal.css";
import ReportIssueModal from "../ReportIssueModal/ReportIssueModal";


export default function ProfilePage() {

  const { user , firstTime, isUpdating, setIsUpdating, isLoading, setIsLoading } = useAuthContext();
  const { settingsModal, toggleSettingsModal } = useAuthContext();

  // if user selects studying in preference modal it will display study preference form
  const [isStudying, setIsStudying] = React.useState(false);
  const [isWorking, setIsWorking] = React.useState(false)


  const {reportModal,setReportModal,toggleReportModal}= useAuthContext();

  console.log("t:", reportModal)

  const { prefModal, setPrefModal, togglePrefModal } = useAuthContext();

  const [matches, setMatches] = React.useState([])

  // if user clicks study, set isStudying = true and isWorking = false
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

  // set topic property based on user input
  function handleOnChangeTopic (event) {
    user.topic = event.target.value
  }

  // set subject property based on user input
  function handleOnChangeSubject (event) {
    user.subject = event.target.value
  }

  // set industry property based on user input
  function handleOnChangeIndustry (event) {
    user.industry = event.target.value
  }

  // set workType property based on user input
  function handleOnChangeWork (event) {
    user.workType = event.target.value
  }

  const client = React.useRef();

  // sends user info back to server for matching
  function handleOnSubmit (event) {
    event.preventDefault()
    setIsLoading(true);
    client.current.emit('submit', {user});
  }

  function closeModal(){
    client.current.emit('remove', {user});
    setIsLoading(false);
    togglePrefModal();
    
  }

  React.useEffect(() => {

    const socket = io("http://localhost:3001")

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

    // Get previous matches with users
    React.useEffect(() => {
      
      const fetchMatches = async () => {
        const res = await axios.get(
          `http://localhost:3001/matches?user_id=${user.id}`);
          setMatches(res.data)
      };
      fetchMatches();
    }, [user.id]);

  return (
    <div className="profile-page">
      {reportModal?
      <ReportIssueModal/>:null}
      { firstTime ? <AdditionalInfo /> : null}
      {settingsModal? <SettingsModal/>: null}
      <div className="sections">
        <div className="left-section">
          <div className="profile-pic">
            {user.image}
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
            <button className="settings-btn" onClick = {toggleSettingsModal}>Settings</button>
          </div>

          <div className="report-issue">
            <li onClick = {toggleReportModal}><b>Report issue</b></li>
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
      {/* Preference Modal */}
      {prefModal && (isLoading == false) ? (
        <div
          className="preference-modal-container"
        >
          <div className="preference-modal">
            <div className="preference-header">
              <div className="header">
                <h1>Are you studying or working?</h1>
              </div>
              <div className="close-container">
                <button className="close-modal" onClick={togglePrefModal}> 
                  x
                </button>
              </div>
            </div>
            
            <div className="preference-form-wrapper">
              {isStudying?<div className="preference-study-form">
              <div className ="sub-header"> Study </div>
                <ul>
                <li>
                    <span>
                    <label> What are you studying? </label>
                    <select className="form-input" name="topic" placeholder="Select topic" onChange={handleOnChangeTopic}>
                        <option value={""} selected>Select Topic of Study</option>
                        <option value={"Mathematics"}>Mathematics</option>
                        <option value={"Computer Science"}>Electrical Engineering</option>
                        <option value={"Biology"}>Biology</option>
                        <option value={"Chemistry"}>Chemistry</option>
                    </select>
                    </span>
                  </li>
                <li>
                  <span>
                    <label>Subject/Course</label>
                    <select className="form-input" name="subject" placeholder="Select Subject" onChange={handleOnChangeSubject}>
                        <option value={""} selected>Select a Subject</option>
                        <option value={"Intro to programmings"}>Intro to programming</option>
                        <option value={"Calculus 1"}>Calculus 1</option>
                        <option value={"Intro to Biology"}>Intro to biology</option>
                        <option value={"Organic Chemistry"}>Organic chemistry</option>
                    </select>
                    </span>
                  </li>
                </ul>
              </div>:(isWorking ? <div className="preference-work-form">
                <div className ="sub-header"> Work </div>
                <ul>
                <li>
                  <span>
                    <label>Industry</label>
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
                    <label>What are you working on?</label>
                    <select className="form-input" name="type-of-work" placeholder="Select type of work" onChange={handleOnChangeWork}>
                        <option value={""} selected>Type of Work</option>
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
            <button className="find" onClick={handleOnSubmit}> Find a buddy</button>
          </div>
        </div>
      ) : 
      // Loading Modal
      (isLoading ? 
        <div className="loading-container">
        <div className="content">
          <div className="header">
            <div className="button-container">
              <button className="close" onClick={closeModal}> x </button>
            </div>
          </div>
          <h1>Finding you a Match...</h1>
          <p> If it's taking a while to find a match, it's possible there's no one online. </p>
          <p> If that's the case, please try again later. Press the X to exit the queue. </p>
        </div>
    </div> : null)}
    </div>
  );
}

