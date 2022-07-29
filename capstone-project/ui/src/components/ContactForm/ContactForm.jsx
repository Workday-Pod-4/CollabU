import * as React from "react";

import { Link } from "react-router-dom";
import { useForm, ValidationError } from '@formspree/react';

import "./ContactForm.css";

export default function ContactForm() {
  const [state, handleSubmit] = useForm("xyyorrjy");
  const [form, setForm] = React.useState({"firstName" : "", "lastName" : "", "message": ""})

  function handleOnChange(evt){
    setForm((f) => ({...f, [evt.target.name]: evt.target.value}))
  }

  return (
    <div className = "contact-form">
        <div className = "content">
          <div className = "form-wrapper">
            <form onSubmit={handleSubmit}>
              <div className="email-input" >
                <label htmlFor="email"/>
                  <input className="form-input"  type="text" name="email" placeholder="Email" onChange={handleOnChange} defaultValue={form.firstName}></input>
                  
                  <p className = "validation-error"> <ValidationError prefix="Email" field="email" errors={state.errors}/></p>
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
              <textarea id ="message" name="message" className="form-input" type="text" placeholder="Leave your message here..." onChange={handleOnChange} value={form.message} />
              <ValidationError prefix="Message" field="message"errors={state.errors}/>
            </div>
            <button type="submit" disabled={state.submitting}>Submit</button>
            </form>
            {state.succeeded?<p className = "thank-you">Thanks for getting in touch!</p>:null}
          </div>
        </div>
    </div>
  );
}
