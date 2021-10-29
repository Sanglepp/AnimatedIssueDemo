import * as React from "react"
import { View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, spacing } from "../../theme"
import { AmountSelector, Button } from "../"
import { flatten } from "ramda"
import { translate } from "../../i18n"
import { formatPrice } from "../../utils/text-parsers"
import { useSafeAreaInsets } from "react-native-safe-area-context"

const ADD_TO_BASKET_LAYER: ViewStyle = {
  padding: spacing[4],
  backgroundColor: color.overlay,
  flexDirection: "row",
  width: "100%",
  justifyContent: "space-between",
}

const ADD_TO_BASKET_BUTTON_STYLE: ViewStyle = {
  width: 'auto',
  maxHeight: '50%',
}

export interface AddToBasketBarProps {
  onAddToBasket: () => void
  onAmountAdd: () => void
  onAmountRemove: () => void
  amount: number
  price: string
}

/**
 * Action bar for adding menu item to basket and change amounts
 */
export const AddToBasketBar = observer(function AddToBasketBar(props: AddToBasketBarProps) {

  const { bottom } = useSafeAreaInsets()
  const styles = flatten([ADD_TO_BASKET_LAYER, { paddingBottom: bottom + spacing[2]}])

  const { onAddToBasket, onAmountAdd, onAmountRemove, amount, price } = props

  if (!amount) return null;
  return (
    <View style={styles}>
      <AmountSelector onAdd={onAmountAdd} onRemove={onAmountRemove} amount={amount} />
      <Button
        style={ADD_TO_BASKET_BUTTON_STYLE}
        onPress={onAddToBasket}
        text={translate("order.add_to_basket", { sum: formatPrice(price) })}
      />
    </View>
  )
})
