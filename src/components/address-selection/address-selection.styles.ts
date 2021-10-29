import { ImageStyle, ViewStyle } from "react-native";
import { spacing, color } from "../../theme";


const ROW_INPUT: ViewStyle = {
  marginRight: spacing[4],
  flex: 1,
}

const VIEW_CONTAINER: ViewStyle = {
  marginBottom: spacing[8]
}

const HISTORY_CONTAINER: ViewStyle = {
  paddingHorizontal: spacing[2],
  marginTop: spacing[2],
}

const HISTORY_ROW: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  borderBottomWidth: 2,
  borderBottomColor: color.border,
  paddingHorizontal: 0,
  borderRadius: 0,
  paddingVertical: spacing[2],
}

const HISTORY_ROW_ICON: ImageStyle = {
  height: 24,
  width: 24,
  resizeMode: 'contain',
  tintColor: color.badge,
}

export default {
  ROW_INPUT,
  VIEW_CONTAINER,
  HISTORY_ROW,
  HISTORY_ROW_ICON,
  HISTORY_CONTAINER,
}