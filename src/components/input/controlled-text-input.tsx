import React from "react"
import { TextField, TextFieldProps } from "../text-field/text-field"
import { Control, Controller, RegisterOptions } from "react-hook-form"

interface PhoneNumberInputProps {
  control: Control
  name: string
  placeholder?: string
  required?: boolean
  rules?: Exclude<RegisterOptions, "valueAsNumber" | "valueAsDate" | "setValueAs">
  inputProps?: TextFieldProps
  defaultValue?: string;
  normalize?: (value, previousValue) => string;
}

function ControlledTextInput(props: PhoneNumberInputProps) {
  const {
    control,
    required,
    name,
    rules = {},
    placeholder,
    inputProps = {},
    normalize,
    ...rest
  } = props

  return (
    <Controller
      control={control}
      rules={{ required: required, ...rules }}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
        return (
          <TextField
            onBlur={onBlur}
            onChangeText={normalize ? (newValue) => onChange(normalize(newValue, value)) : onChange}
            value={value}
            required={required}
            placeholder={placeholder || ''}
            error={error}
            {...inputProps}
          />
        )
      }}
      {...rest}
    />
  )
}

export default ControlledTextInput
