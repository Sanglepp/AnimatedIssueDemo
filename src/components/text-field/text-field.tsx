import React from "react"
import { StyleProp, TextInput, TextInputProps, TextStyle, View, ViewStyle } from "react-native"
import { color, spacing, typography } from "../../theme"
import { Text } from "../text/text"
import { flatten } from "lodash"

// the base styling for the container
const CONTAINER_ERROR: ViewStyle = {
 
}

// the base styling for the TextInput
const INPUT: TextStyle = {
  fontFamily: typography.primary,
  color: color.dim,
  minHeight: 56,
  fontSize: 16,
  borderRadius: 4,
  backgroundColor: color.pill,
  paddingHorizontal: spacing[4],
}

const INPUT_ERROR: TextStyle = {
  color: color.error,
  borderColor: color.error,
  borderWidth: 1,
}

// currently we have no presets, but that changes quickly when you build your app.
const PRESETS: { [name: string]: ViewStyle } = {
  default: {},
  password: {},
}

export interface TextFieldProps extends TextInputProps {

  /**
   * The Placeholder text if no placeholderTx is provided.
   */
  placeholder?: string


  /**
   * The label text if no labelTx is provided.
   */
  label?: string

  /**
   * Optional container style overrides useful for margins & padding.
   */
  style?: StyleProp<ViewStyle>

  /**
   * Optional style overrides for the input.
   */
  inputStyle?: StyleProp<TextStyle>

  /**
   * Various look & feels.
   */
  preset?: keyof typeof PRESETS

  forwardedRef?: any

  required?: boolean;
  error?: boolean | string;
}

/**
 * A component which has a label and an input together.
 */
export function TextField(props: TextFieldProps) {
  const {
    placeholder,
    label,
    preset = "default",
    style: styleOverride,
    inputStyle: inputStyleOverride,
    forwardedRef,
    required,
    error = false,
    ...rest
  } = props

  const containerStyles = flatten([PRESETS[preset], styleOverride, error && CONTAINER_ERROR])
  const inputStyles = flatten([INPUT, inputStyleOverride, error && INPUT_ERROR])
  const actualPlaceholder = `${placeholder}${required && '*' || ''}`

  return (
    <View style={containerStyles}>
      <Text preset="fieldLabel" text={label} />
      <TextInput
        placeholder={actualPlaceholder}
        placeholderTextColor={error ? color.error : color.dim}
        underlineColorAndroid={color.transparent}
        {...rest}
        style={inputStyles}
        ref={forwardedRef}
      />
    </View>
  )
}
