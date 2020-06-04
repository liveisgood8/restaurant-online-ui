import { createAction } from '@reduxjs/toolkit';
import { createApiRequestThunk } from '../../helpers/fetch';
import { AppThunk, AppDispatch } from '../../app/store';
import { DishesApi, IDish, INewDishWithFile, IDishImage } from '../../api/dishes';
import { CategoriesApi, ICategory, INewCategoryWithFile } from '../../api/categories';
import { DeepPartialWithId } from '../../types/utils';

export const setDishes = createAction<IDish[]>('@@menu/setDishes');
export const addDish = createAction<IDish>('@@menu/addDish');
export const updateDish = createAction<DeepPartialWithId<IDish>>('@@menu/updateDish');
export const deleteDish = createAction<IDish>('@@menu/deleteDish');
export const clearDishes = createAction('@@menu/clearDishes');

export const setCategories = createAction<ICategory[]>('@@menu/setCategories');
export const addCategory = createAction<ICategory>('@@menu/addCategory');

export const [getDishesThunk, getDishesStatusSelector] = createApiRequestThunk<IDish[]>({
  actions: {
    success: setDishes.toString(),
  },
  endpoint: '/menu/dishes?categoryId=:categoryId',
  method: 'GET',
});

export const addDishThunk = (
  newDish: INewDishWithFile,
): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const dish = await DishesApi.add(newDish);
    dispatch(addDish(dish));
  } catch(err) {
    // TODO
    console.error(err);
  }
};

export const [getCategoriesThunk, getCategoriesStatusSelector] = createApiRequestThunk<ICategory[]>({
  actions: {
    success: setCategories.toString(),
  },
  endpoint: '/menu/categories',
  method: 'GET',
});

export const [deleteDishThunk] = createApiRequestThunk({
  actions: {
    success: deleteDish.toString(),
  },
  endpoint: '/menu/dishes/:dishId',
  method: 'DELETE',
});

export const updateDishThunk = (
  dish: DeepPartialWithId<IDish & IDishImage>,
): AppThunk => async (dispatch: AppDispatch) => {
  try {
    DishesApi.update(dish);
    dispatch(updateDish(dish));
  } catch(err) {
    // TODO
    console.error(err);
  }
};

export const addCategoryThunk = (
  categoryInfo: INewCategoryWithFile,
): AppThunk => async (dispatch: AppDispatch) => {
  try {
    // TODO Upload image
    
    const category = await CategoriesApi.add(categoryInfo);
    dispatch(addCategory(category));
  } catch(err) {
    // TODO
    console.error(err);
  }
};