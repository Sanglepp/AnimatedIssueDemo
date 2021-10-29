import * as React from "react"
import { View, Animated, ImageStyle } from "react-native"
import { IconProps } from "./icon.props"
import { icons } from "./icons"

const ROOT: ImageStyle = {
  resizeMode: "contain",
}

export function Icon(props: IconProps) {
  const { style: styleOverride, icon, containerStyle, tint } = props

  const tintColorOverride: ImageStyle = tint ? { tintColor: tint } : {};

  return (
    <View style={containerStyle}>
      <Animated.Image style={[ROOT, styleOverride, tintColorOverride]} source={icons[icon]} />
    </View>
  )
}
