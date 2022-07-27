import * as React from "react";
import { Link } from "react-router-dom";
import "./ProfilePage.css";
import apiClient from "../../services/apiClient";
import { useAuthContext } from "../../contexts/auth";
import PreferenceModal from "../PreferenceModal/PreferenceModal";
import UpdateForm from "./UpdateForm";
import AdditionalInfo from "./AdditionalInfo"
import SettingsModal from "../SettingsModal/SettingsModal";
export default function ProfilePage() {
  const { user , firstTime, isUpdating, setIsUpdating} = useAuthContext();
  const {settingsModal, toggleSettingsModal} = useAuthContext();




  
  React.useEffect(() => {


  }, [user, isUpdating]);

  return (
    <div className="profile-page">
      { firstTime ? <AdditionalInfo /> : null}
      {settingsModal?<SettingsModal/>: null}
      <PreferenceModal/>
      <h1>Information</h1>
      <div className="sections">
        <div className="left-section">
          <div className="profile-pic">
            <img
              src="https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"
              height="150px"
              width="150px"
            />
            {/* <img
              src={user.image}
              height="150px"
              width="150px"
            /> */}
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
                  {/* <a href = {`${user.social_media_link_2}`}/> */}
                  <a href={user.social_media_link_1}>
                    <span>{user.social_media_link_1}</span>
                  </a>
                </li>
              :
                null
              }
              {user?.social_media_link_2 ?
                <li className="link-2">
                  {/* <a href = {`${user.social_media_link_2}`}/> */}
                  <a href={user.social_media_link_2}>
                    <span>{user.social_media_link_2}</span>
                  </a>
                </li>
              :
                null
              }
              
              {user?.social_media_link_3 ?
                <li className="link-3">
                  {/* <a href = {`${user.social_media_link_2}`}/> */}
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
    </div>
  );
}

