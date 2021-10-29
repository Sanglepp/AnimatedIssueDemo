import React, { useState, useMemo } from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { TextField } from "../text-field/text-field"
import themeStyles from '../../theme/styles';
import { Control, Controller } from "react-hook-form"
import { map } from "lodash"
import { phoneNumberPrefixes } from "../../utils/constants"
import { spacing } from "../../theme"
import ControlledTextInput from "./controlled-text-input"
import { DropdownSelect } from "../dropdown-select/dropdown-select";

const PHONE_NUMBER_INPUT_CONTAINER_STYLE: ViewStyle = {
  ...themeStyles.FULL_WIDTH,
  ...themeStyles.ROW,
  ...themeStyles.CENTER_ALIGN,
  justifyContent: 'center'
}

const PHONE_NUMBER_PREFIX_CONTAINER_STYLE: ViewStyle = {
  width: 100,
  marginTop: spacing[4] - 2, // filthy hack
  marginRight: spacing[2],
}

interface PhoneNumberInputProps {
  formControl: Control
  defaultPrefixKey: keyof typeof phoneNumberPrefixes
  defaultValue: string
}

function PhoneNumberInput(props: PhoneNumberInputProps) {
  const [selectedPrefix, setSelectedPrefix] = useState(props.defaultPrefixKey)
  const { formControl, defaultValue } = props

  const phoneNumberPrefixOptions = useMemo(
    () =>
      map(phoneNumberPrefixes, (prefix) => ({
        ...prefix,
        onSelect: () => setSelectedPrefix(prefix.key),
        isSelected: prefix.key === selectedPrefix,
      })),
    [selectedPrefix, setSelectedPrefix],
  )

  return (
    <View style={PHONE_NUMBER_INPUT_CONTAINER_STYLE}>
      <View style={PHONE_NUMBER_PREFIX_CONTAINER_STYLE}>
        <Controller
          control={formControl}
          name="phoneAreaCode"
          render={({field: {onChange, value}}) => (
            <DropdownSelect
              defaultValue={value}
              onChange={onChange}
              selectedKey={selectedPrefix}
              options={phoneNumberPrefixOptions}
            />
          )}
        />
      </View>
      <ControlledTextInput
        name="phoneNr"
        control={formControl}
        defaultValue={defaultValue}
        placeholder={'phone_number'}
        inputProps={{
          style: {flex: 1},
        }}
        required
      />
    </View>
  );
}

export default PhoneNumberInput;
