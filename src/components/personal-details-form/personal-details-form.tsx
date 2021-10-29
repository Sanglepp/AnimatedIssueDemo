import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { spacing } from "../../theme"
import { Control, Controller } from "react-hook-form"
import PhoneNumberInput from "../input/phone-number-input"
import ControlledTextInput from "../input/controlled-text-input"
import { Text } from "../text/text"

const CONTAINER: ViewStyle = {
  marginBottom: spacing[6]
  // justifyContent: "center",
}


export interface PersonalDetailsFormProps {
  /**
   * An optional style override useful for padding & margin.
   */
  heading?: string
  formControl: Control
  user?: {},
}

/**
 * Describe your component here
 */
export function PersonalDetailsForm(props: PersonalDetailsFormProps) {
  const { heading, formControl, user, } = props

  
  return (
    <View style={CONTAINER}>
      <Text preset="heading" size={20}>
        {heading || "add_personal_details"}
      </Text>
      <ControlledTextInput
        name="firstName"
        control={formControl}
        placeholder={"first_name"}
        defaultValue={user?.firstName}
        required
      />
      <ControlledTextInput
        name="surname"
        control={formControl}
        placeholder={"last_name"}
        defaultValue={user?.surName}
        required
      />
      <PhoneNumberInput
        formControl={formControl}
        defaultPrefixKey={372}
        defaultValue={user?.phone}
      />
      <ControlledTextInput
        name="email"
        control={formControl}
        placeholder={"email_address"}
        defaultValue={user?.email}
        required
      />
      <ControlledTextInput
        name="companyName"
        control={formControl}
        defaultValue={user?.company}
        placeholder={"company_name"}
      />
    </View>
  )
}
