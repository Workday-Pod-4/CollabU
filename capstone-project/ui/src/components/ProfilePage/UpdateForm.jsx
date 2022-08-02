import * as React from "react"
import apiClient from "../../services/apiClient"
import { useAuthContext } from "../../contexts/auth"
import "./UpdateForm.css"

export default function UpdateForm() {

  const { user, setUser, setIsUpdating} = useAuthContext()

  const [isProcessing, setIsProcessing] = React.useState(false)
  const [error, setError] = React.useState("")

  const [form, setForm] = React.useState({ 
  "firstName" : `${user?.first_name && user.first_name != "null" && user.first_name != "" ? user.first_name : ""}`, 
  "lastName" : `${user?.last_name && user.last_name != "null" && user.last_name != "" ? user.last_name : ""}`, 
  "username": `${user?.username && user.username != "null" && user.username != "" ? user.username : ""}`, 
  "location" : `${user?.location && user.location != "null" && user.location != "" ? user.location : ""}`,
  "timezone": `${user?.timezone && user.timezone != "null" && user.timezone != "" ? user.timezone: ""}`,
  "college" : `${user?.college && user.college != "null" && user.ccollege != "" ? user.college : ""}`,
  "major" : `${user?.major && user.major != "null" && user.major != "" ? user.major : ""}`, 
  "workTitle": `${user?.workTitle && user.workTitle != "null" && user.workTitle != "" ? user.workTitle : ""}`, 
  "company": `${user?.company && user.company != "null" && user.company != "" ? user.company : ""}`, 
  "profilePic": `${user?.profile_image_url && user.profile_image_url != "null" && user.profile_image_url != "" ? user.profile_image_url : ""}`, 
  "socialMedia1": `${user?.social_media_link_1 && user.social_media_link_1 != "null" && user.social_media_link_1 != "" ? user.social_media_link_1 : ""}`, 
  "socialMedia2": `${user?.social_media_link_2 && user.social_media_link_2 != "null" && user.social_media_link_2 != "" ? user.social_media_link_2 : ""}`, 
  "socialMedia3": `${user?.social_media_link_3 && user.social_media_link_3 != "null" && user.social_media_link_3 != "" ? user.social_media_link_3 : ""}`})

  function handleOnChange(evt) {
    setForm((f) => ({...f, [evt.target.name]: evt.target.value}))
  }

  async function updateUser(evt) {
     evt.preventDefault()
     setIsProcessing(true);

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
        profile_image_url: form.profilePic,
        social_media_link_1: form.socialMedia1,
        social_media_link_2: form.socialMedia2,
        social_media_link_3: form.socialMedia3
     })
    if(error) setError("Error trying to update your information")
    
    if(data?.user) {
      setUser(data.user)
      setIsUpdating(false)
    }
    setIsUpdating(false);
    setIsProcessing(false);
  }

    return (
        <div className="update-container">
            <div className="update-form">
                <div className="input-fields">
                    <div className="column">
                        <div className="split-input-field">
                            <div className="input-field">
                                <label>First Name</label>
                                <input className="form-input" type="text" name="firstName" placeholder="First Name" onChange={handleOnChange} defaultValue={form?.firstName} required="required"></input>
                            </div>
                            <div className="input-field">
                                <label>Last Name</label>
                                <input className="form-input" type="text" name="lastName" placeholder="Last Name" onChange={handleOnChange} defaultValue={form.lastName} required="required"></input>
                            </div>
                        </div>
                        <div className="input-field">
                            <label>Username</label>
                            <input className="form-input" type="text" name="username" placeholder="Username" onChange={handleOnChange} defaultValue={form.username} required="required"></input>
                        </div>
                        <div className="input-field">
                            <label>Profile Picture</label>
                            <input className="form-input" type="text" name="profilePic" placeholder="Place the link to an image" onChange={handleOnChange} defaultValue={form.profilePic}></input>
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
                            <label>Location</label>
                            <input className="form-input" type="text" name="location" placeholder="Location" onChange={handleOnChange} defaultValue={form.location}></input>
                        </div>
                    </div>
                    <div className="column">
                        <div className="input-field">
                            <label>Timezone</label>
                            <select className="form-input" name="timezone" placeholder="Timezone" onChange={handleOnChange} defaultValue={form.timezone}>
                                <option value={"EST"}>EST</option>
                                <option value={"PST"}>PST</option>
                                <option value={"UCT"}>UCT</option>
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
                            <label>Social Link 1</label>
                            <input className="form-input" type="text" name="socialMedia1" placeholder="External profile or portfolio" onChange={handleOnChange} defaultValue={form.socialMedia1}></input>
                        </div>
                        <div className="input-field">
                            <label>Social Link 2</label>
                            <input className="form-input" type="text" name="socialMedia2" placeholder="External profile or portfolio" onChange={handleOnChange} defaultValue={form.socialMedia2}></input>
                        </div>
                        <div className="input-field">
                            <label>Social Link 3</label>
                            <input className="form-input" type="text" name="socialMedia3" placeholder="External profile or portfolio" onChange={handleOnChange} defaultValue={form.socialMedia3}></input>
                        </div>
                    </div> 
                </div>
                <button className="btn" onClick={updateUser}>Update</button>
            </div>
        </div>
      
    )
  }