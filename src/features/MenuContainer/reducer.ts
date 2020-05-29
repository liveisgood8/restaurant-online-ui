import { createReducer, combineReducers } from '@reduxjs/toolkit';
import { IDish } from '../../types/menu';
import { setDishes } from './actions';

const dishesReducer = createReducer<IDish[]>([], (builder) => {
  builder
    .addCase(setDishes, (state, action) => action.payload);
});

export const menuReducer = combineReducers({
  dishes: dishesReducer,
});
