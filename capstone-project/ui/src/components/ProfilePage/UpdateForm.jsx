import * as React from "react"
import apiClient from "../../services/apiClient"
import { useAuthContext } from "../../contexts/auth"
import "./UpdateForm.css"

export default function UpdateForm() {

  const { user, setUser, setIsUpdating} = useAuthContext()

  const [isProcessing, setIsProcessing] = React.useState(false)
  const [error, setError] = React.useState("")


  const [form, setForm] = React.useState({ "firstName" : `${user.first_name}`, "lastName" : `${user.last_name}`, "username": `${user.username}`, "location" : `${user.location}`, "timezone": `${user.timezone}`, "college" : `${user.college}`, "major" : `${user.major}`, "workTitle": `${user.job_title}`, "company": `${user.company}`, "industry": `${user.industry}`})

  

  function handleOnChange(evt){
    setForm((f) => ({...f, [evt.target.name]: evt.target.value}))
  }

  async function updateUser(evt){
     evt.preventDefault()

     setIsProcessing(true);
     console.log(user);

    const { data, error } = await apiClient.updateUserInfo({ 
        email: user.email,
        first_name: form.firstName, 
        last_name: form.lastName, 
        username: form.username, 
        location: form.location, 
        timezone: form.timezone, 
        college: form.college, 
        major: form.major, 
        job_title: form.workTitle, 
        company: form.company, 
        industry: form.industry })
    if(error) setError("Error trying to update your information")
    
    if(data?.user) {
      setUser(data.user)
      setIsUpdating(false)
    }

    setIsProcessing(false)
  }

    return (
        <div className="update-container">
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
                        <option value={"EST"}>EST</option>
                        <option value={"PST"}>PST</option>
                        <option value={"UCT"}>UCT</option>
                    </select>
                </div>
                <div className="input-field">
                    <label>College</label>
                    <select className="form-input" name="college" placeholder="College" onChange={handleOnChange} defaultValue={form.college}>
                        <option value={"College 1"}>College 1</option>
                        <option value={"College 2"}>College 2</option>
                        <option value={"College 3"}>College 3</option>
                    </select>
                </div>
                <div className="input-field">
                    <label>Major</label>
                    <select className="form-input" name="major" placeholder="Major" onChange={handleOnChange} defaultValue={form.major}>
                        <option value={"Major 1"}>Major 1</option>
                        <option value={"Major 2"}>Major 2</option>
                        <option value={"Major 3"}>Major 3</option>
                    </select>
                </div>
                <div className="input-field">
                    <label>Work Title</label>
                    <select className="form-input" name="workTitle" placeholder="Work Title" onChange={handleOnChange} defaultValue={form.workTitle}>
                        <option value={"Work Title 1"}>Work Title 1</option>
                        <option value={"Work Title 2"}>Work Title 2</option>
                        <option value={"Work Title 3"}>Work Title 3</option>
                    </select>
                </div>
                <div className="input-field">
                    <label>Company</label>
                    <input className="form-input" type="text" name="company" placeholder="Company" onChange={handleOnChange} defaultValue={form.company}></input>
                </div>
                <div className="input-field">
                    <label>Industry</label>
                    <select className="form-input" name="industry" placeholder="Industry" onChange={handleOnChange} defaultValue={form.industry}>
                        <option value={"Industry 1"}>Industry 1</option>
                        <option value={"Industry 2"}>Industry 2</option>
                        <option value={"Industry 3"}>Industry 3</option>
                    </select>
                </div>
                <button className="btn" onClick={updateUser}>Update</button>
            </div>
        </div>
      
    )
  }