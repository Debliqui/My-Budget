import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
const isUserLoggedIn = window.sessionStorage.getItem("keys")

export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${isUserLoggedIn}` },
        }
      )
      const data = await response.json()
      return data.body
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

export const editUserName = createAsyncThunk(
  "user/editUserName",
  async (user) => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
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
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        userName: action.payload.userName,
      }
    })
    builder.addCase(editUserName.fulfilled, (state, action) => {
      state.userName = action.payload.userName
    })
  },
})

export const selectFirstName = (state) => state.user.firstName
export const selectLastName = (state) => state.user.lastName
export const selectUserName = (state) => state.user.userName

export default userSlice.reducer
