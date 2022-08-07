import * as React from "react";
import { useAuthContext } from "../../contexts/auth";
import "./MatchModal.css";

export default function MatchModal({ matches, Match, toggleMatchModal, CapitalizeName}) {
  
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
            src={UserInfo?.profile_image_url ? UserInfo.profile_image_url : "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"}
              onError={(event) => {
                event.target.onError = "";
                event.target.src= "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"
                return true;
              }}
            alt="img"
          ></img>
          <div className="match-name">
            <div className="match-first-name">{CapitalizeName(UserInfo.first_name)}</div>
            <div className="match-last-name">{CapitalizeName(UserInfo.last_name)}</div>
          </div>
          <div className = "match-location-timezone">
          <div className="match-location">{UserInfo.location}</div> |
          <div className = "match-timezone">{UserInfo.timezone}</div>
          </div>

        <div className = "work-information">
          {UserInfo.job_title=="undefined" && UserInfo.company == "undefined"? <><p className = "independent">Independent</p></> :null}
          {UserInfo.job_title!="undefined"? <><p className = "job-title"> {UserInfo.job_title}</p> </>: null}

          {UserInfo.job_title!="undefined" && UserInfo.job_title!=""? <>at</>: null}
  
          {UserInfo.company!="undefined" && UserInfo.job_title!="undefined"? <> <p className = "job-company">{UserInfo.company} </p> <br></br></>:(UserInfo.job_title=="undefined" && UserInfo.company!="undefined"? <> <b>Works at</b> <p className = "job-company">{UserInfo.company}</p></>:null)}
        </div>

        <div className = "education-information">
         
        {UserInfo.major=="undefined" && UserInfo.college == "undefined" ? <><p className = "self-taught"> Self Taught </p></> :null}
        {UserInfo.major!="undefined"? <><p className = "student-major"> {UserInfo.major}</p> student </>: null}
          {UserInfo.major!="undefined"? <>at </>: null}
          {UserInfo.college!="undefined" && UserInfo.major!="undefined"? <> <p className = "student-college">{UserInfo.college} </p></>:(UserInfo.major=="undefined" && UserInfo.college!="undefined"? <> <b>Attends</b> <p className = "student-college">{UserInfo.college}</p></>:null)}
        </div>


        </div>
      </div>
    </div>
  );
}