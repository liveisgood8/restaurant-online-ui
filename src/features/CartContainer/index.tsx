import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { Cart } from './Cart';
import { addPersistentDishInCart, cleanPersistentCart, removePersistentDishInCart } from './actions';
import { OrdersApi, IOrderWithBonuses } from '../../api/orders';
import { OrderConfirmation } from './OrderConfirmation';
import { IDish } from '../../api/dishes';
import { addUserBonusesThunk } from '../../app/auth/actions';
import { PaymentMethodComponent } from './PaymentMethodComponent';

export const CartContainer: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.authInfo.isAuthenticated);
  const dishes = useSelector((state: RootState) => state.cart.dishes);
  const [orderWithBonuses, setOrderWithBonuses] = useState<IOrderWithBonuses>();

  const onAddInCart = (dish: IDish): void => {
    dispatch(addPersistentDishInCart(dish));
  };

  const onRemoveFromCart = (dish: IDish): void => {
    dispatch(removePersistentDishInCart(dish));
  };

  const onCleanCart = () => {
    dispatch(cleanPersistentCart());
  };

  const onMakeOrder = async () => {
    const orderWithBonuses = await OrdersApi.makeOrder(Object.values(dishes));
    setOrderWithBonuses(orderWithBonuses);
    if (isAuthenticated) {
      dispatch(addUserBonusesThunk(orderWithBonuses.bonuses));
    }
    onCleanCart();
  };

  if (orderWithBonuses) {
    return (
      <OrderConfirmation
        orderWithBonuses={orderWithBonuses}
      />
    );
  }

  return (
    <div>
      <Cart
        dishes={Object.values(dishes)}
        onIncreaseDishCount={onAddInCart}
        onDecreaseDishCount={onRemoveFromCart}
        onCleanCart={onCleanCart}
        onMakeOrder={onMakeOrder}
      />
      <PaymentMethodComponent
        onChange={console.log}
      />
    </div>
  );
};
