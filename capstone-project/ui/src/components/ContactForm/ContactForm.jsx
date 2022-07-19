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
        <input name="firstName" className="split-form-input" type="text" placeholder="First name" onChange={handleOnChange} value={form.firstName} />
        <input name="lastName" className="split-form-input" type="text" placeholder="Last name" onChange={handleOnChange} value={form.lastName}/>
        <input name="message" className="message-form-input" type="text" placeholder="Leave your message here..." onChange={handleOnChange} value={form.message} />
        </div>
        </div>
    </div>
  );
}
