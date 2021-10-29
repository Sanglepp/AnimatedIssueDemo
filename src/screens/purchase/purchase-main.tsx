import React, {useCallback, useState, useRef, useMemo} from 'react';
import {FlatList, Image, View} from 'react-native';
import styles from './purchase-main.styles';
import {formatPrice} from '../../utils/text-parsers';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {spacing} from '../../theme';
import {flatten, times, random, find, reject, sumBy} from 'lodash';
import { RootNavigation } from '../../navigators';
import Animated, {
  FadeInDown,
  FadeOutDown,
} from 'react-native-reanimated';
import { Screen } from '../../components/screen/screen';
import { Text } from '../../components/text/text';
import { Button } from '../../components/button/button';
import { Header } from '../../components/header/header';


const ActiveBasketItem = ({ sum }) => {
  const {bottom} = useSafeAreaInsets();
  if (sum === 0) return null;

  const containerStyle = flatten([
    styles.BASKET_BUTTON_CONTAINER,
    {bottom: bottom + spacing[2]},
  ]);

  return (
    <Animated.View
      entering={FadeInDown.springify()}
      exiting={FadeOutDown}
      style={containerStyle}>
      <Button
        onPress={() => RootNavigation.navigate('checkout')}
        text={`Proceed to checkout ${formatPrice(sum)}`}
      />
    </Animated.View>
  );
};


const PurchaseItem = ({item, onSelect}: {item: IPurchaseItem; onSelect(item:IPurchaseItem): void}) => {
  return (
    <Animated.View
      entering={FadeInDown.springify()}
      exiting={FadeOutDown}
      style={styles.PURCHASE_ITEM_WRAPPER}>
      <Button onPress={() => onSelect(item)} style={styles.PURCHASE_ITEM}>
        <Image
          style={styles.PURCHASE_ITEM_IMAGE}
          source={{uri: item.imageSource}}
        />
        <View style={styles.PURCHASE_ITEM}>
          <Text style={styles.PURCHASE_ITEM_NAME}>{item.name}</Text>
          <Text>{formatPrice(item.price)}</Text>
        </View>
      </Button>
    </Animated.View>
  );
};

interface IPurchaseItem {
  id: number;
  name: string;
  price: number;
  imageSource: string;
}

export function PurchaseMain() {
  const [selectedItems, setSelectedItems] = useState([]);

  const onItemSelect = useCallback(
    item => {
      if (find(selectedItems, {id: item.id})) {
        setSelectedItems(
          reject(selectedItems, selectedItem => selectedItem.id === item.id),
        );
      } else {
        setSelectedItems([...selectedItems, item]);
      }
    },
    [selectedItems, setSelectedItems],
  );

  const purchaseItems: IPurchaseItem[] = useMemo(
    () =>
      times(100, (index: number) => ({
        id: index,
        name: `Item nr ${index}`,
        price: random(1, 100),
        imageSource: 'https://picsum.photos/200',
      })),
    [],
  );

  const basketTotal = useMemo(() => {
    return sumBy(selectedItems, 'price');
  }, [selectedItems]);

  return (
    <Screen style={styles.SCREEN_CONTENT_CONTAINER} unsafe>
      <Header
        headerText={'Buy some stuff'}
        leftIcon="back"
        onLeftPress={RootNavigation.goBack}
      />
      <FlatList
        contentContainerStyle={styles.PURCHASE_LIST_CONTENT_CONTAINER}
        data={purchaseItems}
        renderItem={({item}) => (
          <PurchaseItem item={item} onSelect={onItemSelect} />
        )}
        keyExtractor={item => item.id.toString()}
        initialNumToRender={10}
      />
      <ActiveBasketItem
        sum={basketTotal}
      />
    </Screen>
  );
};
