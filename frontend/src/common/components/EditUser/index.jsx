import { useEffect, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  selectEmail,
  selectUserName,
  selectFirstName,
  selectLastName,
} from "../../../features/user/userSlice"
import {
  getUserProfile,
  updateUserInformation,
} from "../../../features/user/userSlice"
import "./index.scss"
import Field from "../Field"

export default function EditUser() {
  const dispatch = useDispatch()
  const email = useSelector(selectEmail)
  const userName = useSelector(selectUserName)
  const firstName = useSelector(selectFirstName)
  const lastName = useSelector(selectLastName)

  const emailRef = useRef(null)
  const firstNameRef = useRef(null)
  const lastNameRef = useRef(null)
  const modalRef = useRef(null)
  const userNameRef = useRef(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    const user = {
      userName: userNameRef.current.value,
      email: emailRef.current.value,
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
    }
    dispatch(updateUserInformation(user)).then(() => {
      dispatch(getUserProfile())
      modalRef.current.close()
    })
  }

  useEffect(() => {
    dispatch(getUserProfile())
  }, [dispatch])

  const showEditUser = () => {
    modalRef.current.showModal()
  }

  const closeEditUser = (event) => {
    event.preventDefault()
    modalRef.current.close()
  }
  return (
    <>
      <button className="button" onClick={showEditUser}>
        Edit Name
      </button>
      <dialog ref={modalRef} className="edit">
        <h2>Edit user info</h2>
        <form onSubmit={handleSubmit}>
          <Field
            type="email"
            name="email"
            label="Email"
            defaultValue={email}
            ref={emailRef}
            required={false}
          />
          <Field
            type="text"
            name="userName"
            label="Pseudo"
            required={false}
            defaultValue={userName}
            maxLength="15"
            ref={userNameRef}
          />
          <Field
            type="text"
            name="firstName"
            label="Prénom"
            required={false}
            defaultValue={firstName}
            ref={firstNameRef}
          />
          <Field
            type="text"
            name="lastName"
            label="Nom"
            required={false}
            defaultValue={lastName}
            ref={lastNameRef}
          />
          <div className="edit__buttons">
            <button className="sign-in-button" type="submit">
              Save
            </button>
            <button className="sign-in-button" onClick={closeEditUser}>
              Cancel
            </button>
          </div>
        </form>
      </dialog>
    </>
  )
}
