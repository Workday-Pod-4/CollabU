import * as React from "react";
import "./ContactUs.css";
import ContactCard from "../ContactCard/ContactCard";
import ContactForm from "../ContactForm/ContactForm";

export default function ContactUs() {
  
  return (
    <div className="contact-us">
      <h1>Contact Us</h1>
      <div className="content">
          <ContactForm />
          <ContactCard />
      </div>
    </div>
  );
}
