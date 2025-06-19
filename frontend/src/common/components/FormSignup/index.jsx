import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createUser } from "../../../features/authentication/AuthenticationAction"
import Field from "../Field"

export default function FormSignup() {
  const dispatch = useDispatch()
  const error = useSelector((state) => state.authentication.error)
  const userNameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const firstNameRef = useRef(null)
  const lastNameRef = useRef(null)
  const messageErrorRef = useRef(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    const user = {
      userName: userNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
    }
    console.log(user)
    dispatch(createUser(JSON.stringify(user)))
  }

  if (error === true)
    messageErrorRef.current.textContent = "Les champs saisie ne sont pas bon"

  return (
    <form onSubmit={handleSubmit}>
      <p className="messageError" ref={messageErrorRef} />
      <Field
        type="text"
        name="userName"
        label="Pseudo *"
        ref={userNameRef}
        required={true}
      />
      <Field
        type="email"
        name="email"
        label="Email *"
        ref={emailRef}
        required={true}
      />
      <Field
        type="password"
        name="password"
        label="Mot de passe *"
        ref={passwordRef}
        required={true}
      />
      <Field
        type="text"
        name="firstName"
        label="Prénom"
        ref={firstNameRef}
        required={true}
      />
      <Field
        type="text"
        name="lastName"
        label="Nom"
        ref={lastNameRef}
        required={true}
      />
      <p>* Obligatoire</p>
      <button type="submit" className="sign-in-button">
        Envoyé
      </button>
    </form>
  )
}
