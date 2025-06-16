import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authenticationReducer from "../features/authentication/AuthenticationSlice"
import userReducer from "../features/user/userSlice"

export const store = configureStore({
  reducer: combineReducers({
    authentication: authenticationReducer,
    user: userReducer,
  }),
})
