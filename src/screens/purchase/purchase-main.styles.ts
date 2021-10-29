import {ViewStyle, ImageStyle} from 'react-native';
import {color, spacing} from '../../theme';

const SCREEN_CONTENT_CONTAINER: ViewStyle = {
  borderTopRightRadius: 0,
  borderTopLeftRadius: 0,
};
const PURCHASE_LIST_CONTENT_CONTAINER: ViewStyle = {
  marginHorizontal: spacing[3],
};

const PURCHASE_ITEM_IMAGE: ImageStyle = {
  height: 70,
  width: 70,
  resizeMode: "contain"
};

const BASKET_BUTTON: ViewStyle = {
};

const PURCHASE_ITEM_NAME: ViewStyle = {
  marginRight: spacing[4]
};

const PURCHASE_ITEM: ViewStyle = {
  flexDirection: 'row',
  height: 80,
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: 10,
  backgroundColor: color.passive
};

const BASKET_ITEM_AMOUNTS_ROW: ViewStyle = {
  flex: 1,
  alignItems: 'flex-end',
};

const PURCHASE_ITEM_WRAPPER: ViewStyle = {
  padding: spacing[4]
};

const BASKET_BUTTON_CONTAINER: ViewStyle = {
  position: 'absolute',
  left: 0,
  right: 0,
}


export default {
  BASKET_BUTTON_CONTAINER,
  BASKET_BUTTON,
  PURCHASE_ITEM,
  PURCHASE_ITEM_IMAGE,
  PURCHASE_ITEM_NAME,
  BASKET_ITEM_AMOUNTS_ROW,
  PURCHASE_LIST_CONTENT_CONTAINER,
  SCREEN_CONTENT_CONTAINER,
  PURCHASE_ITEM_WRAPPER,
};
