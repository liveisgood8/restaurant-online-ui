import React from 'react';
import { NavigationBar } from '../../components/NavigationBar';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { authService } from '../../services/auth-service';

export const NavigationBarContainer: React.SFC = () => {
  const cartDishesNumber = useSelector((state: RootState) => Object.keys(state.cart.dishes).length);
  const userInfo = authService.getAuthInfo()?.userInfo; // TODO Перевести в стор

  return (
    <NavigationBar
      userInfo={userInfo}
      cart={{
        cartDishesNumber,
      }}
    />
  )
};