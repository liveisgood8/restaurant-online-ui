import { createReducer, combineReducers } from '@reduxjs/toolkit';
import { IDish, ICategory } from '../../types/menu';
import { setDishes, setCategories, clearDishes, deleteDish, addDish } from './actions';

const dishesReducer = createReducer<IDish[]>([], (builder) => {
  builder
    .addCase(setDishes, (state, action) => action.payload)
    .addCase(addDish, (state, action) => state.concat(action.payload))
    .addCase(deleteDish, (state, action) => state.filter((e) => e.id !== action.payload.id))
    .addCase(clearDishes, () => []);
});

const categoriesReducer = createReducer<ICategory[]>([], (builder) => {
  builder
    .addCase(setCategories, (state, { payload }) => payload);
});

export const menuReducer = combineReducers({
  dishes: dishesReducer,
  categories: categoriesReducer,
});
