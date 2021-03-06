/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabBar} from '../components/tab-bar/tab-bar';
import {HomeScreen} from '../screens/home/home';
import {OrderingNavigator} from './ordering-navigator';
// import {AccountNavigator} from './account-navigator';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const forFade = ({current}) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type PrimaryParamList = {
  location: undefined;
  locationSelection: undefined;
};

function Tabs() {
  /**
   * Search navigator is handled differently and is a placeholder here. Check tab-bar.tsx for reference.
   */
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name="home" component={HomeScreen} />
      {/* <Tab.Screen name="account" component={AccountScreen} /> */}
    </Tab.Navigator>
  );
}

// Documentation: https://reactnavigation.org/docs/tab-based-navigator/
export function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen
        key="ordering"
        name="ordering"
        component={OrderingNavigator}
      />
    </Stack.Navigator>
  );
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ['welcome'];
export const canExit = (routeName: string) => exitRoutes.includes(routeName);
