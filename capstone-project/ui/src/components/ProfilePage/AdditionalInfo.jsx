import * as React from "react"
import apiClient from "../../services/apiClient"
import { useAuthContext } from "../../contexts/auth"
import "./AdditionalInfo.css"

export default function AdditionalInfo() {

  const { user, setUser, setFirstTime } = useAuthContext()

  const [isProcessing, setIsProcessing] = React.useState(false)
  const [error, setError] = React.useState("")

  const [form, setForm] = React.useState({ "college" : "", "major" : "", "job_title": "", "yearsOfExperience" : "", "socialMediaLink1": "", "socialMediaLink2": "", "socialMediaLink3": ""})

  function handleOnChange(evt){
    setForm((f) => ({...f, [evt.target.name]: evt.target.value}))
  }

  async function saveInfo(evt){
     evt.preventDefault()

     setIsProcessing(true);

    const { data, error } = await apiClient.updateUserInfo({
        username: user.username,
        email: user.email,  
        college: form.college, 
        major: form.major, 
        job_title: form.workTitle, 
        years_of_experience: form.yearsOfExperience,
        social_media_link_1: form.socialMediaLink1,
        social_media_link_2: form.socialMediaLink2,
        social_media_link_3: form.socialMediaLink3
     })
    if(error) {
        setError("Error trying to update your information")
    }
    
    if(data?.user) {
      setUser(data.user)
      setFirstTime(false)
    }

    setFirstTime(false)

    setIsProcessing(false)
  }

    return (
        <div className="container" id="container">
            <div className="form-wrapper">
                <div className="header">
                    <h2>Additional Information</h2>
                </div>
                <div className="additional-form">
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
                        <label>Years of Experience</label>
                        <select className="form-input" name="yearsOfExperience" placeholder="Years of Experience" onChange={handleOnChange} defaultValue={form.yearsOfExperience}>
                            <option value={"0-2"}>0 - 2</option>
                            <option value={"3-9"}>3 - 9</option>
                            <option value={"10+"}>10+</option>
                        </select>
                    </div>
                    <div className="input-field">
                        <label>Social Links</label>
                        <input className="form-input" type="text" name="socialMediaLink1" placeholder="Social Link 1" onChange={handleOnChange} defaultValue={form.socialMediaLink1}></input>
                    </div>
                    <div className="input-field no-label">
                        <input className="form-input" type="text" name="socialMediaLink2" placeholder="Social Link 2" onChange={handleOnChange} defaultValue={form.socialMediaLink2}></input>
                    </div>
                    <div className="input-field no-label">
                        <input className="form-input" type="text" name="socialMediaLink3" placeholder="Social Link 3" onChange={handleOnChange} defaultValue={form.socialMediaLink3}></input>
                    </div>
                    <button className="btn" onClick={saveInfo}>Save</button>
                    <p className="close" onClick={saveInfo}>Skip for now!</p>
                </div>
            </div>
        </div>
    )
  }