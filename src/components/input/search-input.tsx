import { observer } from "mobx-react-lite"
import React, { useCallback, useRef } from "react"
import styles from "./input-styles"

import { Image, TextInputProps, View } from "react-native"
import { BaseInput } from "./base-input"
import { translate } from "../../i18n"
import { Button } from "../button/button"
import Animated, {
  FadeIn,
  FadeInLeft,
  FadeInRight,
  FadeOutLeft,
  FadeOutRight,
  FadeOutUp,
  Layout,
} from "react-native-reanimated"

interface SearchInputProps extends TextInputProps {}

export const SearchInput = observer(function Input(props: SearchInputProps) {
  const { onChangeText, ...inputProps } = props
  const inputRef = useRef()

  const clearInput = useCallback(() => {
    onChangeText("")
    inputRef?.current?.clear()
  }, [])

  return (
    <Animated.View
      layout={Layout}
      entering={FadeIn}
      exiting={FadeOutUp.duration(20)}
      style={styles.SEARCH_INPUT_CONTAINER}
    >
      <Animated.View entering={FadeInLeft} exiting={FadeOutLeft}>
        <Image source={require("./assets/icon-search.png")} />
      </Animated.View>
      <View style={styles.SEARCH_INPUT}>
        <BaseInput
          onChangeText={onChangeText}
          style={styles.SEARCH_INPUT}
          placeholder={translate("common.search")}
          forwardedRef={inputRef}
          {...inputProps}
        />
      </View>
      <Animated.View entering={FadeInRight} exiting={FadeOutRight}>
        <Button onPress={clearInput} preset="container">
          <Image source={require("./assets/icon-close.png")} />
        </Button>
      </Animated.View>
    </Animated.View>
  )
})
