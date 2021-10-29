import * as React from "react"
import { TouchableOpacity } from "react-native"
import { Text } from "../text/text"
import { viewPresets, textPresets } from "./button.presets"
import { ButtonProps } from "./button.props"
import { flatten } from "ramda"

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Button(props: ButtonProps) {
  // grab the props
  const {
    preset = "primary",
    tx,
    text,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    hidden = false,
    disabled,
    ...rest
  } = props

  if (hidden) return null

  const viewStyle = viewPresets[preset] || viewPresets.primary
  const viewStyles = flatten([viewStyle, disabled && { opacity: 0.7 }, styleOverride])
  const textStyle = textPresets[preset] || textPresets.primary
  const textStyles = flatten([textStyle, textStyleOverride])

  const content = children || <Text tx={tx} text={text} style={textStyles} />

  return (
    <TouchableOpacity disabled={preset === "disabled" || disabled} style={viewStyles} {...rest}>
      {content}
    </TouchableOpacity>
  )
}
