import * as React from "react";
import { Link } from "react-router-dom";
import "./ContactUs.css";
import ContactCard from "../ContactCard/ContactCard";
import ContactForm from "../ContactForm/ContactForm";
export default function ContactUs({}) {
  return (
    <div className="contact-us">
      <div className="content">
        <h1>Contact Us</h1>
        <div className="contactus-card">
        <ContactCard/>
        </div>

        <div className="contactus-form">
        <ContactForm/>
        </div>
      </div>
    </div>
  );
}
