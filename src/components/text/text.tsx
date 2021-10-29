import * as React from "react"
import { Text as ReactNativeText } from "react-native"
import { presets } from "./text.presets"
import { TextProps } from "./text.props"
import { flatten } from "lodash"

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Text(props: TextProps) {
  // grab the props
  const {
    preset = "default",
    tx,
    txOptions,
    text,
    children,
    style: styleOverride,
    size,
    opacity,
    weight,
    ...rest
  } = props

  // figure out which content to use
  const content = text || children

  const style = presets[preset] || presets.default

  const sizeOverride = size && { fontSize: size }
  const opacityOverride = opacity && { opacity: opacity }
  const weightOverride = weight && { fontWeight: weight }

  const styles = flatten([style, styleOverride, sizeOverride, opacityOverride, weightOverride])

  return (
    <ReactNativeText {...rest} style={styles}>
      {content}
    </ReactNativeText>
  )
}
