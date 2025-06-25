/* eslint-disable react/prop-types */
import { z } from "zod"
import React from "react"

const fieldSchema = z.object({
  type: z.string(),
  name: z.string(),
  label: z.string(),
  required: z.boolean(),
  placeholder: z.string().optional(),
  maxLength: z.string().optional(),
  defaultValue: z.string().optional(),
  onChange: z.function().optional(),
  onBlur: z.function().optional(),
  errorMessage: z.string().optional(),
})

const Field = React.forwardRef(function Field(props, ref) {
  // To do : séparer le style de input-wrapper
  const result = fieldSchema.safeParse(props)
  if (!result.success) {
    console.error("Invalid props for Field:", result.error.format())
    return null
  }

  const hasError = Boolean(props.errorMessage)
  return (
    <div className="input-wrapper">
      <label htmlFor={props.name}>{props.label}</label>
      <input
        type={props.type}
        id={props.name}
        name={props.name}
        ref={ref}
        required={props.required}
        placeholder={props.placeholder}
        maxLength={props.maxLength}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
      {hasError && (
        <p
          style={{ color: "red" }}
          className="field__error"
          id={`${props.name}-error`}
        >
          {props.errorMessage}
        </p>
      )}
    </div>
  )
})
export default Field
