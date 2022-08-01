import * as React from "react";
import { useForm, ValidationError } from '@formspree/react';
import { useAuthContext } from "../../contexts/auth";
import "./ReportIssueModal.css";


export default function ReportIssueModal() {
  const [state, handleSubmit] = useForm("xyyorrjy");
  const [form, setForm] = React.useState({ "message": ""})
  const {toggleReportModal } = useAuthContext();
  function handleOnChange(evt){
    setForm((f) => ({...f, [evt.target.name]: evt.target.value}))
  }

    return(
    <div className="report-issue-modal-container">
      <div className="report-issue-modal">
        <div className="report-issue-header">
          <h1>Report Issue</h1>
        </div>
        <li onClick = {toggleReportModal} className="close-report-issue-modal" >
          x
        </li>
        <div className="report-issue-form-wrapper">
            <div className = "report-issue-form">
            <div className = "content">
            <form onSubmit={handleSubmit}>
              <div className="email-input" >
                <label htmlFor="email"/>
                  <input className="form-input"  type="text" name="email" placeholder="Email" onChange={handleOnChange} defaultValue={form.firstName}></input>
                  
                  <p className = "validation-error"> <ValidationError prefix="Email" field="email" errors={state.errors}/></p>
              </div>

            <div className="message-input">
              <textarea id ="message" name="message" className="form-input" type="text" placeholder="Leave your message here..." onChange={handleOnChange} value={form.message} />
              <ValidationError prefix="Message" field="message"errors={state.errors}/>
            </div>
            <button type="submit" disabled={state.submitting}>Submit</button>
            </form>
            {state.succeeded?<p className = "report-issue-review">Thanks for letting us know, we will review this and get back to you shortly!</p>:null}
        </div>

        </div>
        </div>
        </div>
        </div>


















    )
}