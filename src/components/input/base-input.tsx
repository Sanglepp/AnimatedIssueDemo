import * as React from "react"
import { StyleProp, TextInput, TextInputProps, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"


export interface BaseInputProps extends TextInputProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>

  forwardedRef?: any
}

/**
 * Describe your component here
 */
export const BaseInput = observer(function Input(props: BaseInputProps) {
  return <TextInput ref={props.forwardedRef} {...props} />
})
