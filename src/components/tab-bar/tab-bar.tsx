import * as React from "react"
import { ViewStyle, TouchableOpacity, Image, ImageStyle, TextStyle } from "react-native"
import { color, spacing } from "../../theme"
import { Text } from "../text/text"
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { SafeAreaView } from "react-native-safe-area-context"
import { upperFirst } from "lodash"

const TAB_CONTAINER_STYLE: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  paddingHorizontal: spacing[5],
  paddingTop: spacing[3],
  paddingBottom: spacing[1],
  backgroundColor: color.light,
}

const TAB_BUTTON_STYLE: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  width: 65,
}

const TAB_IMAGE_STYLE: ImageStyle = { height: 24, width: 24, marginBottom: spacing[0] }
const TAB_LABEL_STYLE: TextStyle = { fontSize: 12 }

const TAB_BAR_DEFAULT_IMAGES = {
  home: require("./assets/tab-home.png"),
  account: require("./assets/tab-account.png"),
  ordering: require("./assets/tab-order.png"),
}

const TAB_BAR_ACTIVE_IMAGES = {
  home: require("./assets/tab-home-filled.png"),
  account: require("./assets/tab-account-filled.png"),
  ordering: require("./assets/tab-order-filled.png"),
}

type RouteName = "home" | "search" | "order" | "account"

export function TabBar(props: BottomTabBarProps) {
  const { state, descriptors, navigation } = props
  const focusedOptions = descriptors[state.routes[state.index].key].options

  if (focusedOptions.tabBarVisible === false) {
    return null
  }

  return (
    <SafeAreaView  edges={["bottom"]} style={TAB_CONTAINER_STYLE}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]

        const routeName: RouteName = route.name
        const label = upperFirst(routeName);

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          })

          navigation.navigate(route.name);
        }

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          })
        }

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={TAB_BUTTON_STYLE}
          >
            <Image
              style={TAB_IMAGE_STYLE}
              source={
                isFocused ? TAB_BAR_ACTIVE_IMAGES[route.name] : TAB_BAR_DEFAULT_IMAGES[route.name]
              }
            />
            <Text style={TAB_LABEL_STYLE} preset={isFocused ? "bold" : "default"}>
              {label}
            </Text>
          </TouchableOpacity>
        )
      })}
    </SafeAreaView>
  )
}
