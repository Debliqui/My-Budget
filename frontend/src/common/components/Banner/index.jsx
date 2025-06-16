import "./index.scss"
import PropTypes from "prop-types"

export default function Banner({ children }) {
  return (
    <>
      <div className="banner">
        <section className="banner__content">{children}</section>
      </div>
    </>
  )
}

Banner.propTypes = {
  children: PropTypes.node.isRequired,
}
