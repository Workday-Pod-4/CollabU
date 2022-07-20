import * as React from "react"
import apiClient from "../../services/apiClient"
import { useAuthContext } from "../../contexts/auth"
import "./UpdateForm.css"

export default function UpdateForm() {

  const { user, setUser } = useAuthContext()

  const [isProcessing, setIsProcessing] = React.useState(false)
  const [error, setError] = React.useState("")

  const [form, setForm] = React.useState({ "firstName" : "", "lastName" : "", "username": "", "location" : "", "timezone": "", "college" : "", "major" : "", "workTitle": "", "company": "", "industry": ""})

  

  function handleOnChange(evt){
    setForm((f) => ({...f, [evt.target.name]: evt.target.value}))
  }

  async function updateUser(evt){
     evt.preventDefault()

     setIsProcessing(true);

    const { data, error } = await apiClient.updateUserInfo({ 
        first_name: form.firstName, 
        last_name: form.lastName, 
        username: form.username, 
        location: form.location, 
        timezone: form.timezone, 
        college: form.college, 
        major: form.major, 
        workTitle: form.workTitle, 
        company: form.company, 
        industry: form.industry })
    if(error) setError("Error trying to update your information")
    
    if(data?.user) {
      setUser(data.user)
    }

    setIsProcessing(false)
  }

    return (
      <div className="update-form">
        <div className="split-input-field">
            <div className="input-field">
                <input className="form-input" type="text" name="firstName" placeholder="First Name" onChange={handleOnChange} defaultValue={form.firstName}></input>
            </div>
            <div className="input-field">
                <input className="form-input" type="text" name="lastName" placeholder="Last Name" onChange={handleOnChange} defaultValue={form.lastName}></input>
            </div>
        </div>
        <div className="input-field">
            <label>Username</label>
            <input className="form-input" type="text" name="username" placeholder="Username" onChange={handleOnChange} defaultValue={form.username}></input>
        </div>
        <div className="input-field">
            <label>Location</label>
            <input className="form-input" type="text" name="location" placeholder="Location" onChange={handleOnChange} defaultValue={form.location}></input>
        </div>
        <div className="input-field">
            <label>Timezone</label>
            <select className="form-input" name="timezone" placeholder="Timezone" onChange={handleOnChange} defaultValue={form.timezone}>
                <option value={"et"}>ET</option>
                <option value={"pt"}>PT</option>
                <option value={"uct"}>UCT</option>
            </select>
        </div>
        <div className="input-field">
            <label>College</label>
            <select className="form-input" name="college" placeholder="College" onChange={handleOnChange} defaultValue={form.college}>
                <option value={"college1"}>College 1</option>
                <option value={"college2"}>Location 2</option>
                <option value={"college3"}>Location 3</option>
            </select>
        </div>
        <div className="input-field">
            <label>Major</label>
            <select className="form-input" name="major" placeholder="Major" onChange={handleOnChange} defaultValue={form.major}>
                <option value={"major1"}>Major 1</option>
                <option value={"major2"}>Major 2</option>
                <option value={"major3"}>Major 3</option>
            </select>
        </div>
        <div className="input-field">
            <label>Work Title</label>
            <select className="form-input" name="workTitle" placeholder="Work Title" onChange={handleOnChange} defaultValue={form.workTitle}>
                <option value={"worktitle1"}>Work Title 1</option>
                <option value={"worktitle2"}>Work Title 2</option>
                <option value={"worktitle3"}>Work Title 3</option>
            </select>
        </div>
        <div className="input-field">
            <label>Company</label>
            <input className="form-input" type="text" name="company" placeholder="Company" onChange={handleOnChange} defaultValue={form.company}></input>
        </div>
        <div className="input-field">
            <label>Industry</label>
            <select className="form-input" name="industry" placeholder="Industry" onChange={handleOnChange} defaultValue={form.industry}>
                <option value={"industry1"}>Industry 1</option>
                <option value={"industry2"}>Industry 2</option>
                <option value={"industry3"}>Industry 3</option>
            </select>
        </div>
        <button className="btn" onClick={updateUser}>Update</button>
      </div>
    )
  }