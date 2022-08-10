import * as React from "react";
import axios from "axios";
import { useAuthContext } from "../../contexts/auth";
import { io } from "socket.io-client";
import UpdateForm from "./UpdateForm";
import AdditionalInfo from "./AdditionalInfo";
import SettingsModal from "../SettingsModal/SettingsModal";
import ReportIssueModal from "../ReportIssueModal/ReportIssueModal";
import MatchModal from "../MatchModal/MatchModal";
import "./ProfilePage.css";
import "./PreferenceModal.css";
import "./Loading.css";

export default function ProfilePage() {

  const {
    user,
    firstTime,
    isUpdating,
    setIsUpdating,
    isLoading,
    setIsLoading,
    settingsModal,
    toggleSettingsModal,
    matchModal,
    setMatchModal,
    reportModal,
    setReportModal,
    toggleReportModal,
    prefModal,
    setPrefModal,
    togglePrefModal,
    setInRoom,
  } = useAuthContext();

  // if user selects studying in preference modal it will display study preference form
  const [isStudying, setIsStudying] = React.useState(false);
  const [isWorking, setIsWorking] = React.useState(false);
  const [confirmUsername, setConfirmUsername] = React.useState();

  // updates and stores the previously matched section of the ProfilePage.jsx
  const [matches, setMatches] = React.useState([]);
  const [match, setMatch] = React.useState();
  const [selected, setSelected] = React.useState("");


  const mathCourses = [
    "Calculus I",
    "Calculus II",
    "Calculus III",
    "College Algebra",
    "Differential Equations",
    "Discrete Math",
    "Linear Algebra",
    "Pre-calculus",
    "Statistics",
    "Other",
  ];

  const csCourses = [
    "Data Structures",
    "Intro to Programming",
    "Java",
    "Programming I",
    "Programming II",
    "Programming III",
    "Other",
  ];

  const artCourses = [
    "2-D Design",
    "3-D Design",
    "Art History",
    "Beginning Drawing",
    "Contemporary Art",
    "Graphic Design",
    "Modern Art",
    "Other",
  ];

  const businessCourses = [
    "Business Analytics",
    "Business Intelligence",
    "Business Statistics",
    "Database Applications",
    "Database Systems",
    "Project Management",
    "Other",
  ];

  const dsCourses = [
    "Big Data",
    "Foundations of Data Science",
    "Intro to Data Mining",
    "Intro to Deep Learning",
    "Other",
  ];

  const litCourses = [
    "American Literature",
    "Introduction to Linguistics",
    "Introduction to Writing Studies",
    "Narrative Techniques",
    "Writing and Rethoric",
    "Other",
  ];

  const scienceCourses = [
    "Anatomy",
    "Cell Biology",
    "General Biochemistry",
    "General Biology",
    "General Chemistry",
    "General Physics",
    "Genetics",
    "Organic Chemistry",
    "Physics with Calculus",
    "Quantum Mechanics",
    "Statics",
    "Thermodynamics",
    "Other",
  ];

  const techWork = [
    "Software Development",
    "Software Application",
    "Web Design",
    "Web Development",
    "Other",
  ];

  const entertainmentWork = ["Entertaining", "Other"];

  const healthWork = ["Data Entry", "Saving People", "Paperwork", "Other"];

  const artsWork = ["Editing Photographies", "Other"];

  const businessWork = ["Paperwork", "Other"];

  const lawWork = ["Arresting Someone", "Other"];

  const edWork = ["Grading", "Syllabus Planning", "Other"];

  // if user clicks study, set isStudying = true and isWorking = false
  function handleToggleStudy() {
    user.activity = "studying";
    user.industry = undefined;
    user.workType = undefined;
    setIsWorking(false);
    setIsStudying(true);
  }

  //if user clicks work, set isWorking = true and isStudying = false
  function handleToggleWork() {
    user.activity = "working";
    user.topic = undefined;
    user.subject = undefined;
    setIsStudying(false);
    setIsWorking(true);
  }

  //if user toggles match modal

  function toggleMatchModal(e) {
    setMatch((e.target.innerHTML).split(" |")[0])
    setMatchModal(!matchModal)
  }

    // set topic property based on user input
    function handleOnChangeTopic(event) {
      user.topic = event.target.value;
      setSelected(event.target.value);
    }

    // set subject property based on user input
    function handleOnChangeSubject(event) {
      user.subject = event.target.value;
    }

    // set industry property based on user input
    function handleOnChangeIndustry(event) {
      user.industry = event.target.value;
      setSelected(event.target.value);
    }

    // set workType property based on user input
    function handleOnChangeWork(event) {
      user.workType = event.target.value;
    }

    // sends user info back to server for matching
    function handleOnSubmit(event) {
      event.preventDefault();
      setIsLoading(true);
      client.current.emit("submit", { user });
    }

    // closes Find A Match modal and removes users from queue
    function closeModal() {
      client.current.emit("remove", { user });
      setIsLoading(false);
      togglePrefModal();
    }

    const client = React.useRef();

    React.useEffect(() => {
      const socket = io("http://localhost:3001");

      client.current = socket;

      setInRoom(false);

      socket.on("redirectToRoom", (roomURL) => {
        setIsLoading(false);
        // redirect to new URL
        window.location = roomURL;
      });

      socket.on("disconnect", () => {
        socket.removeAllListeners();
      });

      return () => socket.disconnect();
    }, []);

    // Get previous matches with users
    React.useEffect(() => {
      const fetchMatches = async () => {
        const res = await axios.get(
          `http://localhost:3001/matches?user_id=${user.id}`
        );
        setMatches(res.data);
      };
      fetchMatches();
    }, [user.id]);

    let workType = null;

    let workOptions = null;

    let studyType = null;

    let studyOptions = null;

    if (selected === "Mathematics") {
      studyType = mathCourses;
    } else if (selected === "Computer Science") {
      studyType = csCourses;
    } else if (selected === "Art") {
      studyType = artCourses;
    } else if (selected === "Business") {
      studyType = businessCourses;
    } else if (selected === "Data Science") {
      studyType = dsCourses;
    } else if (selected === "Literature") {
      studyType = litCourses;
    } else if (selected === "Science") {
      studyType = scienceCourses;
    }

    if (studyType) {
      studyOptions = studyType.map((opt) => <option value={opt}>{opt}</option>);
    }

    if (selected === "Technology") {
      workType = techWork;
    } else if (selected === "Entertainment") {
      workType = entertainmentWork;
    } else if (selected === "Health") {
      workType = healthWork;
    } else if (selected === "Arts") {
      workType = artsWork;
    } else if (selected === "Business") {
      workType = businessWork;
    } else if (selected === "Law Enforcement") {
      workType = lawWork;
    } else if (selected === "Education") {
      workType = edWork;
    }

    if (workType) {
      workOptions = workType.map((opt) => <option value={opt}>{opt}</option>);
    }

    //function for capitilizing first letter of strings (names)
    function CapitalizeName(str) {
      const newStr = str.charAt(0).toUpperCase() + str.slice(1);
      return newStr;
    }

    function parseLink(str){
      if(!str.includes("https://")){
        return " "
      }
      else if (str && str.includes("www")){
        const newLink = str.split(".")
        console.log(" 1 link www:", newLink)
        return newLink[1]
      }else if(str && !str.includes("www")){
        console.log("2")
        console.log("important:",str.split("/")[2] )
        const newLink = str.split("/")[2]
        if(newLink.includes(".com")){
          console.log("newLink.com:", newLink.split(".")[0])
          return newLink.split(".")[0]
          
          }else{
            console.log("3")
            return newLink[0];
          }
        }else if (!str){
          console.log("4")
        return str
      }
    }

  
    return (
      <div className="profile-page">
        {matchModal ? (
          <MatchModal
            CapitalizeName={CapitalizeName}
            toggleMatchModal={toggleMatchModal}
            Match={match}
            matches={matches}
          />
        ) : null}
        {reportModal ? <ReportIssueModal /> : null}
        {firstTime ? <AdditionalInfo /> : null}
        {settingsModal ? <SettingsModal /> : null}
        <div className="sections">
          <div className="left-section">
            <div className="profile-pic">
              {user.image}
              <img
                src={
                  user?.profile_image_url
                    ? user.profile_image_url
                    : "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"
                }
                onError={(event) => {
                  event.target.onError = "";
                  event.target.src =
                    "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg";
                  return true;
                }}
                alt="Profile Picture"
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
              {user?.location ? <b>{user.location}</b> : null}
              {user?.timezone ? <b> | {user.timezone}</b> : null}
            </div>
            <div className="social-media-links">
              <ul>
                {user?.social_media_link_1 ? (
                  <li className="link-1">
                    <a
                      href={`${user.social_media_link_1}`}
                      target="_blank"
                    >
                      {parseLink(user.social_media_link_1)?(parseLink(user.social_media_link_1)): null}
                    </a>
                  </li>
                ) : null}
                {user?.social_media_link_2 ? (
                  <li className="link-2">
                    <a
                      href={`${user.social_media_link_2}`}
                      target="_blank"
                    >
                      {parseLink(user.social_media_link_2)?(parseLink(user.social_media_link_2)): null}
                    </a>
                  </li>
                ) : null}
                {user?.social_media_link_3? (
                  <li className="link-3">
                    <a
                      href={`${user.social_media_link_3}`}
                      target="_blank"
                    >
                  {parseLink(user.social_media_link_3)?(parseLink(user.social_media_link_3)): null}
                    </a>
                  </li>
                ) : null}
              </ul>
            </div>
            <div className="settings">
              <button className="settings-btn" onClick={toggleSettingsModal}>
                Settings
              </button>
            </div>
            <div className="report-issue">
              <li onClick={toggleReportModal}>
                <b>Report issue</b>
              </li>
            </div>
          </div>
          <div
            className={isUpdating ? "middle-section-open" : "middle-section"}
          >
            {isUpdating ? (
              <UpdateForm />
            ) : (
              <div className="info-cards">
                <div className="work-card">
                  <div className="job-title-row">
                    {user?.job_title ? (
                      <b>{user.job_title}</b>
                    ) : (
                      <b>Insert your Work Title</b>
                    )}
                  </div>
                  <div className="company-row">
                    <p>at</p>
                    {user?.company ? (
                      <b>{user.company}</b>
                    ) : (
                      <b>Add Your Company!</b>
                    )}
                  </div>
                </div>
                {user?.major || user?.college ? (
                  <div className="school-card">
                    <b>{user.major} student</b>
                    <p>at</p>
                    <b>{user.college}</b>
                  </div>
                ) : null}
                <div className="update-btn-container">
                  <button
                    className="update-btn"
                    onClick={() => setIsUpdating(true)}
                  >
                    Update
                  </button>
                </div>
              </div>
            )}
          </div>
          {isUpdating ? null : (
            <div className="right-section">
              <h1>Match History</h1>
              <div className="match-history">
                <ul>
                  {matches.map((match, idx) => {
                    return (
                      <>
                        <li>
                          <img
                            src={
                              match?.profile_image_url
                                ? match.profile_image_url
                                : "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"
                            }
                            onError={(event) => {
                              event.target.onError = "";
                              event.target.src =
                                "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg";
                              return true;
                            }}
                            alt="img"
                            width="70px"
                            height="70px"
                          />
                          <span onClick={toggleMatchModal}>
                            {match.username} |{" "}
                            {CapitalizeName(match.first_name)}{" "}
                            {CapitalizeName(match.last_name)}
                          </span>
                        </li>
                      </>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>
        {/* Preference Modal */}
        {prefModal && isLoading == false ? (
          <div className="preference-modal-container">
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
                {isStudying ? (
                  <div className="preference-study-form">
                    <div className="sub-header"> Study </div>
                    <ul>
                      <li>
                        <span>
                          <label> What are you studying? </label>
                          <select
                            className="form-input"
                            name="topic"
                            placeholder="Select topic"
                            onChange={handleOnChangeTopic}
                          >
                            <option value={""} selected>
                              Select Topic of Study
                            </option>
                            <option value={"Art"}>Art</option>
                            <option value={"Business"}>Business</option>
                            <option value={"Computer Science"}>
                              Computer Science
                            </option>
                            <option value={"Data Science"}>Data Science</option>
                            <option value={"Literature"}>Literature</option>
                            <option value={"Mathematics"}>Mathematics</option>
                            <option value={"Science"}>Science</option>
                          </select>
                        </span>
                      </li>
                      <li>
                        <span>
                          <label>Subject/Course</label>
                          <select
                            className="form-input"
                            name="subject"
                            placeholder="Select Subject"
                            onChange={handleOnChangeSubject}
                          >
                            <option value={""} selected>
                              Select a Subject
                            </option>
                            {studyOptions}
                          </select>
                        </span>
                      </li>
                    </ul>
                  </div>
                ) : isWorking ? (
                  <div className="preference-work-form">
                    <div className="sub-header"> Work </div>
                    <ul>
                      <li>
                        <span>
                          <label>Industry</label>
                          <select
                            className="form-input"
                            name="industry"
                            placeholder="Select industry"
                            onChange={handleOnChangeIndustry}
                          >
                            <option value={""} selected>
                              Select an Industry
                            </option>
                            <option value={"Arts"}>Arts</option>
                            <option value={"Business"}>Business</option>
                            <option value={"Education"}>Education</option>
                            <option value={"Law Enforcement"}>
                              Law Enforcement
                            </option>
                            <option value={"Entertainment"}>
                              Entertainment
                            </option>
                            <option value={"Health"}>Health</option>
                            <option value={"Technology"}>Technology</option>
                          </select>
                        </span>
                      </li>
                      <li>
                        <span>
                          <label>What are you working on?</label>
                          <select
                            className="form-input"
                            name="type-of-work"
                            placeholder="Select type of work"
                            onChange={handleOnChangeWork}
                          >
                            <option value={""} selected>
                              Type of Work
                            </option>
                            {workOptions}
                          </select>
                        </span>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div className="preference-btns">
                    <button className="study-btn" onClick={handleToggleStudy}>
                      {" "}
                      Studying
                    </button>
                    <button className="work-btn" onClick={handleToggleWork}>
                      {" "}
                      Working
                    </button>
                  </div>
                )}
              </div>
              {isStudying || isWorking ? (
                <button
                  id="back-btn"
                  onClick={() => {
                    setIsStudying(false);
                    setIsWorking(false);
                  }}
                >
                  {" "}
                  Back
                </button>
              ) : null}
              <button className="find" onClick={handleOnSubmit}>
                {" "}
                Find a buddy
              </button>
            </div>
          </div>
          ) : // Loading Modal
          isLoading ? (
          <div className="loading-container">
            <div className="content">
              <div className="header">
                <div className="button-container">
                  <button className="close" onClick={closeModal}>
                    {" "}
                    x{" "}
                  </button>
                </div>
              </div>
              <h1>Finding you a Match...</h1>
              <p> If it's taking a while to find a match, it's possible there's no one online. </p>
              <p> If that's the case, please try again later. Press the X to exit the queue. </p>
            </div>
          </div> 
          ):
           null}
    </div>
);
}
