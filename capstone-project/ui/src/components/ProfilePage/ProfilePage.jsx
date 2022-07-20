import * as React from "react";
import { Link } from "react-router-dom";
import "./ProfilePage.css";
import apiClient from "../../services/apiClient";
import { useAuthContext } from "../../contexts/auth";

export default function ProfilePage() {
  const { user } = useAuthContext();

  React.useEffect(() => {
    console.log("userInfo:", user);
  }, [user]);

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      <div className="sections">
        <div className="left-section">
          <h1>left-section</h1>
          <div className="profile-pic">
            <p>Profile img</p>
          </div>
          <div className = "profile-name">
            <h2>{user.first_name}  {user.last_name}</h2>
          </div>
        </div>

        <div className="middle-section">
          <h1> middle-section</h1>
          <div className="info-cards">
            <p>middle</p>
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
