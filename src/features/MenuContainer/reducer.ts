import { createReducer, combineReducers } from '@reduxjs/toolkit';
import {
  setDishes,
  setCategories,
  clearDishes,
  deleteDish,
  addDish,
  addCategory,
  updateDish,
  updateCategory,
  deleteCategory,
  likeDish,
  dislikeDish,
  selectDishById,
} from './actions';
import { IDish } from '../../api/dishes';
import { ICategory } from '../../api/categories';

const dishesReducer = createReducer<IDish[]>([], (builder) => {
  builder
    .addCase(setDishes, (state, action) => action.payload)
    .addCase(addDish, (state, action) => state.concat(action.payload))
    .addCase(updateDish, (state, action) => state.map((e) => e.id === action.payload.id ? ({
      ...e,
      ...action.payload,
    }) as IDish : e))
    .addCase(likeDish, (state, action) => state.map((e) => e.id === action.payload.id ? ({
      ...e,
      likes: {
        ...e.likes,
        likeCount: e.likes.likeCount + 1,
      },
    }) : e))
    .addCase(dislikeDish, (state, action) => state.map((e) => e.id === action.payload.id ? ({
      ...e,
      likes: {
        ...e.likes,
        dislikeCount: e.likes.dislikeCount + 1,
      },
    }) : e))
    .addCase(deleteDish, (state, action) => state.filter((e) => e.id !== action.payload))
    .addCase(clearDishes, () => []);
});

const selectedDishReducer = createReducer<number | null>(null, (builder) => {
  builder
    .addCase(selectDishById, (state, action) => action.payload);
});

const categoriesReducer = createReducer<ICategory[]>([], (builder) => {
  builder
    .addCase(setCategories, (state, { payload }) => payload)
    .addCase(addCategory, (state, { payload }) => state.concat(payload))
    .addCase(updateCategory, (state, action) => state.map((e) => e.id === action.payload.id ? ({
      ...e,
      ...action.payload,
    }) : e))
    .addCase(deleteCategory, (state, action) => state.filter((e) => e.id !== action.payload));
});

export const menuReducer = combineReducers({
  selectedDishId: selectedDishReducer,
  dishes: dishesReducer,
  categories: categoriesReducer,
});
