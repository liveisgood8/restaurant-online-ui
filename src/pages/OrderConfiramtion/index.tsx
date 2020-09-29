import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IOrderWithBonuses, OrdersApi } from '../../api/orders';
import { addUserBonusesThunk } from '../../app/auth/actions';
import { RootState } from '../../app/store';
import { cleanPersistentCart } from '../../features/CartContainer/actions';
import { IOrderData, OrderForm } from './OrderForm';
import { OrderInfo } from './OrderInfo';

export const OrderConfirmationPage: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.authInfo.isAuthenticated);
  const cartDishes = useSelector((state: RootState) => state.cart.dishes);
  const [orderWithBonuses, setOrderWithBonuses] = useState<IOrderWithBonuses>();

  const onSubmitOrder = async (orderData: IOrderData): Promise<void> => {
    const orderInfo = await OrdersApi.makeOrder({
      ...orderData,
      entries: Object.values(cartDishes),
    });
    setOrderWithBonuses(orderInfo);
    if (isAuthenticated) {
      dispatch(addUserBonusesThunk(orderInfo.bonuses));
    }
    dispatch(cleanPersistentCart());
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
