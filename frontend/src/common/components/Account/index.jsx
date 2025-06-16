import PropTypes from "prop-types"
import "./index.scss"

export default function Account({
  locale = "en-US",
  currency = "USD",
  title = "Argent Bank",
  amount = "1000.00",
  amountDescription = "Available Balance",
}) {
  const formattedAmount = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount)
  return (
    <section className="account">
      <div className="account__content-wrapper">
        <h4 className="account__title">{title}</h4>
        <p className="account__amount">{formattedAmount}</p>
        <p className="account__amount__description">{amountDescription}</p>
      </div>
      <div className="account__content-wrapper cta">
        <button className="transaction-button">View transactions</button>
      </div>
    </section>
  )
}

Account.propTypes = {
  locale: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  amountDescription: PropTypes.string,
}
