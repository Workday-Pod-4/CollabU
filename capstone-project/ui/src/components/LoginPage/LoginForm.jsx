import * as React from "react"
import apiClient from "../../services/apiClient";
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../../contexts/auth"

export default function LoginForm() {
  const navigate = useNavigate()

  const { user, setUser } = useAuthContext()
  
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [errors, setErrors] = React.useState("")

  const [form, setForm] = React.useState({ email: "", password: "" })

  React.useEffect(() => {
    if (user?.email) {
      navigate("/")
    }
  }, [user, navigate])

  function handleOnChange(evt){
    setForm((f) => ({...f, [evt.target.name]: evt.target.value}))
  }

  async function loginUser(evt){
    evt.preventDefault()

    setIsProcessing(true)

    if(form.email == "" || form.password == ""){
      setErrors((e) => ({ ...e, email: "Missing input value." }))
      return
    }
    else if(form.email.indexOf("@") < 0){
      setErrors((e) => ({ ...e, email: "Invalid email" }))
      return
    }

    const { data, error } = await apiClient.loginUser({ email: form.email, password: form.password })
    if (error) {
      setErrors((e) => ({ ...e, form: error }))
    }
    if (data?.user) {
      setUser(data.user)
      apiClient.setToken(data.token)
      setIsProcessing(false)
      navigate("/")
    }
  }


    return (
      <div className="login-form">
        <div className="input-field">
            <label>Email</label>
            <input className="form-input" type="email" name="email" placeholder="user@gmail.com" defaultValue={form.email} onChange={handleOnChange}></input>
            {(errors?.email !== null && form.email !== "") ? <span className="error">Please enter a valid email.</span> : null}
        </div>
        <div className="input-field">
            <label>Password</label>
            <input className="form-input" name="password" placeholder="password" defaultValue={form.password} onChange={handleOnChange}></input>
        </div>
        <button className="btn" onClick={loginUser}>Login</button>
      </div>
    )
  }