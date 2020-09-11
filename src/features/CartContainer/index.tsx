import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { Cart } from './Cart';
import { cleanPersistentCart } from './actions';
import { OrdersApi, IOrder } from '../../api/orders';
import { OrderConfirmation } from './OrderConfirmation';

export const CartContainer: React.FC = () => {
  const dispatch = useDispatch();
  const dishes = useSelector((state: RootState) => state.cart.dishes);
  const [order, setOrder] = useState<IOrder>();

  const onCleanCart = () => {
    dispatch(cleanPersistentCart());
  };

  const onMakeOrder = async () => {
    const order = await OrdersApi.makeOrder(Object.values(dishes));
    setOrder(order);
    onCleanCart();
  };

  if (order) {
    return (
      <OrderConfirmation 
        order={order}
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