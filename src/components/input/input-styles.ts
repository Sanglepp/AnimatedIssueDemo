import { ViewStyle } from "react-native";
import { color, spacing } from "../../theme";


const SEARCH_INPUT_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  height: 60,
  padding: spacing[3],
  borderRadius: 30,
  alignItems: 'center',
  backgroundColor: color.pill,
}

const SEARCH_INPUT: ViewStyle = {
  marginHorizontal: spacing[2],
  flex: 1,
}

export default {
  SEARCH_INPUT_CONTAINER,
  SEARCH_INPUT,
}