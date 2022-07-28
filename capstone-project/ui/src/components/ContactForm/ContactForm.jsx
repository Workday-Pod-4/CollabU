import * as React from "react";
import { Link } from "react-router-dom";

import "./ContactForm.css";

export default function ContactForm() {

  const [form, setForm] = React.useState({"firstName" : "", "lastName" : "", "message": ""})

  function handleOnChange(evt){
    setForm((f) => ({...f, [evt.target.name]: evt.target.value}))
  }

  return (
    <div className = "contact-form">
        <div className = "content">
          <div className = "form-wrapper">
              <div className="email-input" >
                  <input className="form-input" type="text" name="email" placeholder="Email" onChange={handleOnChange} defaultValue={form.firstName}></input>
              </div>
            <div className="split-input-field">
              <div className="input-field">
                <input className="form-input" type="text" name="firstName" placeholder="First Name" onChange={handleOnChange} defaultValue={form.firstName}></input>
              </div>
              <div className="input-field">
                <input className="form-input" type="text" name="lastName" placeholder="Last Name" onChange={handleOnChange} defaultValue={form.lastName}></input>
              </div>
            </div>
            <div className="message-input">
              <input name="message" className="form-input" type="text" placeholder="Leave your message here..." onChange={handleOnChange} value={form.message} />
            </div>
          </div>
        </div>
    </div>
  );
}
