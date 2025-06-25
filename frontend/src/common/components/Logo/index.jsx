/* eslint-disable react/prop-types */
import { z } from "zod"
import FullLogo from "../../../assets/logo/logo-full-my-budget.webp"
import FullHead from "../../../assets/logo/logo-head-my-budget.webp"

import "./index.scss"

const fieldSchema = z.object({
  small: z.boolean(),
})

export default function Logo(props) {
  const result = fieldSchema.safeParse(props)
  if (!result.success) {
    console.error("Invalid props for Logos:", result.error.format())
    return null
  }
  return !props.small ? (
    <img className="full" src={FullLogo} alt="" />
  ) : (
    <img className="head" src={FullHead} alt="" />
  )
}
