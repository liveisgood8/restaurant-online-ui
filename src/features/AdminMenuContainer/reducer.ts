import { combineReducers, createReducer } from '@reduxjs/toolkit';
import { setCategoryUpdating, setDishUpdating } from './actions';

interface IDishesState {
  isUpdating: boolean;
}

const dishesReducer = createReducer<IDishesState>({
  isUpdating: false,
}, (builder) => {
  builder
    .addCase(setDishUpdating, (state, action) => ({
      ...state,
      isUpdating: action.payload,
    }));
});

interface ICategoriesState {
  isUpdating: boolean;
}

const categoriesReducer = createReducer<ICategoriesState>({
  isUpdating: false,
}, (builder) => {
  builder
    .addCase(setCategoryUpdating, (state, action) => ({
      ...state,
      isUpdating: action.payload,
    }));
});

export const adminMenuReducer = combineReducers({
  dishes: dishesReducer,
  categories: categoriesReducer,
});
