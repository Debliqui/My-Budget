import Footer from "../../common/components/Footer"
import Header from "../../common/components/Header"

import "./index.scss"
import accountContent from "../../assets/accountContent.json"
import Account from "../../common/components/Account"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import {
  getUserProfile,
  selectFirstName,
  selectLastName,
} from "../../features/user/userSlice"
import { NavLink } from "react-router"
import EditUser from "../../common/components/EditUser"

export default function Profile() {
  const dispatch = useDispatch()
  const firstName = useSelector(selectFirstName)
  const lastName = useSelector(selectLastName)

  useEffect(() => {
    dispatch(getUserProfile())
  }, [dispatch])

  return (
    <>
      <Header />
      <main className="main bg-dark">
        {firstName === null ? (
          <>
            <section className="error-connect">
              <h2>Your are not connect</h2>
              {
                <NavLink className="button" to="/login">
                  Login
                </NavLink>
              }
              <span>
                If you come across this message again,
                <a href="mailto:someone@example.com">Contact us</a>
              </span>
            </section>
          </>
        ) : (
          <>
            {}
            <header className="header">
              <h2>
                Welcome back
                <br />
                {`${firstName} ${lastName}!`}
              </h2>
              <EditUser />
            </header>
            <h3 className="sr-only">Accounts</h3>
            {accountContent.map((account) => (
              <Account
                key={account.id}
                locale={account.locale}
                currency={account.currency}
                title={account.title}
                amount={account.amount}
                amountDescription={account.amountDescription}
              />
            ))}
          </>
        )}
      </main>
      <Footer />
    </>
  )
}
