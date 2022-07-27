import * as React from "react";
import "./SettingsModal.css";
import { useAuthContext } from "../../contexts/auth";
import apiClient from "../../services/apiClient";

export default function SettingsModal() {
  const {
    toggleSettingsModal,
    settingsModal,
    setSettingsModal,
    user,
    error,
    setError,
  } = useAuthContext();
  const [form, setForm] = React.useState({
    email: "",
    username: "",
    password: "",
    confirmNewPassword: "",
    newPassword: "",
  });

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
        </div>
      </div>
    </div>
  );
}
