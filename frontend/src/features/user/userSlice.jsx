import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
const isUserLoggedIn = window.sessionStorage.getItem("keys")

export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/auth/profile",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${isUserLoggedIn}` },
        }
      )
      const data = await response.json()
      return data
    } catch (error) {
      {
        {
          error
        }
      }
      throw error
    }
  }
)

export const updateUserInformation = createAsyncThunk(
  "user/updateUserInformation",
  async (user) => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/auth/profile",
        {
          method: "PUT",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${isUserLoggedIn}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      )
      const data = await response.json()
      return data.body
    } catch (error) {
      console.error("Failed to edit user name:", error)
      throw error
    }
  }
)

const initialState = {
  email: null,
  firstName: null,
  lastName: null,
  userName: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      return {
        ...state,
        email: action.payload.email,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        userName: action.payload.userName,
      }
    })
    builder.addCase(updateUserInformation.fulfilled, (state, action) => {
      return { ...state, ...action.payload }
    })
  },
})

export const selectEmail = (state) => state.user.email
export const selectFirstName = (state) => state.user.firstName
export const selectLastName = (state) => state.user.lastName
export const selectUserName = (state) => state.user.userName

export default userSlice.reducer
