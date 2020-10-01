import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IOrderWithBonuses, OrdersApi } from '../../api/orders';
import { addUserBonusesThunk } from '../../app/auth/actions';
import { isAuthSelector } from '../../app/auth/selectors';
import { RootState } from '../../app/store';
import { handleError } from '../../errors/handler';
import { cleanPersistentCart } from '../../features/CartContainer/actions';
import { emojify } from '../../helpers/emoji/emoji-messages';
import { EmojiType } from '../../helpers/emoji/emoji-type';
import { IOrderData, OrderForm } from './OrderForm';
import { OrderInfo } from './OrderInfo';

export const OrderConfirmationPage: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(isAuthSelector);
  const cartDishes = useSelector((state: RootState) => state.cart.dishes);
  const [orderWithBonuses, setOrderWithBonuses] = useState<IOrderWithBonuses>();

  const onSubmitOrder = async (orderData: IOrderData): Promise<void> => {
    try {
      const orderInfo = await OrdersApi.makeOrder({
        ...orderData,
        entries: Object.values(cartDishes),
      });
      setOrderWithBonuses(orderInfo);
      if (isAuthenticated) {
        dispatch(addUserBonusesThunk(orderInfo.bonuses));
      }
      dispatch(cleanPersistentCart());
    } catch (err) {
      handleError(err, emojify('Упс, не удалось оформить заказ', EmojiType.SAD));
    }
  };

  if (orderWithBonuses) {
    return (
      <OrderInfo
        orderWithBonuses={orderWithBonuses}
      />
    );
  }

  return (
    <OrderForm
      onSubmit={onSubmitOrder}
    />
  );
};
