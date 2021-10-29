import { ViewStyle } from "react-native";
import { color, spacing } from "../../theme";

const SIZE_OPTION_CONTAINER: ViewStyle = {
  height: 48,
  width: 100,
  justifyContent: 'center',
  alignItems: 'center',
  borderColor: color.border,
  borderRadius: 4,
  borderWidth: 1,
  marginRight: spacing[2]
}

const SIZE_OPTION_CONTAINER_SELECTED: ViewStyle = {
  ...SIZE_OPTION_CONTAINER,
  borderColor: color.active,
}

export default {
  SIZE_OPTION_CONTAINER,
  SIZE_OPTION_CONTAINER_SELECTED,
}