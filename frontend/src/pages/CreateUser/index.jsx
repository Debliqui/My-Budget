import Footer from "../../common/components/Footer"
import FormSignup from "../../common/components/FormSignup"
import Header from "../../common/components/Header"

import "./index.scss"

export default function CreateUser() {
  return (
    <>
      <Header />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle"></i>
          <h1>Inscription</h1>
          <FormSignup />
        </section>
      </main>
      <Footer />
    </>
  )
}
