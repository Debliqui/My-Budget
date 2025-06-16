import propTypes from "prop-types"
import "./index.scss"

export default function Card({ children, imgSrc, imgAlt }) {
  return (
    <>
      <figure className="card">
        <img src={imgSrc} alt={imgAlt} className="card__icon" />
        <figcaption>{children}</figcaption>
      </figure>
    </>
  )
}

Card.propTypes = {
  children: propTypes.node.isRequired,
  imgSrc: propTypes.string.isRequired,
  imgAlt: propTypes.string.isRequired,
}
