import { createReducer, combineReducers } from '@reduxjs/toolkit';
import { addDishInCart, removeDishFromCart, cleanCart, deleteDishFromCart } from './actions';
import { ICart, ICartDishes } from './types';
import { getCartFromLocalStorage } from './helpers';

const currentCart = getCartFromLocalStorage();
const initialCartDishesState = currentCart ? currentCart.dishes : {};

const cartDishesReducer = createReducer<ICartDishes>(initialCartDishesState, (builder) => {
  builder
    .addCase(addDishInCart, (state, { payload }) => {
      const increment = payload.count;
      const dishInCart = state[payload.dish.id];
      if (!dishInCart) {
        state[payload.dish.id] = {
          dish: payload.dish,
          count: increment,
        };
      } else {
        dishInCart.count += increment;
      }
      return state;
    })
    .addCase(removeDishFromCart, (state, { payload }) => {
      const decrement = payload.count;
      const dishInCart = state[payload.dish.id];
      if (dishInCart) {
        if (dishInCart.count === decrement) {
          delete state[payload.dish.id];
        } else {
          dishInCart.count -= decrement;
        }
      }
      return state;
    })
    .addCase(deleteDishFromCart, (state, { payload }) => {
      delete state[payload.id];
      return state;
    })
    .addCase(cleanCart, () => ({}));
});

export const cartReducer = combineReducers<ICart>({
  dishes: cartDishesReducer,
});
