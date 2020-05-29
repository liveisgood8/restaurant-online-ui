import { createReducer, combineReducers } from '@reduxjs/toolkit';
import { IDish } from '../../types/menu';
import { addDishInCart, removeDishFromCart } from './actions';

const cartDishesReducer = createReducer<IDish[]>([], (builder) => {
  builder
    .addCase(addDishInCart, (state, action) => state.concat(action.payload))
    .addCase(removeDishFromCart, (state, action) => state.filter((e) => e.id !== action.payload.id));
});

export const cartReducer = combineReducers({
  dishes: cartDishesReducer,
});
