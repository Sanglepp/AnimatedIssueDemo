import * as React from "react"
import { StyleProp, TextInput, TextStyle, TextInputProps, ViewStyle, View } from "react-native"
import { observer } from "mobx-react-lite"
import { BaseInput } from "./base-input"
import { SearchInput } from "./search-input"

export interface InputProps extends TextInputProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  variant?: "default" | "search"
}

/**
 * Describe your component here
 */
export const Input = observer(function Input(props: InputProps) {
  switch (props?.variant) {
    case 'search':
      return <SearchInput {...props} />
  
    default:
      return (
        <View>
          <BaseInput />
        </View>
      )
  }
})
