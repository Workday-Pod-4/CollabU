import * as React from "react";
import "./SettingsModal.css";
import { useAuthContext } from "../../contexts/auth";
import apiClient from "../../services/apiClient";
import { Navigate, useNavigate } from "react-router-dom"

export default function SettingsModal() {
  const {
    toggleSettingsModal,
    settingsModal,
    setSettingsModal,
    user,
    setUser,
    error,
    setError,
    logoutUser
  } = useAuthContext();
  const [form, setForm] = React.useState({
    email: "",
    username: "",
    password: "",
    confirmNewPassword: "",
    newPassword: "",
    confirmNewEmail: "",
    newEmail: ""
  });
  
  const navigate = useNavigate();
  const [changingPw, setChangingPw] = React.useState(false);
  const [changingEmail, setChangingEmail] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  function handleOnChange(evt) {
    setForm((f) => ({ ...f, [evt.target.name]: evt.target.value }));
  }

  async function resetPassword(evt) {
    evt.preventDefault();
    const { data, error } = await apiClient.updateUserPassword({
      email: user.email,
      username: user.username,
      password: form.password,
      confirmNewPassword: form.confirmNewPassword,
      newPassword: form.newPassword,
    });
    //closing settings modal if password is successfully changed
    setSettingsModal(!settingsModal);
    if (error) {
      setSettingsModal(settingsModal);
      setError(error);
    }
  }

  async function resetEmail(evt) {
    evt.preventDefault();
    const { data, error } = await apiClient.updateUserEmail({
      email: user.email,
      username: user.username,
      password: form.password,
      confirmNewEmail: form.confirmNewEmail,
      newEmail: form.newEmail
    });
    //closing settings modal if email is successfully changed
    setSettingsModal(!settingsModal);
    if (error) {
      setSettingsModal(settingsModal);
      setError(error);
    }
  }

  async function deleteAccount(evt) {
    evt.preventDefault();
    const { data, error } = await apiClient.deleteUser({
      email: user.email,
      password: form.password
    });
    logoutUser();
    navigate("/");
    //closing settings modal if email is successfully changed
    setSettingsModal(!settingsModal);
    if (error) {
      setSettingsModal(settingsModal);
      setError(error);
    }
  }

  return (
    <div className="settings-modal-container">
      <div className="settings-modal">
        <div className="settings-header">
          <h1>Settings</h1>
        </div>
        <li className="close-settings-modal" onClick={toggleSettingsModal}>
          x
        </li>
        <div className="settings-form-wrapper">
          {!changingPw && !changingEmail && !isDeleting ?
          <div className="main-options-container">
            <div className="change-password-container">
              <div className="change-password-button">
                <button className="change-password" onClick={() => {setChangingPw(true)}}>Change Password</button>
              </div>
            </div>
            <div className="change-email-container">
              <div className="change-email-button">
                <button className="change-email" onClick={() => {setChangingEmail(true)}}>Change Email</button>
              </div>
            </div>
            <div className="delete-acc-container">
              <div className="delete-acc-button">
                <button className="delete-acc" onClick={() => {setIsDeleting(true)}}>Delete Account</button>
              </div>
            </div>
          </div>
          :
          null
          }
          { changingPw ? 
          <div className="password-reset-form">
            <ul>
              <li>
                <span>
                  <label>Current Password</label>
                  <input
                    className="form-input"
                    type="password"
                    name="password"
                    placeholder="Current Password"
                    defaultValue={form.password}
                    onChange={handleOnChange}
                  ></input>

                  {error != "Password does not match." ? (
                    <p className="error">{error}</p>
                  ) : null}
                </span>
              </li>
              <li>
                <span>
                  <label>New Password</label>
                  <input
                    className="form-input"
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    defaultValue={form.newPassword}
                    onChange={handleOnChange}
                  ></input>

                  {error != "Invalid email/password" ? (
                    <p className="error">{error}</p>
                  ) : null}
                </span>
              </li>
              <li>
                <span>
                  <label>Confirm New Password</label>
                  <input
                    className="form-input"
                    type="password"
                    name="confirmNewPassword"
                    placeholder="New Password"
                    defaultValue={form.confirmNewPassword}
                    onChange={handleOnChange}
                  ></input>

                  {error != "Invalid email/password" ? (
                    <p className="error">{error}</p>
                  ) : null}
                </span>
              </li>
            </ul>
            <button className="settings-update-btn" onClick={resetPassword}>
              Update
            </button>
          </div>
          :
          changingEmail ?
          <div className="email-reset-form">
            <ul>
              <li>
                <span>
                  <label>Password</label>
                  <input
                    className="form-input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    defaultValue={form.password}
                    onChange={handleOnChange}
                  ></input>

                  {error != "Email does not match." ? (
                    <p className="error">{error}</p>
                  ) : null}
                </span>
              </li>
              <li>
                <span>
                  <label>New Email</label>
                  <input
                    className="form-input"
                    type="email"
                    name="newEmail"
                    placeholder="New Email"
                    defaultValue={form.newEmail}
                    onChange={handleOnChange}
                  ></input>

                  {error != "Invalid email/password" ? (
                    <p className="error">{error}</p>
                  ) : null}
                </span>
              </li>
              <li>
                <span>
                  <label>Confirm New Email</label>
                  <input
                    className="form-input"
                    type="email"
                    name="confirmNewEmail"
                    placeholder="New Email"
                    defaultValue={form.confirmNewEmail}
                    onChange={handleOnChange}
                  ></input>

                  {error != "Invalid email/password" ? (
                    <p className="error">{error}</p>
                  ) : null}
                </span>
              </li>
            </ul>
            <button className="settings-update-btn" onClick={resetEmail}>
              Update
            </button>
          </div>
          :
           isDeleting?
           <div className="delete-form">
              <h1>Are you sure?</h1>
              <p>This will delete your account and all its related information.</p>
              <ul>
                <li>
                  <span>
                    <label>Password</label>
                  <input
                    className="form-input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    defaultValue={form.password}
                    onChange={handleOnChange}
                  ></input>

                  {error != "Wrong password" ? (
                    <p className="error">{error}</p>
                  ) : null}
                  </span>
                </li>
            </ul>
            <button className="delete-account-button" onClick={deleteAccount}>
              Delete My Account
            </button>
          </div>
          :
          null
          }
        </div>
      </div>
    </div>
  );
}
