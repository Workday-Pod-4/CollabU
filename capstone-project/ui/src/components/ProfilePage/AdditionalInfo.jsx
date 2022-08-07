import * as React from "react"
import apiClient from "../../services/apiClient"
import { useAuthContext } from "../../contexts/auth"
import "./AdditionalInfo.css"

export default function AdditionalInfo() {

  const { user, setUser, setFirstTime } = useAuthContext()

  const [isProcessing, setIsProcessing] = React.useState(false)

  const [error, setError] = React.useState("")

  const [form, setForm] = React.useState({ "college" : "", "major" : "", "workTitle": "", "profilePic": "", "socialMediaLink1": "", "socialMediaLink2": "", "socialMediaLink3": ""})

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
        profile_image_url: form.profilePic,
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
        <div className="additional-info-container">
            <div className="additional-info-form-wrapper">
                <div className="header">
                    <h2>Additional Information</h2>
                </div>
                <div className="additional-form">
                    <div className="input-field">
                        <label>College</label>
                        <input className="form-input" name="college" placeholder="College" onChange={handleOnChange} defaultValue={form.college} />
                    </div>
                    <div className="input-field">
                        <label>Major</label>
                        <input type="text" list="majors" className="form-input" name="majors" placeholder="Major" onChange={handleOnChange} defaultValue={form.major} />
                            <datalist id="majors">
                            <option value={"Select your major"}>Select your major</option>
                                <option value={"Accounting"}>Accounting</option>
                                <option value={"Advertising"}>Advertising</option>
                                <option value={"Aerospace Engineering"}>Aerospace Engineering</option>
                                <option value={"African Studies"}>African Studies</option>
                                <option value={"African-American Studies"}>African-American Studies</option>
                                <option value={"Agricultural Business and Management"}>Agricultural Business and Management</option>
                                <option value={"Agricultural Engineering / Bioengineering"}>Agricultural Engineering / Bioengineering</option>
                                <option value={"Agriculture"}>Agriculture</option>
                                <option value={"Agronomy and Crop Science"}>Agronomy and Crop Science</option>
                                <option value={"American History"}>American History</option>
                                <option value={"American Literature"}>American Literature</option>
                                <option value={"American Studies"}>American Studies</option>
                                <option value={"Anatomy"}>Anatomy</option>
                                <option value={"Ancient Studies"}>Ancient Studies</option>
                                <option value={"Animal Behavior and Ethology"}>Animal Behavior and Ethology</option>
                                <option value={"Animation and Special Effects"}>Animation and Special Effects</option>
                                <option value={"Anthropology"}>Anthropology</option>
                                <option value={"Applied Mathematics"}>Applied Mathematics</option>
                                <option value={"Aquatic Biology"}>Aquatic Biology</option>
                                <option value={"Archeology"}>Archeology</option>
                                <option value={"Architectural Engineering"}>Architectural Engineering</option>
                                <option value={"Architecture"}>Architecture</option>
                                <option value={"Art"}>Art</option>
                                <option value={"Art Education"}>Art Education</option>
                                <option value={"Artificial Intelligence and Robotics"}>Artificial Intelligence and Robotics</option>
                                <option value={"Asian-American Studies"}>Asian-American Studies</option>
                                <option value={"Astronomy"}>Astronomy</option>
                                <option value={"Astrophysics"}>Astrophysics</option>
                                <option value={"Athletic Training"}>Athletic Training</option>
                                <option value={"Atmospheric Science"}>Atmospheric Science</option>
                                <option value={"Automotive Engineering"}>Automotive Engineering</option>
                                <option value={"Aviation"}>Aviation</option>
                                <option value={"Biblical Studies"}>Biblical Studies</option>
                                <option value={"Biochemistry"}>Biochemistry</option>
                                <option value={"Biology"}>Biology</option>
                                <option value={"Biomedical Engineering"}>Biomedical Engineering</option>
                                <option value={"Biomedical Science"}>Biomedical Science</option>
                                <option value={"Biopsychology"}>Biopsychology</option>
                                <option value={"Botany Biology"}>Botany Biology</option>
                                <option value={"Business Management"}>Business Management</option>
                                <option value={"Business Communications"}>Business Communications</option>
                                <option value={"Business Education"}>Business Education</option>
                                <option value={"Canadian Studies"}>Canadian Studies</option>
                                <option value={"Caribbean Studies"}>Caribbean Studies</option>
                                <option value={"Cell Biology"}>Cell Biology</option>
                                <option value={"Ceramic Engineering"}>Ceramic Engineering</option>
                                <option value={"Ceramics"}>Ceramics</option>
                                <option value={"Chemical Engineering"}>Chemical Engineering</option>
                                <option value={"Chemical Physics"}>Chemical Physics</option>
                                <option value={"Chemistry"}>Chemistry</option>
                                <option value={"Child Care"}>Child Care</option>
                                <option value={"Child Development"}>Child Development</option>
                                <option value={"Chinese"}>Chinese</option>
                                <option value={"Chiropratic"}>Chiropractic</option>
                                <option value={"Cinematography"}>Cinematography</option>
                                <option value={"Circulation Technology"}>Circulation Technology</option>
                                <option value={"Civil Engineering"}>Civil Engineering</option>
                                <option value={"Classics"}>Classics</option>
                                <option value={"Psychology"}>Psychology</option>
                                <option value={"Computer Science"}>Computer Science</option>
                                <option value={"Computer Engineering"}>Computer Engineering</option>
                                <option value={"Construction Management"}>Construction Management</option>
                                <option value={"Counseling"}>Counseling</option>
                                <option value={"Creative Writing"}>Creative Writing</option>
                                <option value={"Criminal Science"}>Criminal Science</option>
                                <option value={"Criminology"}>Criminology</option>
                                <option value={"Culinary Arts"}>Culinary Arts</option>
                                <option value={"Data Science"}>Data Science</option>
                                <option value={"Dental Hygiene"}>Dental Hygiene</option>
                                <option value={"Digital Communications"}>Digital Communications</option>
                                <option value={"Ecology"}>Ecology</option>
                                <option value={"Economics"}>Economics</option>
                                <option value={"Education"}>Education</option>
                                <option value={"Electrical Engineering"}>Electrical Engineering</option>
                                <option value={"English"}>English</option>
                                <option value={"English Literature"}>English Literature</option>
                                <option value={"Entrepeneurship"}>Entrepreneurship</option>
                                <option value={"Environmental Science"}>Environmental Science</option>
                                <option value={"Epidemiology"}>Epidemiology</option>
                                <option value={"European History"}>European History</option>
                                <option value={"Fashion Design"}>Fashion Design</option>
                                <option value={"Film"}>Film</option>
                                <option value={"Finance"}>Finance</option>
                                <option value={"Forensic Science"}>Forensic Science</option>
                                <option value={"French"}>French</option>
                                <option value={"Game Design"}>Game Design</option>
                                <option value={"Genetics"}>Genetics</option>
                                <option value={"Geography"}>Geography</option>
                                <option value={"Geology"}>Geology</option>
                                <option value={"Government"}>Government</option>
                                <option value={"Graphic Design"}>Graphic Design</option>
                                <option value={"Health Administration"}>Health Administration</option>
                                <option value={"History"}>History</option>
                                <option value={"Hospitality"}>Hospitality</option>
                                <option value={"Human Resources"}>Human Resources</option>
                                <option value={"Illustration"}>Illustration</option>
                                <option value={"Industrial Engineering"}>Industrial Engineering</option>
                                <option value={"Industrial Management"}>Industrial Management</option>
                                <option value={"Industrial Psychology"}>Industrial Psychology</option>
                                <option value={"Information Technology"}>Information Technology</option>
                                <option value={"Interior Design"}>Interior Design</option>
                                <option value={"International Relations"}>International Relations</option>
                                <option value={"International Studies"}>International Studies</option>
                                <option value={"Islamic Studies"}>Islamic Studies</option>
                                <option value={"Journalism"}>Journalism</option>
                                <option value={"Linguistics"}>Linguistics</option>
                                <option value={"Logistics Management"}>Logistics Management</option>
                                <option value={"Marine Biology"}>Marine Biology</option>
                                <option value={"Mathematics"}>Mathematics</option>
                                <option value={"Mechanical Engineering"}>Mechanical Engineering</option>
                                <option value={"Microbiology"}>Microbiology</option>
                                <option value={"Mineral Engineering"}>Mineral Engineering</option>
                                <option value={"Molecular Biology"}>Molecular Biology</option>
                                <option value={"Molecular Genetics"}>Molecular Genetics</option>
                                <option value={"Music"}>Music</option>
                                <option value={"Music History"}>Music History</option>
                                <option value={"Musical Theater"}>Musical Theater</option>
                                <option value={"Naval Architecture"}>Naval Architecture</option>
                                <option value={"Neurobiology"}>Neurobiology</option>
                                <option value={"Neuroscience"}>Nueroscience</option>
                                <option value={"Nuclear Engineering"}>Nuclear Engineering</option>
                                <option value={"Nursing"}>Nursing</option>
                                <option value={"Nutrition"}>Nutrition</option>
                                <option value={"Ocean Engineering"}>Ocean Engineering</option>
                                <option value={"Oceanography"}>Oceanography</option>
                                <option value={"Petroleum Engineering"}>Petroleum Engineering</option>
                                <option value={"Pharmacology"}>Pharmacology</option>
                                <option value={"Philosophy"}>Philosophy</option>
                                <option value={"Photography"}>Photography</option>
                                <option value={"Physical Education"}>Physical Education</option>
                                <option value={"Physical Therapy"}>Physical Therapy</option>
                                <option value={"Physics"}>Physics</option>
                                <option value={"Piano"}>Piano</option>
                                <option value={"Planetary Science"}>Planetary Science</option>
                                <option value={"Playwriting and Screenwriting"}>Playwriting and Screenwriting</option>
                                <option value={"Political Science"}>Political Science</option>
                                <option value={"Pre-Dentistry"}>Pre-Dentistry</option>
                                <option value={"Pre-Law"}>Pre-Law</option>
                                <option value={"Pre-Medicine"}>Pre-Medicine</option>
                                <option value={"Pre-Optometry"}>Pre-Optometry</option>
                                <option value={"Pre-Veterinary"}>Pre-Veterinary</option>
                                <option value={"Psychology"}>Psychology</option>
                                <option value={"Public Administration"}>Public Administration</option>
                                <option value={"Public Health"}>Public Health</option>
                                <option value={"Public Relations"}>Public Relations</option>
                                <option value={"Radio and Television"}>Radio and Television</option>
                                <option value={"Real Estate"}>Real Estate</option>
                                <option value={"Rehabilitation Services"}>Rehabilitation Services</option>
                                <option value={"Religious Studies"}>Religious Studies</option>
                                <option value={"Risk Management"}>Risk Management</option>
                                <option value={"Social Psychology"}>Social Psychology</option>
                                <option value={"Sociology"}>Sociology</option>
                                <option value={"Sound Engineering"}>Sound Engineering</option>
                                <option value={"Spanish"}>Spanish</option>
                                <option value={"Sports Management"}>Sports Management</option>
                                <option value={"Statistics"}>Statistics</option>
                                <option value={"Technical Writing"}>Technical Writing</option>
                                <option value={"Theatre"}>Theatre</option>
                                <option value={"Tourism"}>Tourism</option>
                                <option value={"Toxicology"}>Toxicology</option>
                                <option value={"Web Design"}>Web Design</option>
                                <option value={"Zoology"}>Zoology</option>
                            </datalist>
                    </div>
                    <div className="input-field">
                        <label>Work Title</label>
                        <input className="form-input" name="workTitle" placeholder="Work Title" onChange={handleOnChange} defaultValue={form.workTitle} />
                    </div>
                    <div className="input-field">
                        <label>Profile Picture</label>
                        <input className="form-input" type="text" name="profilePic" placeholder="Place the link to an image" onChange={handleOnChange} defaultValue={form.profilePic}></input>
                    </div>
                    <div className="input-field">
                        <label>Social Links</label>
                        <input className="form-input" type="text" name="socialMediaLink1" placeholder="External profile or portfolio" onChange={handleOnChange} defaultValue={form.socialMediaLink1}></input>
                    </div>
                    <div className="input-field no-label">
                        <input className="form-input" type="text" name="socialMediaLink2" placeholder="External profile or portfolio" onChange={handleOnChange} defaultValue={form.socialMediaLink2}></input>
                    </div>
                    <div className="input-field no-label">
                        <input className="form-input" type="text" name="socialMediaLink3" placeholder="External profile or portfolio" onChange={handleOnChange} defaultValue={form.socialMediaLink3}></input>
                    </div>
                    <button className="btn" onClick={saveInfo}>Save</button>
                    <p className="close" onClick={saveInfo}>Skip for now!</p>
                </div>
            </div>
        </div>
    )
  }
