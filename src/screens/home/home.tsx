import React, {useCallback, useState, useRef, useMemo} from 'react';
import {View} from 'react-native';
import styles from './home.styles';
import {Screen} from 'react-native-screens';
import {Button} from '../../components/button/button';
import {Header} from '../../components/header/header';
import Animated, { FlipInEasyX } from 'react-native-reanimated';
import { RootNavigation } from '../../navigators';



export function HomeScreen() {

  return (
    <Screen>
      <Header headerText={'Hello! Welcome to shop'} />
      <View style={styles.SCREEN_WRAPPER}>
        <Animated.Image
          style={styles.HOME_IMAGE}
          entering={FlipInEasyX}
          source={{uri: 'https://picsum.photos/200'}}
        />

        <Button
          text="Proceed to product selection"
          onPress={() => RootNavigation.navigate('ordering', { screen: 'purchase-main'})}
        />
      </View>
    </Screen>
  );
}
