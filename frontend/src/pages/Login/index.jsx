import { NavLink } from "react-router"

import Footer from "../../common/components/Footer"
import Header from "../../common/components/Header"
import FormLogin from "../../common/components/FormLogin"

import "./index.scss"

export default function SignIn() {
  return (
    <>
      <Header />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle"></i>
          <h1>Connexion</h1>
          <FormLogin />
          <p>
            Pas de compte ? <NavLink to="/signup">Inscription</NavLink>
          </p>
        </section>
      </main>
      <Footer />
    </>
  )
}
