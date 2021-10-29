import { ImageStyle, ViewStyle } from "react-native"
import { color, spacing } from "../../theme"

const INDICATOR_SIZE = 16;
const INDICATOR_INNER_SIZE = 10;

const SELECT_CONTAINER: ViewStyle = {
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: color.pill,
  borderRadius: 4,
  height: 56,
  paddingHorizontal: spacing[3],
}

const SELECT_TEXT_WAPPER: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
}

const SELECT_ICON: ImageStyle = {
  marginRight: spacing[2],
}

const DROPDOWN_CONTAINER: ViewStyle = {
  flexGrow: 1,
}

const DROPDOWN_CONTENT_CONTAINER: ViewStyle = {
  backgroundColor: color.light,
  borderRadius: 12,
  padding: spacing[4],
  maxHeight: 400,
}

const OPTION_INDICATOR_CONTAINER: ViewStyle = {
  height: INDICATOR_SIZE,
  width: INDICATOR_SIZE,
  borderRadius: INDICATOR_SIZE / 2,
  borderWidth: 1,
  marginRight: spacing[2],
  justifyContent: 'center',
  alignItems: 'center',
}

const OPTION_INDICATOR_BORDER_DEFAULT: ViewStyle = {
  borderColor: color.dim,
}
const OPTION_INDICATOR_BORDER_SELECTED: ViewStyle = {
  borderColor: color.active,
}

const SELECTED_OPTION_INDICATOR_FILL: ViewStyle = {
  width: INDICATOR_INNER_SIZE,
  height: INDICATOR_INNER_SIZE,
  borderRadius: INDICATOR_INNER_SIZE / 2,
  backgroundColor: color.active,
}

const SELECT_BUTTON_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  borderBottomWidth: 1,
  borderBottomColor: color.border,
  paddingHorizontal: 0,
  borderRadius: 0,
}

const SELECT_CONTAINER_INACTIVE: ViewStyle = {
  ...SELECT_CONTAINER,
  opacity: 0.3
}

export default {
  SELECT_CONTAINER,
  SELECT_CONTAINER_INACTIVE,
  DROPDOWN_CONTAINER,
  SELECT_ICON,
  SELECT_TEXT_WAPPER,
  DROPDOWN_CONTENT_CONTAINER,
  OPTION_INDICATOR_CONTAINER,
  OPTION_INDICATOR_BORDER_DEFAULT,
  OPTION_INDICATOR_BORDER_SELECTED,
  SELECTED_OPTION_INDICATOR_FILL,
  SELECT_BUTTON_CONTAINER,
}