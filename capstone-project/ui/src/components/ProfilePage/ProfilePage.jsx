import * as React from "react";
import { Link } from "react-router-dom";
import "./ProfilePage.css";
import apiClient from "../../services/apiClient";
import { useAuthContext } from "../../contexts/auth";

export default function ProfilePage() {
  const { user } = useAuthContext();

  React.useEffect(() => {
    console.log("userInfo:", user);
    console.log("user-social:", user.social_media_link_1);
  }, [user]);

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <div className="sections">
        <div className="left-section">
          <h1>left-section</h1>
          <div className="profile-pic">
            <img
              src="https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"
              height="150px"
              width="150px"
            />
            {/* <form action="/action_page.php">
              <input type="file" id="myFile" name="filename" />
              <input type="submit" />
            </form> */}
          </div>
          <div className="profile-name">
            <h2>
              {user.first_name} {user.last_name}
            </h2>
          </div>
          <div className="location">
            <b> | {user.timezone}</b>
          </div>
          <div className="social-media-links">
            <ul>
              <li className="link-1">{user.email}</li>
              <li className="link-2">
                {/* <a href = {`${user.social_media_link_2}`}/> */}
                <a href={user.social_media_link_1}>
                  <span>Visit page</span>
                </a>
              </li>
              <li className="link-3">
                <a href={user.social_media_link_1}>
                  <span>Visit page</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="settings">
            <button className="settings-btn">Settings</button>
          </div>

          <div className="report-issue">
            <b>report issue</b>
          </div>
        </div>

        <div className="middle-section">
          <h1> middle-section</h1>
          <div className="info-cards">
            <div className="work-card">
              <b>{user.job_title}</b>
              <b>at</b>
              <b>{user.company}</b>
            </div>

            <div className="school-card">
            <b>{user.major} student</b>
              <b>at</b>
              <b>{user.college}</b>
            </div>
          </div>
        </div>

        <div className="right-section">
          <h1>right-section</h1>
          <div className="match-history">
            <p>right</p>
          </div>
        </div>
      </div>
    </div>
  );
}
