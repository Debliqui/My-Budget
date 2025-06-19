/* eslint-disable react/prop-types */
import React from "react"
import { z } from "zod"

const fieldSchema = z.object({
  type: z.string(),
  name: z.string(),
  label: z.string(),
  required: z.boolean(),
  placeholder: z.string().optional(),
  maxLength: z.string().optional(),
  defaultValue: z.string().optional(),
})

const Field = React.forwardRef(function Field(props, ref) {
  // To do : séparer le style de input-wrapper
  const result = fieldSchema.safeParse(props)
  if (!result.success) {
    console.error("Invalid props for Field:", result.error.format())
    return null
  }
  return (
    <div className="input-wrapper">
      <label htmlFor={props.name}>{props.label}</label>
      <input
        type={props.type}
        id={props.name}
        required={props.required}
        placeholder={props.placeholder}
        maxLength={props.maxLength}
        defaultValue={props.defaultValue}
        ref={ref}
      />
    </div>
  )
})

export default Field
