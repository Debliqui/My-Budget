import { NavLink } from "react-router"
import { useDispatch, useSelector } from "react-redux"
import argentBankLogo from "../../../assets/img/argentBankLogo.webp"
import "./index.scss"
import { removeAccess } from "../../../features/authentication/AuthenticationSlice"
import {
  getUserProfile,
  selectUserName,
} from "../../../features/user/userSlice"
import { useEffect } from "react"

export default function Header() {
  const access = useSelector((state) => state.authentication.access)
  const userName = useSelector(selectUserName)
  const dispatch = useDispatch()

  useEffect(() => {
    if (access) {
      dispatch(getUserProfile())
    }
  }, [dispatch, access])

  return (
    <header>
      <nav className="header__navBar">
        <NavLink className="header__navBar__logo" to="/">
          <img
            className="header__navBar__logo__image"
            src={argentBankLogo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </NavLink>
        <div>
          {access ? (
            <>
              <NavLink className="header__navBar__item" to="/profile">
                <i className="fa fa-user-circle" />
                <span>{userName}</span>
              </NavLink>
              <NavLink
                className="header__navBar__item"
                to="/"
                onClick={() => dispatch(removeAccess())}
              >
                <i className="fa fa-sign-out"></i>
                <span>Sign Out</span>
              </NavLink>
            </>
          ) : (
            <NavLink className="header__navBar__item" to="/login">
              <i className="fa fa-user-circle" />
              <span>Sign In</span>
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  )
}
