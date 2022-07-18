import * as React from "react";
import { Link } from "react-router-dom";
import "./ContactForm.css";

export default function ContactForm({}) {
  return (
    <div className = "contact-form">
        <div className = "content">
        <div className = "form-wrapper">
        <input name="name" className="split-form-input" type="text" placeholder="first name" value="" />
        <input name="name" className="split-form-input" type="text" placeholder="last name" value=""/>
        <input name="name" className="message-form-input" type="text" placeholder="Leave your message here..." value=""/>
        </div>





        </div>
    </div>
  );
}
