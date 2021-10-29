/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useRef} from 'react';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {StatusBar, StyleSheet, Text, useColorScheme, View} from 'react-native';

import {RootNavigator, setRootNavigation} from './src/navigators';
import {NavigationContainerRef} from '@react-navigation/native';

const App = () => {
  const navigationRef = useRef<NavigationContainerRef>();
  setRootNavigation(navigationRef);
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <StatusBar translucent />
      <RootNavigator ref={navigationRef} />
    </SafeAreaProvider>
  );
};

export default App;
