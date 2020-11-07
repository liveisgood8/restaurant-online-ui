import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IBaseOrderDto, IOrderDto, OrdersApi } from '../../api/orders';
import { addUserBonusesThunk } from '../../app/auth/actions';
import { bonusesSelector, isAuthSelector } from '../../app/auth/selectors';
import { RootState } from '../../app/store';
import { handleError } from '../../errors/handler';
import { cleanPersistentCart } from '../../features/CartContainer/actions';
import { emojify } from '../../helpers/emoji/emoji-messages';
import { EmojiType } from '../../helpers/emoji/emoji-type';
import { OrderForm } from './OrderForm';
import { OrderInfo } from './OrderInfo';

export const OrderConfirmationPage: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(isAuthSelector);
  const currentBonuses = useSelector(bonusesSelector);
  const cartDishes = useSelector((state: RootState) => state.cart.dishes);
  const [orderData, setOrderData] = useState<IOrderDto>();

  const onSubmitOrder = async (baseOrderDto: IBaseOrderDto): Promise<void> => {
    try {
      const orderInfo = await OrdersApi.makeOrder({
        ...baseOrderDto,
        orderParts: Object.values(cartDishes).map((e) => ({
          dish: {
            id: e.dish.id,
          },
          count: e.count,
        })),
      });
      setOrderData(orderInfo);
      if (isAuthenticated) {
        if (orderInfo.receivedBonuses) {
          dispatch(addUserBonusesThunk(orderInfo.receivedBonuses));
        } else {
          console.warn('authenticated but no receivedBonuses in makeOrder answer');
        }
        if (orderInfo.spentBonuses) {
          dispatch(addUserBonusesThunk(-orderInfo.spentBonuses));
        }
      }
      dispatch(cleanPersistentCart());
    } catch (err) {
      handleError(err, emojify('Упс, не удалось оформить заказ', EmojiType.SAD));
    }
  };

  if (orderData) {
    return (
      <OrderInfo
        orderData={orderData}
      />
    );
  }

  return (
    <OrderForm
      currentBonuses={currentBonuses}
      onSubmit={onSubmitOrder}
    />
  );
};
