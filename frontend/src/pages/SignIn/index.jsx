import Footer from "../../common/components/Footer"
import Header from "../../common/components/Header"
import Form from "../../common/components/Form"

import "./index.scss"

export default function SignIn() {
  return (
    <>
      <Header />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle"></i>
          <h1>Sign In</h1>
          <Form />
        </section>
      </main>
      <Footer />
    </>
  )
}
