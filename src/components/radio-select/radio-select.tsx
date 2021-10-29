import * as React from "react"
import { View, FlatList, FlatListProps } from "react-native"
import styles from './radio-select.styles';
import { Text } from "../text/text"
import { Button } from '../button/button';
import { flatten } from "lodash"
import { find, map } from "lodash";



interface Option {
  title: string
  key: string | number
  selected?: boolean
  select: () => void
  extraInfo?: string
}

type RadioSelectPreset = "list" | "options" | "buttons";

export interface RadioSelectProps<ItemT> extends Omit<FlatListProps<ItemT>, "data" | "renderItem"> {
  options: Array<Option>
  preset?: RadioSelectPreset
  useFlatlist?: boolean
}

const SelectOption = ({ item, preset }: { item: Option, preset: RadioSelectPreset }) => {
  const isSelected = item.selected
  const selectOuterContainerStyle = flatten([
    styles.OPTION_INDICATOR_CONTAINER,
    (isSelected && styles.OPTION_INDICATOR_BORDER_SELECTED) ||
      styles.OPTION_INDICATOR_BORDER_DEFAULT,
  ])

  const optionStyle = preset === "buttons" && (
    isSelected && styles.SELECT_BUTTON_CONTAINER_SELECTED || styles.SELECT_BUTTON_CONTAINER
  ) || styles.SELECT_OPTION_CONTAINER;

  return (
    <Button activeOpacity={0.8} preset="container" style={optionStyle} onPress={item.select}>
      <View key={`item.key+${isSelected}`} style={selectOuterContainerStyle}>
        <View style={isSelected && styles.SELECTED_OPTION_INDICATOR_FILL} />
      </View>
      <View style={styles.SELECT_BUTTON_COL_2}>
        <Text preset={isSelected ? "activeBold" : "bold"}>{item.title}</Text>
      </View>
      <View>
        <Text preset="secondary">{item.extraInfo}</Text>
      </View>
    </Button>
  )
}


const MappedList = React.memo(({ data, renderItem, preset }: { data: Option[], preset: RadioSelectPreset, renderItem: ({item, index, preset}) => React.ReactElement}) => {

  const VisibleList = React.useMemo(() => map(data, (item, index) => renderItem({ item, index, preset })), [data, renderItem])
  return <View style={styles.MAPPED_LIST_CONTAINER}>{VisibleList}</View>

});

const OptionSeparator = () => <View style={styles.OPTION_SEPARATOR} />
export function RadioSelect(props: RadioSelectProps<any>) {
  const { options, preset, useFlatlist = true,  ...rest } = props

  React.useEffect(() => {
    if (!find(options, (option) => option.selected)) {
      options[0]?.select()
    }
  }, [options])

  if (!useFlatlist) {
    return (
      <MappedList preset={preset} data={options} renderItem={SelectOption} />
    )
  }

  return (
    <FlatList
      ItemSeparatorComponent={preset === "list" && OptionSeparator}
      data={options}
      keyExtractor={(item) => item.ID}
      renderItem={SelectOption}
      {...rest}
    />
  )
}
