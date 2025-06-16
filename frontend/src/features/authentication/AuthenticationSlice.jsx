import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  access: sessionStorage.getItem("access") === "true",
  error: false,
}

const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setAccess: (state) => {
      state.access = true
      sessionStorage.setItem("access", true)
    },
    removeAccess: (state) => {
      state.access = false
      sessionStorage.setItem("access", false)
      window.sessionStorage.removeItem("keys")
    },
    setError: (state) => {
      state.error = true
    },
  },
})

export const { setAccess, removeAccess, setError } = authenticationSlice.actions
export default authenticationSlice.reducer
