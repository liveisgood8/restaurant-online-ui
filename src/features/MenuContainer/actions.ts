import { createAction } from '@reduxjs/toolkit';
import { createApiRequestThunk } from '../../helpers/fetch';
import { AppThunk, AppDispatch } from '../../app/store';
import { DishesApi, IDish, INewDish } from '../../api/dishes';
import { CategoriesApi, ICategory, INewCategory } from '../../api/categories';
import { DeepPartialWithId } from '../../types/utils';
import { apiUrl } from '../../config';

export const setDishes = createAction<IDish[]>('@@menu/setDishes');
export const addDish = createAction<IDish>('@@menu/addDish');
export const updateDish = createAction<DeepPartialWithId<IDish>>('@@menu/updateDish');
export const deleteDish = createAction<number>('@@menu/deleteDish');
export const clearDishes = createAction('@@menu/clearDishes');

export const setCategories = createAction<ICategory[]>('@@menu/setCategories');
export const addCategory = createAction<ICategory>('@@menu/addCategory');
export const updateCategory = createAction<DeepPartialWithId<ICategory>>('@@menu/updateCategory');
export const deleteCategory = createAction<number>('@@menu/deleteCategory');

export const [getDishesThunk, getDishesStatusSelector] = createApiRequestThunk<IDish[]>({
  actions: {
    success: {
      type: setDishes.toString(),
      handler: (dispatch: AppDispatch, dishes: IDish[]): void => {
        dispatch(setDishes(dishes.map((e) => ({
          ...e,
          imageUrl: e.imageUrl ? apiUrl + e.imageUrl : undefined,
        }))))
      },
      preventDefault: true,
    },
  },
  endpoint: '/menu/dishes?categoryId=:categoryId',
  method: 'GET',
});

export const addDishThunk = (
  newDish: INewDish,
  image?: File,
): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const dish = await DishesApi.add(newDish, image);
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
  endpoint: '/menu/dishes/:id',
  method: 'DELETE',
});

export const updateDishThunk = (
  dish: DeepPartialWithId<IDish>,
  image?: File,
): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const newDish = await DishesApi.update(dish, image);
    dispatch(updateDish(newDish));
  } catch(err) {
    // TODO
    console.error(err);
  }
};

export const addCategoryThunk = (
  categoryInfo: INewCategory,
  image?: File,
): AppThunk => async (dispatch: AppDispatch) => {
  try {
    // TODO Upload image
    
    const category = await CategoriesApi.add(categoryInfo, image);
    dispatch(addCategory(category));
  } catch(err) {
    // TODO
    console.error(err);
  }
};

export const [deleteCategoryThunk] = createApiRequestThunk({
  actions: {
    success: deleteCategory.toString(),
  },
  endpoint: '/menu/categories/:id',
  method: 'DELETE',
});

export const updateCategoryThunk = (
  category: DeepPartialWithId<ICategory>,
  image?: File,
): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const newCategory = await CategoriesApi.update(category, image);
    dispatch(updateCategory(newCategory));
  } catch(err) {
    // TODO
    console.error(err);
  }
};