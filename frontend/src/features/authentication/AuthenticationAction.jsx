import { createAsyncThunk } from "@reduxjs/toolkit"
import { setAccess, setError } from "./AuthenticationSlice"

export const loginUser = createAsyncThunk(
  "authentication/loginUser",
  async (userLogin, { dispatch }) => {
    await fetch("http://localhost:3001/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: userLogin,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Login or password error")
        } else {
          console.log("Connection reussi!")
          return response.json()
        }
      })
      .then((data) => {
        window.sessionStorage.setItem("keys", data.token)
        dispatch(setAccess())
        window.location.href = "/profile"
      })
      .catch((error) => {
        {
          {
            error
          }
        }
        dispatch(setError())
      })
  }
)

export const createUser = createAsyncThunk(
  "authentication/createUser",
  async (userInformation, { dispatch }) => {
    await fetch("http://localhost:3001/api/v1/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: userInformation,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Filed as not complete")
        } else {
          console.log("User created !")
          return response.json()
        }
      })
      .then((data) => {
        console.log(data.token)
        window.sessionStorage.setItem("keys", data.token)
        dispatch(setAccess())
        window.location.href = "/profile"
      })
      .catch((error) => {
        console.error("Signup error:", error)
        dispatch(setError())
      })
  }
)
