/**
 * Code taken from https://github.com/Andr3wHur5t/react-native-keyboard-spacer/blob/master/KeyboardSpacer.js
 * And modified to make sure the space appears instantly + removed animations
 */

import React, { Component } from 'react';
import {
  Keyboard,
  View,
  Dimensions,
  Platform,
  StyleSheet,
  ViewStyle,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    left: 0,
    right: 0,
    bottom: 0,
  },
});

interface IKeyboardSpacer {
  topSpacing: number;
  onToggle: () => void;
  style: ViewStyle
}

class KeyboardSpacer extends Component {
  static defaultProps = {
    topSpacing: 0,
    onToggle: () => null,
  }
  _listeners = null

  constructor(props: IKeyboardSpacer, context) {
    super(props, context)
    this.state = {
      keyboardSpace: 0,
      isKeyboardOpened: false,
    }
    this._listeners = null
    this.updateKeyboardSpace = this.updateKeyboardSpace.bind(this)
    this.resetKeyboardSpace = this.resetKeyboardSpace.bind(this)
  }

  componentDidMount = () => {
    const updateListener = Platform.OS === "android" ? "keyboardDidShow" : "keyboardWillShow"
    const resetListener = Platform.OS === "android" ? "keyboardDidHide" : "keyboardWillHide"
    this._listeners = [
      Keyboard.addListener(updateListener, this.updateKeyboardSpace),
      Keyboard.addListener(resetListener, this.resetKeyboardSpace),
    ]
  }

  componentWillUnmount = () => {
    this._listeners.forEach((listener) => listener.remove())
  }

  updateKeyboardSpace = (event) => {
    if (!event.endCoordinates) {
      return
    }
    // get updated on rotation
    const screenHeight = Dimensions.get("screen").height
    // when external physical keyboard is connected
    // event.endCoordinates.height still equals virtual keyboard height
    // however only the keyboard toolbar is showing if there should be one
    const keyboardSpace = screenHeight - event.endCoordinates.screenY + this.props.topSpacing
    this.setState(
      {
        keyboardSpace,
        isKeyboardOpened: true,
      },
      this.props.onToggle(true, keyboardSpace),
    )
  }

  resetKeyboardSpace = () => {
    this.setState(
      {
        keyboardSpace: 0,
        isKeyboardOpened: false,
      },
      this.props.onToggle(false, 0),
    )
  }

  render = () => {
    if (Platform.OS !== "ios") {
      return null
    }
    return (
      <View style={[styles.container, { height: this.state.keyboardSpace }, this.props.style]} />
    )
  }
}

export { KeyboardSpacer };
