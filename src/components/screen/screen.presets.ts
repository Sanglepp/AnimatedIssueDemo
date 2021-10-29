import { ImageStyle, ViewStyle } from "react-native"
import { isNil } from "ramda"
import { color, spacing } from "../../theme"

/**
 * All screen keyboard offsets.
 */
export const offsets = {
  none: 0,
}

/**
 * The variations of keyboard offsets.
 */
export type KeyboardOffsets = keyof typeof offsets


/**
 * Inner container border radius
 */

const BORDER_RADIUS_INNER_CONTAINER = 18;

/**
 * All the variations of screens.
 */
export const presets = {
  /**
   * No scrolling. Suitable for full-screen carousels and components
   * which have built-in scrolling like FlatList.
   */
  fixed: {
    outer: {
      flexGrow: 1,
    } as ImageStyle,
    inner: {
      flex: 1,
      justifyContent: "flex-start",
      backgroundColor: color.innerContainer,
      borderTopRightRadius: BORDER_RADIUS_INNER_CONTAINER,
      borderTopLeftRadius: BORDER_RADIUS_INNER_CONTAINER,
      overflow: 'hidden',
    } as ViewStyle,
  },

  /**
   * Scrolls. Suitable for forms or other things requiring a keyboard.
   *
   * Pick this one if you don't know which one you want yet.
   */
  scroll: {
    outer: {
      flex: 1,
      height: "100%",
    } as ViewStyle,
    inner: { justifyContent: "flex-start", alignItems: "stretch" } as ViewStyle,
  },
}

/**
 * The variations of screens.
 */
export type ScreenPresets = keyof typeof presets

/**
 * Is this preset a non-scrolling one?
 *
 * @param preset The preset to check
 */
export function isNonScrolling(preset: ScreenPresets) {
  // any of these things will make you scroll
  return isNil(preset) || !preset.length || isNil(presets[preset]) || preset === "fixed"
}
