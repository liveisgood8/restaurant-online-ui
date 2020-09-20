import { createAction } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch } from '../../app/store';
import {
  getCartFromLocalStorage,
  saveCartInLocalStorage,
  cleanCartInLocalStorage,
} from './helpers';
import { IDish } from '../../api/dishes';

export const addDishInCart = createAction<IDish>('@@cart/addDish');
export const removeDishFromCart = createAction<IDish>('@@cart/removeDish');
export const cleanCart = createAction('@@cart/clean');

export const addPersistentDishInCart = (dish: IDish): AppThunk => (dispatch: AppDispatch): void => {
  const currentCart = getCartFromLocalStorage();
  if (!currentCart) {
    saveCartInLocalStorage({
      dishes: {
        [dish.id]: {
          dish,
          count: 1,
        },
      },
    });
  } else {
    const currentDish = currentCart.dishes[dish.id];
    if (currentDish) {
      currentDish.count++;
    } else {
      currentCart.dishes[dish.id] = {
        dish,
        count: 1,
      };
    }
    saveCartInLocalStorage(currentCart);
  }
  dispatch(addDishInCart(dish));
  // TODO Вынести уведомление в другое место
  // toast.success(`${dish.name} добавлено в корзину!`, {
  //   autoClose: 1500,
  //   position: 'top-left',
  // });
};

export const removePersistentDishInCart = (dish: IDish): AppThunk => (dispatch: AppDispatch): void => {
  const currentCart = getCartFromLocalStorage();
  if (!currentCart) {
    return;
  }

  const currentDish = currentCart.dishes[dish.id];
  if (!currentDish) {
    return;
  } else {
    if (currentDish.count === 1) {
      delete currentCart.dishes[dish.id];
    } else {
      currentDish.count--;
    }
  }
  saveCartInLocalStorage(currentCart);
  dispatch(removeDishFromCart(dish));
};

export const cleanPersistentCart = (): AppThunk => (dispatch: AppDispatch): void => {
  cleanCartInLocalStorage();
  dispatch(cleanCart());
};
