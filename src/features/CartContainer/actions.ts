import { createAction } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch } from '../../app/store';
import {
  getCartFromLocalStorage,
  saveCartInLocalStorage,
  cleanCartInLocalStorage,
} from './helpers';
import { IDish } from '../../api/dishes';
import { ICartDish } from './types';

export const addDishInCart = createAction<ICartDish>('@@cart/addDish');
export const removeDishFromCart = createAction<ICartDish>('@@cart/removeDish');
export const deleteDishFromCart = createAction<IDish>('@@cart/deleteDish');
export const cleanCart = createAction('@@cart/clean');

export const addPersistentDishInCart = (dish: IDish, count: number): AppThunk => (dispatch: AppDispatch): void => {
  const currentCart = getCartFromLocalStorage();
  if (!currentCart) {
    saveCartInLocalStorage({
      dishes: {
        [dish.id]: {
          dish,
          count,
        },
      },
    });
  } else {
    const currentDish = currentCart.dishes[dish.id];
    if (currentDish) {
      currentDish.count += count;
    } else {
      currentCart.dishes[dish.id] = {
        dish,
        count,
      };
    }
    saveCartInLocalStorage(currentCart);
  }
  dispatch(addDishInCart({
    dish,
    count,
  }));
};

export const removePersistentDishInCart = (dish: IDish, count: number): AppThunk => (dispatch: AppDispatch): void => {
  const currentCart = getCartFromLocalStorage();
  if (currentCart) {
    const currentDish = currentCart.dishes[dish.id];
    if (currentDish) {
      if (!count || currentDish.count === count) {
        delete currentCart.dishes[dish.id];
      } else {
        currentDish.count -= count;
      }
    }
    saveCartInLocalStorage(currentCart);
  }
  dispatch(removeDishFromCart({
    dish,
    count,
  }));
};

export const deletePersistentDishInCart = (dish: IDish): AppThunk => (dispatch: AppDispatch): void => {
  const currentCart = getCartFromLocalStorage();
  if (currentCart) {
    delete currentCart.dishes[dish.id];
    saveCartInLocalStorage(currentCart);
  }
  dispatch(deleteDishFromCart(dish));
};

export const cleanPersistentCart = (): AppThunk => (dispatch: AppDispatch): void => {
  cleanCartInLocalStorage();
  dispatch(cleanCart());
};
