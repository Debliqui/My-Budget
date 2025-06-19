import { BrowserRouter, Routes, Route } from "react-router"
import Home from "../pages/Home"
import Login from "../pages/Login"
import CreateUser from "../pages/CreateUser"
import Profile from "../pages/Profile"
import "./App.scss"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<CreateUser />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
