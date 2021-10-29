import React, {useCallback, useState, useRef, useMemo, useEffect} from 'react';
import {FlatList, Image, View} from 'react-native';
import { useForm } from 'react-hook-form';
import {formatPrice} from '../../utils/text-parsers';
import styles from './checkout.styles';
import {flatten, times, random, find, reject, sumBy, map, get} from 'lodash';
import {RootNavigation} from '../../navigators';
import Animated, {FadeInDown, FadeOutDown} from 'react-native-reanimated';
import {Screen} from '../../components/screen/screen';
import {Text} from '../../components/text/text';
import {Button} from '../../components/button/button';
import {Header} from '../../components/header/header';
import { ScrollView } from 'react-native-gesture-handler';
import { PersonalDetailsForm } from '../../components/personal-details-form/personal-details-form';
import { AddressSelection } from '../../components/address-selection/address-selection';
import { RadioSelect } from '../../components/radio-select/radio-select';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { spacing } from '../../theme';

const BasketItem = (item: IPurchaseItem) => {
  return (
    <Animated.View
      key={item.id}
      entering={FadeInDown.springify()}
      exiting={FadeOutDown}
      style={styles.BASKET_ITEM_WRAPPER}>
      <Button preset="container">
        <Image
          style={styles.BASKET_ITEM_IMAGE}
          source={{uri: item.imageSource}}
        />
        <View style={styles.BASKET_ITEM_TEXT_CONTAINER}>
          <Text style={styles.BASKET_ITEM_NAME}>{item.name}</Text>
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

const paymentTypes = [
  {
    type: 'bank',
    name: 'Bank',
    options: [
      {
        code: 'bank-1',
        name: 'Bank 1',
      },
      {
        code: 'bank-2',
        name: 'Bank 2',
      },
      {
        code: 'bank-3',
        name: 'Bank 3',
      },
    ],
  },
  {
    type: 'card',
    name: 'Card',
    options: [
      {
        code: 'card-1',
        name: 'Card 1',
      },
      {
        code: 'card-2',
        name: 'Card 2',
      },
      {
        code: 'card-3',
        name: 'Card 3',
      },
    ],
  },
  {
    type: 'cash',
    name: 'Cash',
    options: [
      {
        code: 'cash-1',
        name: 'Cash 1',
      },
      {
        code: 'cash-2',
        name: 'Cash 2',
      },
      {
        code: 'cash-3',
        name: 'Cash 3',
      },
    ],
  },
];

export function Checkout() {
  const [selectedPaymentType, setSelectedPaymentType] = useState('');
  const [selectedPaymentOption, setSelectedPaymentOption] = useState('');

  const { bottom } = useSafeAreaInsets();
  
  const { control, handleSubmit } = useForm();

  const basketItems: IPurchaseItem[] = useMemo(
    () =>
      times(10, (index: number) => ({
        id: index,
        name: `Item nr ${index}`,
        price: random(1, 100),
        imageSource: 'https://picsum.photos/200',
      })),
    [],
  );

  const paymentTypesList = map(paymentTypes, paymentType => ({
    key: paymentType.type,
    title: paymentType.name,
    selected: selectedPaymentType === paymentType.type,
    select: () => selectPaymentType(paymentType.type),
  }));


  const selectPaymentType = useCallback(paymentType => {
    setSelectedPaymentType(paymentType);
  }, []);

  const paymentTypeOptionsList = map(
    get(find(paymentTypes, {type: selectedPaymentType}), 'options', []),
    option => ({
      key: option.code,
      title: option.name,
      selected: selectedPaymentOption === option.code,
      select: () => setSelectedPaymentOption(option.code),
    }),
  );

  return (
    <Screen style={styles.SCREEN_CONTENT_CONTAINER} unsafe>
      <Header
        headerText={'Proceed to checkout'}
        leftIcon="back"
        onLeftPress={RootNavigation.goBack}
      />
      <ScrollView contentContainerStyle={{paddingBottom: bottom + spacing[4], paddingHorizontal: spacing[4]}}>
        <Text preset="header">Your stuff</Text>
        {map(basketItems, BasketItem)}
        <AddressSelection formControl={control} />
        <PersonalDetailsForm formControl={control} />
        <View style={styles.CONTENT_SECTION_CONTAINER}>
          <Text style={styles.CONTENT_HEADING_TEXT} preset="heading">
            {'choose_payment_type'}
          </Text>
          <RadioSelect
            key="paymentTypes"
            preset="buttons"
            useFlatlist={false}
            options={paymentTypesList}
          />
        </View>
        <View style={styles.CONTENT_SECTION_CONTAINER}>
          <Text style={styles.CONTENT_HEADING_TEXT} preset="heading">
            {'choose_payment_option'}
          </Text>
          <RadioSelect
            key="paymentOptions"
            preset="buttons"
            useFlatlist={false}
            options={paymentTypeOptionsList}
          />
        </View>
        <Button text="This doesn't do anything" />
      </ScrollView>
    </Screen>
  );
}
