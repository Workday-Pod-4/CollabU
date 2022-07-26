import * as React from "react";
import "./SettingsModal.css";

export default function SettingsModal() {
    // function handleOnChange(evt){


    // }
    
    // function resetPassword(){
    
    // }

  return (
    <div className="settings-modal-container">
      <div className="modal">
        <div className="header">
          <h1>Settings</h1>
        </div>
        <div className="settings-form-wrapper">
          <div className="password-reset-form">
            <ul>
              <li>
                <span>
                  <label>Current Password</label>
                  <input className="form-input" type="password" name="current-password-reset" placeholder="Current Password" defaultValue="" ></input>
                </span>
              </li>
              <li>
                <span>
                  <label>New Password</label>
                  <input className="form-input" type="password" name="new-password-reset" placeholder="New Password" defaultValue=""></input>
                </span>
              </li>
              <li>
                <span>
                  <label>Confirm New Password</label>
                  <input className="form-input" type="password" name="confirm-new-password-reset" placeholder="New Password" defaultValue=""></input>
                </span>
              </li>
            </ul>
            <button className="settings-update-btn">Update</button>
          </div>
        </div>
      </div>
    </div>
  );
}
