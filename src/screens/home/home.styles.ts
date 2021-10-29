import { ViewStyle, ImageStyle } from 'react-native';
import { color, spacing } from '../../theme';

const SCREEN_WRAPPER: ViewStyle = {
  flexGrow: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: spacing[4],
};

const HOME_IMAGE: ImageStyle = {
  height: 200,
  width: 200,
  resizeMode: "cover",
  margin: spacing[8]
}

export default {
  SCREEN_WRAPPER,
  HOME_IMAGE,
};
