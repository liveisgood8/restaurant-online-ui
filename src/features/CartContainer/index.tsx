import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { Cart } from './Cart';
import { addPersistentDishInCart, cleanPersistentCart, deletePersistentDishInCart, removePersistentDishInCart } from './actions';
import { OrdersApi, IOrderWithBonuses } from '../../api/orders';
import { OrderConfirmation } from '../../pages/OrderConfiramtion/OrderInfo';
import { IDish } from '../../api/dishes';
import { addUserBonusesThunk } from '../../app/auth/actions';
import { PaymentMethodComponent } from '../../pages/OrderConfiramtion/PaymentMethodComponent';

export const CartContainer: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.authInfo.isAuthenticated);
  const dishes = useSelector((state: RootState) => state.cart.dishes);
  const [orderWithBonuses, setOrderWithBonuses] = useState<IOrderWithBonuses>();

  const onAddInCart = (dish: IDish): void => {
    dispatch(addPersistentDishInCart(dish, 1));
  };

  const onRemoveSingleFromCart = (dish: IDish): void => {
    dispatch(removePersistentDishInCart(dish, 1));
  };

  const onRemoveAllFromCart = (dish: IDish): void => {
    dispatch(deletePersistentDishInCart(dish));
  };

  const onCleanCart = () => {
    dispatch(cleanPersistentCart());
  };

  // TODO Перенести в OrderConfirmationPage
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
    <Cart
      dishes={Object.values(dishes)}
      onIncreaseDishCount={onAddInCart}
      onDecreaseDishCount={onRemoveSingleFromCart}
      onRemoveDish={onRemoveAllFromCart}
      onCleanCart={onCleanCart}
    />
  );
};
