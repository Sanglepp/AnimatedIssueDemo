import * as React from "react"
import { FlatList, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Button, Text } from "../"
import { formatPrice } from "../../utils/text-parsers"
import styles from './size-select.styles'
import { useMemo } from "react"

interface Option {
  name: string,
  price: number,
  nr: number,
  isSelected: boolean,
  onSelect: () => void
}

export interface SizeSelectProps {
  /**
   * An optional style override useful for padding & margin.
   */
  options: Option[],
  selected?: number,
  onSelect: (itemNumber: number) => void
}

const OptionItem = ({ item }: { item: Option }) => {

  return (
    <Button
      onPress={item.onSelect}
      preset="container"
      style={item.isSelected ? styles.SIZE_OPTION_CONTAINER_SELECTED : styles.SIZE_OPTION_CONTAINER}
      key={`${item.nr}+${item.isSelected}`}
    >
      <Text weight="700" preset={item.isSelected ? "active" : "default"} size={14}>
        {formatPrice(item.price.toString())}
      </Text>
      <Text size={12} preset="secondary">
        {item.name}
      </Text>
    </Button>
  )
}

/**
 * Describe your component here
 */
export const SizeSelect = observer(function SizeSelect(props: SizeSelectProps) {
  const { options, selected, onSelect } = props

  const selectOptions = useMemo(() => {
    return options.map((option) => ({
      ...option,
      onSelect: () => onSelect(option.nr),
      isSelected: option.nr === selected,
    }))
  }, [options, selected])

  return (
    <FlatList
      keyExtractor={(item) => `${item.nr}+${item.isSelected}`}
      horizontal
      data={selectOptions}
      renderItem={OptionItem}
    />
  )
})
