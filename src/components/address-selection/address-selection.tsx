import React, { useState, useCallback, useMemo, useEffect } from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import styles from './address-selection.styles';
import { FormRow } from "../form-row/form-row"
import { filter, includes, map, times } from 'lodash';
import { DropdownSelect } from "../dropdown-select/dropdown-select"
import { Control, Controller, useWatch, SetFieldValue } from "react-hook-form"
import { Icon } from "../icon/icon"
import ControlledTextInput from "../input/controlled-text-input"
import { Text } from "../text/text";


export interface AddressSelectionProps {
  /**
   * Form control object for input data handling
   */

  formControl: Control

  /**
   * Boolean field for controlling address selection visibility
   */
  isVisible: boolean

  setValues: (values) => void
}


/**
 * Describe your component here
 */
export function AddressSelection(props: AddressSelectionProps) {
  const { formControl, isVisible, setValues } = props

  const areaOptions = times(3, index => ({
    key: index,
    value: `Area, ${index}`,
    isSelected: false,
    onSelect: () => null,
  }))

  return (
    <View style={styles.VIEW_CONTAINER}>
      <Text preset="header" size={20}>
        {'insert_address'}
      </Text>
      <ControlledTextInput
        name="street"
        control={formControl}
        placeholder={'street_name'}
        required
      />

      <FormRow preset="clear">
        <ControlledTextInput
          name="houseNr"
          control={formControl}
          placeholder={'house_nr'}
          inputProps={{style: styles.ROW_INPUT}}
          required
        />
        <ControlledTextInput
          name="flatNr"
          control={formControl}
          placeholder={'apartment_nr'}
        />
      </FormRow>
      <FormRow preset="top">
        <Controller
          control={formControl}
          name="deliveryArea"
          render={({field: {onChange, onBlur, value}}) => (
            <DropdownSelect
              defaultValue={value}
              onChange={onChange}
              selectedKey={areaOptions[0]?.key}
              options={areaOptions}
            />
          )}
        />
      </FormRow>
    </View>
  );
};
