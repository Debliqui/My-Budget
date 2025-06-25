import { useRef, useState } from "react"
import validateInput from "../../../utils/validateInput"
import { useDispatch, useSelector } from "react-redux"
import { createUser } from "../../../features/authentication/AuthenticationAction"
import Field from "../Field"

export default function FormSignup() {
  const dispatch = useDispatch()
  const error = useSelector((state) => state.authentication.error)
  const access = useSelector((state) => state.authentication.access)

  const messageErrorRef = useRef(null)

  const [isVerified, setIsVerified] = useState(false)
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    try {
      validateInput({ input: { name, value }, type: name })
      setErrors((prev) => ({ ...prev, [name]: "" }))
    } catch (err) {
      setErrors((prev) => ({ ...prev, [name]: err.message }))
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const missingFields = Object.entries(user).filter(
      ([, value]) => !value.trim()
    )
    if (missingFields.length > 0) {
      const newErrors = {}
      missingFields.forEach(([key]) => {
        newErrors[key] = `Le champ ${key} est requis`
      })
      setErrors((prev) => ({ ...prev, ...newErrors }))
      return
    } else {
      dispatch(createUser(JSON.stringify(user)))
    }
  }

  if (error)
    messageErrorRef.current.textContent = "Les champs saisie ne sont pas bon"

  return (
    <form onSubmit={handleSubmit}>
      <p className="messageError" ref={messageErrorRef} />
      <Field
        type="text"
        name="userName"
        label="Pseudo *"
        onChange={handleChange}
        onBlur={(e) => {
          if (e.target.value.length > 1) handleBlur(e)
        }}
        errorMessage={errors.userName}
        required={true}
      />
      <Field
        type="email"
        name="email"
        label="Email *"
        onChange={handleChange}
        onBlur={(e) => {
          if (e.target.value.length > 1) handleBlur(e)
        }}
        errorMessage={errors.email}
        required={true}
      />
      <Field
        type="password"
        name="password"
        label="Mot de passe *"
        onChange={handleChange}
        onBlur={(e) => {
          if (e.target.value.length > 1) handleBlur(e)
        }}
        errorMessage={errors.password}
        required={true}
      />
      {user.password.length > 1 && (
        // Input fields for password confirmation
        <Field
          type="password"
          name="passwordConfirm"
          label={`Confirmer le mot de passe * ${isVerified ? "✅" : ""}`}
          value={user.passwordConfirm || ""}
          onChange={(e) => {
            handleChange(e)
            const confirmValue = e.target.value
            if (
              user.password &&
              confirmValue &&
              user.password === confirmValue
            ) {
              setIsVerified(true)
            } else {
              setIsVerified(false)
            }
          }}
          errorMessage={
            user.passwordConfirm && user.password !== user.passwordConfirm
              ? "Les mots de passe ne correspondent pas"
              : ""
          }
          required={true}
        />
      )}
      <Field
        type="text"
        name="firstName"
        label="Prénom"
        onChange={handleChange}
        errorMessage={errors.firstName}
        required={true}
      />
      <Field
        type="text"
        name="lastName"
        label="Nom"
        onChange={handleChange}
        errorMessage={errors.lastName}
        required={true}
      />
      {access && (
        // To Do : Ajouter une annimation ou un setTimeout() ou un loader entre la creation et la redirection
        <p style={{ color: "green" }}>Formulaire soumis avec succès !</p>
      )}
      <button type="submit" className="sign-in-button">
        Envoyé
      </button>
      <p style={{ textAlign: "left" }}>* Obligatoire</p>
    </form>
  )
}
