import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { Cart } from './Cart';
import { cleanPersistentCart } from './actions';
import { OrdersApi, IOrderWithBonuses } from '../../api/orders';
import { OrderConfirmation } from './OrderConfirmation';

export const CartContainer: React.FC = () => {
  const dispatch = useDispatch();
  const dishes = useSelector((state: RootState) => state.cart.dishes);
  const [orderWithBonuses, setOrderWithBonuses] = useState<IOrderWithBonuses>();

  const onCleanCart = () => {
    dispatch(cleanPersistentCart());
  };

  const onMakeOrder = async () => {
    const order = await OrdersApi.makeOrder(Object.values(dishes));
    setOrderWithBonuses(order);
    onCleanCart();
  };

  if (orderWithBonuses) {
    return (
      <OrderConfirmation 
        orderWithBonuses={orderWithBonuses}
      />
    )
  }

  return (
    <Cart
      dishes={Object.values(dishes)}
      onCleanCart={onCleanCart}
      onMakeOrder={onMakeOrder}
    />
  );
};