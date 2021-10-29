import * as React from "react"
import { KeyboardAvoidingView, Platform, ScrollView, StatusBar, View } from "react-native"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import { ScreenProps } from "./screen.props"
import { isNonScrolling, offsets, presets } from "./screen.presets"
import { head, tail } from 'lodash';


const isIos = Platform.OS === "ios"

function ScreenWithoutScrolling(props: ScreenProps) {
  const insets = useSafeAreaInsets()
  const preset = presets.fixed
  const style = props.style || {}
  const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top }

  const ViewContainer = props?.unsafe ? View : SafeAreaView;

  const { children } = props;

  return (
    <ViewContainer style={{ flex: 1 }} edges={["top"]}>
      <StatusBar barStyle={props.statusBar || "light-content"} />
      <View>{head(children)}</View>
      <KeyboardAvoidingView
        behavior={isIos ? "padding" : undefined}
        keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}
        style={[preset.inner, style]}
      >
        {tail(children)}
      </KeyboardAvoidingView>
    </ViewContainer>
  )
}

function ScreenWithScrolling(props: ScreenProps) {
  const insets = useSafeAreaInsets()
  const preset = presets.scroll
  const style = props.style || {}
  const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top }

  return (
    <KeyboardAvoidingView
      style={[preset.outer]}
      behavior={isIos ? "padding" : undefined}
      keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}
    >
      <StatusBar barStyle={props.statusBar || "light-content"} />
      <View style={[preset.outer, insetStyle]}>
        <ScrollView
          style={[preset.outer]}
          contentContainerStyle={[preset.inner, style]}
          keyboardShouldPersistTaps={props.keyboardShouldPersistTaps || "handled"}
        >
          {props.children}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export function Screen(props: ScreenProps) {
  if (isNonScrolling(props.preset)) {
    return <ScreenWithoutScrolling {...props} />
  } else {
    return <ScreenWithScrolling {...props} />
  }
}
