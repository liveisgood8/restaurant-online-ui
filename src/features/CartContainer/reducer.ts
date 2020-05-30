import { createReducer, combineReducers } from '@reduxjs/toolkit';
import { addDishInCart, removeDishFromCart, cleanCart } from './actions';
import { ICart, ICartDishes } from './types';
import { getCartFromLocalStorage } from './helpers';

const currentCart = getCartFromLocalStorage();
const initialCartDishesState = currentCart ? currentCart.dishes : {};

const cartDishesReducer = createReducer<ICartDishes>(initialCartDishesState, (builder) => {
  builder
    .addCase(addDishInCart, (state, { payload }) => {
      const dishInCart = state[payload.id]; 
      if (!dishInCart) {
        state[payload.id] = {
          dish: payload,
          count: 1,
        };
      } else {
        dishInCart.count++;
      }
      return state;
    })
    .addCase(removeDishFromCart, (state, { payload }) => {
      const dishInCart = state[payload.id]; 
      if (dishInCart) {
        if (dishInCart.count === 1) {
          delete state[payload.id];
        } else {
          dishInCart.count--;
        }
      }
      return state;
    })
    .addCase(cleanCart, () => ({}));
});

export const cartReducer = combineReducers<ICart>({
  dishes: cartDishesReducer,
});
