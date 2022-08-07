import * as React from "react";

import { useForm, ValidationError } from '@formspree/react';

import "./ContactForm.css";

export default function ContactForm() {
  const [state, handleSubmit] = useForm("xyyorrjy");
  const [form, setForm] = React.useState({"name": "", "message": ""})

  function handleOnChange(evt){
    setForm((f) => ({...f, [evt.target.name]: evt.target.value}))
  }

  return (
    <div className = "contact-form">
        <div className = "content">
          <div className = "form-wrapper">
            <form onSubmit={handleSubmit}>
              <div className="input-field">
                <input className="form-input" type="text" name="name" placeholder="Enter Name" onChange={handleOnChange} defaultValue={form.name}></input>
              </div>
            <div className="input-field" >
                  <input className="form-input"  type="text" name="email" placeholder="Enter Email" onChange={handleOnChange} defaultValue=""></input>
            </div>
            <p className = "validation-error"> <ValidationError prefix="Email" field="email" errors={state.errors}/></p>
            <div className="message-input">
              <textarea id ="message" name="message" className="form-input" type="text" placeholder="Leave your message here..." onChange={handleOnChange} value={form.message} />
              <ValidationError prefix="Message" field="message"errors={state.errors}/>
            </div>
              <button className="submit-button" type="submit" disabled={state.submitting}>Submit</button>
            </form>
            {state.succeeded ? <p className = "thank-you">Thanks for getting in touch!</p> : null}
          </div>
        </div>
    </div>
  );
}
