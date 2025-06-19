import { useEffect, useRef } from "react"
import "./index.scss"
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../../../features/authentication/AuthenticationAction"
import Field from "../Field"

export default function Form() {
  const dispatch = useDispatch()
  const error = useSelector((state) => state.authentication.error)
  const rememberMeInputRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const messageErrorRef = useRef(null)

  const rememberMe = () => {
    if (rememberMeInputRef.current.checked) {
      window.localStorage.setItem("rememberedemail", emailRef.current.value)
    }
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    rememberMe()
    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    dispatch(loginUser(JSON.stringify(user)))
  }

  if (error === true)
    messageErrorRef.current.textContent = "Login or password error"

  useEffect(() => {
    if (window.localStorage.getItem("rememberedemail")) {
      emailRef.current.value = window.localStorage.getItem("rememberedemail")
    }
  }, [])
  return (
    <form onSubmit={handleSubmit}>
      <p className="messageError" ref={messageErrorRef} />
      <Field
        type="email"
        name="email"
        label="Email"
        ref={emailRef}
        required={true}
      />
      <Field
        type="password"
        name="password"
        label="Mot de passe"
        ref={passwordRef}
        required={true}
      />
      <div className="input-remember">
        <input type="checkbox" id="remember-me" ref={rememberMeInputRef} />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      <button type="submit" className="sign-in-button">
        Sign In
      </button>
    </form>
  )
}
