import * as React from "react"
import { ImageProps, StyleSheet, View, ViewStyle } from "react-native"
import { flatten } from "lodash"

const CONTAINER: ViewStyle = {
  height: '100%',
  width: '100%',
}

/**
 * Describe your component here
 */
export function ImageBackground(props: ImageProps) {
  const { style } = props
  const styles = flatten([StyleSheet.absoluteFill, CONTAINER, style])

  return (
    <View accessibilityIgnoresInvertColors={true} style={style}>
      <Image
        {...props}
        style={styles}
      />
      {children}
    </View>
  )
}
