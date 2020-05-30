import React from 'react';
import { NavigationBar } from '../../components/NavigationBar';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

export const NavigationBarContainer: React.SFC = () => {
  const cartDishesNumber = useSelector((state: RootState) => Object.keys(state.cart.dishes).length);

  return (
    <NavigationBar
      cart={{
        cartDishesNumber,
      }}
    />
  )
};