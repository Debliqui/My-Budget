import Footer from "../../common/components/Footer"
import Header from "../../common/components/Header"
import Banner from "../../common/components/Banner"
import Card from "../../common/components/Card"

import iconChat from "../../assets/icon/icon-chat.svg"
import iconMoney from "../../assets/icon/icon-money.svg"
import iconSecurity from "../../assets/icon/icon-security.svg"
import "./index.scss"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Banner>
          <h2 className="sr-only">Promoted Content</h2>
          <p className="subtitle">No fees.</p>
          <p className="subtitle">No minimum deposit.</p>
          <p className="subtitle">High interest rates.</p>
          <p className="text">Open a savings account with Argent Bank today!</p>
        </Banner>
        <section className="features">
          <h2 className="sr-only">Features</h2>
          <Card imgSrc={iconChat} imgAlt="">
            <h3 className="features__title">You are our #1 priority</h3>
            <p>
              Need to talk to a representative? You can get in touch through our
              24/7 chat or through a phone call in less than 5 minutes.
            </p>
          </Card>
          <Card imgSrc={iconMoney} imgAlt="">
            <h3 className="features__title">More savings means higher rates</h3>
            <p>
              The more you save with us, the higher your interest rate will be!
            </p>
          </Card>
          <Card imgSrc={iconSecurity} imgAlt="">
            <h3 className="features__title">Security you can trust</h3>
            <p>
              We use top of the line encryption to make sure your data and money
              is always safe.
            </p>
          </Card>
        </section>
      </main>
      <Footer />
    </>
  )
}
