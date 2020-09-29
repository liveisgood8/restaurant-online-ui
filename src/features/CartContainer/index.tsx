import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/store';
import { Cart } from './Cart';
import { addPersistentDishInCart,
  deletePersistentDishInCart,
  removePersistentDishInCart,
} from './actions';
import { IDish } from '../../api/dishes';

export const CartContainer: React.FC = () => {
  const dispatch = useDispatch();
  const dishes = useSelector((state: RootState) => state.cart.dishes);

  const onAddInCart = (dish: IDish): void => {
    dispatch(addPersistentDishInCart(dish, 1));
  };

  const onRemoveSingleFromCart = (dish: IDish): void => {
    dispatch(removePersistentDishInCart(dish, 1));
  };

  const onRemoveAllFromCart = (dish: IDish): void => {
    dispatch(deletePersistentDishInCart(dish));
  };

  return (
    <Cart
      dishes={Object.values(dishes)}
      onIncreaseDishCount={onAddInCart}
      onDecreaseDishCount={onRemoveSingleFromCart}
      onRemoveDish={onRemoveAllFromCart}
    />
  );
};
