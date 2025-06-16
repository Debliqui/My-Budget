import { BrowserRouter, Routes, Route } from "react-router"
import Home from "../pages/Home"
import SignIn from "../pages/SignIn"
import Profile from "../pages/Profile"
import "./App.scss"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
