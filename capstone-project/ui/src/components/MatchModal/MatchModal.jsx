import * as React from "react";
import { useAuthContext } from "../../contexts/auth";
import "./MatchModal.css";

export default function MatchModal({ matches, Match, toggleMatchModal }) {
  const { matchModal, setMatchModal } = useAuthContext();

  // filtering matches array to include only object where username is equal to username in onClick event
  let UserInfo = matches.filter((match) => match.username == Match);
  UserInfo = UserInfo[0];


  return (
    <div className="match-modal-container">
      <div className="match-modal">
        <div className="match-modal-header">
          <button className="close-match-modal" onClick={toggleMatchModal}>
            x
          </button>
        </div>
        <div className="content">
          <img
            className="match-modal-img"
            src="https://s-media-cache-ak0.pinimg.com/736x/f0/d3/5f/f0d35ff9618e0ac7c0ec929c8129a39d.jpg"
            alt="img"
          ></img>
          <div className="match-name">
            <div className="match-first-name">{UserInfo.first_name}</div>
            <div className="match-last-name">{UserInfo.last_name}</div>
          </div>
          <div className = "match-location-timezone">
          <div className="match-location">{UserInfo.location}</div> |
          <div className = "match-timezone">{UserInfo.timezone}</div>
          </div>

        <div className = "work-information">
          {UserInfo.job_title=="undefined" && UserInfo.company == "undefined"? <><div className = "independent">Independent</div></> :null}
          {UserInfo.job_title!="undefined"? <><div className = "job-title"> {UserInfo.job_title}</div> </>: null}

          {UserInfo.job_title!="undefined"? <>at </>: null}
    
          {UserInfo.company!="undefined" && UserInfo.job_title!="undefined"? <div className = "job-company">{UserInfo.company} </div>:(UserInfo.job_title=="undefined" && UserInfo.company!="undefined"? <> <b>Works at</b> <div className = "job-company">{UserInfo.company}</div></>:null)}
        </div>

        <div className = "education-information">
         
        {UserInfo.major=="undefined" && UserInfo.college == "undefined" ? <><div className = "self-taught"> Self Taught </div></> :null}
        {UserInfo.major!="undefined"? <><div className = "student-major"> {UserInfo.major}</div> student </>: null}

          {UserInfo.major!="undefined"? <div> at </div>: null}
          {UserInfo.college!="undefined" && UserInfo.major!="undefined"? <> <div className = "student-college">{UserInfo.college} </div></>:(UserInfo.major=="undefined" && UserInfo.college!="undefined"? <> <b>Attends</b> <div className = "student-college">{UserInfo.college}</div></>:null)}
        </div>
        <div className = "match-social-media-links">
          <ul>
            <li><span className = "match-social-media-link1">{UserInfo.social_media_link_1}</span></li>
            <li><span className = "match-social-media-link2">{UserInfo.social_media_link_2}</span></li>
            <li><span className = "match-social-media-link3">{UserInfo.social_media_link_3}</span></li>
          </ul>
        </div>
        </div>
      </div>
    </div>
  );
}
