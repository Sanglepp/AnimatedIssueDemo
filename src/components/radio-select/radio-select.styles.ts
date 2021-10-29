import { ViewStyle } from 'react-native';
import { color, spacing } from '../../theme';

const INDICATOR_SIZE = 16;
const INDICATOR_INNER_SIZE = 10;

const SELECT_OPTION_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'flex-start',
  width: '100%'
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

const OPTION_INDICATOR_BORDER_DEFAULT: ViewStyle =  {
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

const SELECT_BUTTON_COL_2: ViewStyle = {
  flex: 1,
}

const OPTION_SEPARATOR: ViewStyle = {
  marginVertical: 10,
  height: 1,
  width: '100%',
  backgroundColor: color.line,
}

const MAPPED_LIST_CONTAINER: ViewStyle = {
  flex: 1,
}

const SELECT_BUTTON_CONTAINER: ViewStyle = {
  ...SELECT_OPTION_CONTAINER,
  backgroundColor: color.pill,
  borderRadius: 4,
  marginBottom: spacing[2],
  minHeight: 48,
}
const SELECT_BUTTON_CONTAINER_SELECTED: ViewStyle = {
  ...SELECT_BUTTON_CONTAINER,
  borderColor: color.active,
}

export default {
  SELECT_OPTION_CONTAINER,
  SELECT_BUTTON_CONTAINER,
  OPTION_INDICATOR_BORDER_DEFAULT,
  OPTION_INDICATOR_BORDER_SELECTED,
  SELECTED_OPTION_INDICATOR_FILL,
  OPTION_INDICATOR_CONTAINER,
  SELECT_BUTTON_COL_2,
  OPTION_SEPARATOR,
  MAPPED_LIST_CONTAINER,
  SELECT_BUTTON_CONTAINER_SELECTED,
}