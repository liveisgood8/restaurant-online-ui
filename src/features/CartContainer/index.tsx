import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { Cart } from '../../components/Cart';
import { cleanPersistentCart } from './actions';

export const CartContainer: React.SFC = () => {
  const dispatch = useDispatch();
  const dishes = useSelector((state: RootState) => state.cart.dishes);

  const onCleanCart = () => {
    dispatch(cleanPersistentCart());
  };

  const onMakeOrder = () => {
    // TODO
    console.log('making order', dishes);
  };

  return (
    <Cart
      dishes={Object.values(dishes)}
      onCleanCart={onCleanCart}
      onMakeOrder={onMakeOrder}
    />
  );
};