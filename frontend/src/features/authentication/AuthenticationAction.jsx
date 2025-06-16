import { createAsyncThunk } from "@reduxjs/toolkit"
import { setAccess, setError } from "./AuthenticationSlice"

export const loginUser = createAsyncThunk(
  "authentication/loginUser",
  async (userLogin, { dispatch }) => {
    await fetch("http://localhost:3001/api/v1/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: userLogin,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Login or password error")
        }
        return response.json()
      })
      .then((data) => {
        window.sessionStorage.setItem("keys", data.body.token)
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
