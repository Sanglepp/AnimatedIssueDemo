import * as React from "react"
import { Image, ImageStyle, StyleProp, View, ViewStyle } from "react-native"
import { find, flatten, map } from "lodash"
import styles from "./dropdown-selector.styles"
import { useCallback, useMemo } from "react"
import Modal from "react-native-modal"
import { Button } from "../button/button"
import { Text } from "../text/text"
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated"
import { useState } from "react"
import { FlatList } from "react-native-gesture-handler"
import { icons } from '../icon/icons';


interface Option {
  key: string | number
  value: string
  icon?: number
  isSelected: boolean
  onSelect: (option: Option) => void
}

export interface DropdownSelectProps {
  /**
   *
   */

  options: Option[]
  disabled?: boolean
  selectedKey?: string | number
  placeholder?: string
  onChange?: () => void;
  defaultValue?: string | number
}

const SelectOption = ({ item }) => {
  const isSelected = item.isSelected
  const selectOuterContainerStyle = flatten([
    styles.OPTION_INDICATOR_CONTAINER,
    (isSelected && styles.OPTION_INDICATOR_BORDER_SELECTED) ||
      styles.OPTION_INDICATOR_BORDER_DEFAULT,
  ])

  return (
    <Button
      activeOpacity={0.8}
      preset="container"
      style={styles.SELECT_BUTTON_CONTAINER}
      onPress={item.onSelect}
    >
      <View style={styles.SELECT_TEXT_WAPPER}>
        {item.icon && <Image style={styles.SELECT_ICON} source={item.icon} />}
        <Text preset="bold">{item.value}</Text>
      </View>
      <View key={`${item.key}+${isSelected}`} style={selectOuterContainerStyle}>
        <View style={isSelected && styles.SELECTED_OPTION_INDICATOR_FILL} />
      </View>
    </Button>
  )
}

const DropdownContainer = ({ onClose, isVisible, options }) => {

  return (
    <Modal
      animationIn="slideInDown"
      animationOut="fadeOutUp"
      style={styles.DROPDOWN_CONTAINER}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      isVisible={isVisible}
    >
      <View style={styles.DROPDOWN_CONTENT_CONTAINER}>
        <FlatList data={options} renderItem={SelectOption} />
      </View>
    </Modal>
  )
}

/**
 * Describe your component here
 */
export function DropdownSelect(props: DropdownSelectProps) {
  const [isSelectOpen, setIsSelectOpen] = useState(false)
  const { options, selectedKey, disabled } = props

  const selectedOption = find(options, { key: selectedKey }) || options[0]

  const arrowRotation = useAnimatedStyle(() => {
    return {
      ...styles.SELECT_ICON,
      transform: [{ rotate: withTiming(isSelectOpen ? "180deg" : "0deg") }],
    }
  })

  const onPressSelect = useCallback(() => {
    setIsSelectOpen(!isSelectOpen)
  }, [isSelectOpen])

  const optionsList = useMemo(
    () =>
      map(options, (option) => ({
        ...option,
        onSelect: () => {
          option.onSelect(option)
          setIsSelectOpen(!isSelectOpen)
        },
      })),
    [isSelectOpen, options],
  )

  return (
    <>
      <Button
        disabled={disabled}
        style={
          disabled ? styles.SELECT_CONTAINER_INACTIVE : styles.SELECT_CONTAINER
        }
        activeOpacity={0.8}
        onPress={onPressSelect}
        preset="container">
        <View style={styles.SELECT_TEXT_WAPPER}>
          {selectedOption?.icon && (
            <Image style={styles.SELECT_ICON} source={selectedOption.icon} />
          )}
          <Text>{selectedOption?.value}</Text>
        </View>

        <Animated.Image style={arrowRotation} source={icons.arrowDown} />
      </Button>
      <DropdownContainer
        options={optionsList}
        onClose={onPressSelect}
        isVisible={isSelectOpen}
      />
    </>
  );
}
