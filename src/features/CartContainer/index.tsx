import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Cart } from '../../components/Cart';

export const CartContainer: React.SFC = () => {
  const dishes = useSelector((state: RootState) => state.cart.dishes);

  return (
    <Cart
      dishes={dishes}
    />
  );
};