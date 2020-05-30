import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDishesThunk, getDishesStatusSelector } from './actions';
import { Loading } from '../../components/Loading';
import { RootState } from '../../app/store';
import { Menu } from '../../components/Menu';
import { IDish } from '../../types/menu';
import { addPersistentDishInCart } from '../CartContainer/actions';

export const MenuContainer: React.SFC = () => {
  const dispatch = useDispatch();
  const dishes = useSelector((state: RootState) => state.menu.dishes);
  const isLoading = useSelector(getDishesStatusSelector);

  useEffect(() => {
    dispatch(getDishesThunk())
  }, [dispatch]);

  const onAddedInCart = (dish: IDish) => {
    dispatch(addPersistentDishInCart(dish));
  };

  return (
    <React.Fragment>
      {isLoading ? (
        <Loading />
      ) : (
        <Menu
          dishes={dishes}
          onCart={onAddedInCart}
        />
      )}
    </React.Fragment>
  )
};