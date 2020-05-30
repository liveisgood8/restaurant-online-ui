import { createAction } from '@reduxjs/toolkit';
import { IDish, ICategory } from '../../types/menu';
import { createApiRequestThunk } from '../../helpers/fetch';
import { AppThunk, AppDispatch } from '../../app/store';
import { IDishInfoWithFile } from '../../components/AddDish';
import { DishesApi } from '../../api/dishes';
import { apiUrl } from '../../config';

export const setDishes = createAction<IDish[]>('@@menu/setDishes');
export const addDish = createAction<IDish>('@@menu/addDish');
export const deleteDish = createAction<IDish>('@@menu/deleteDish');
export const clearDishes = createAction('@@menu/clearDishes');

export const setCategories = createAction<ICategory[]>('@@menu/setCategories');

export const [getDishesThunk, getDishesStatusSelector] = createApiRequestThunk<IDish[]>({
  actions: {
    success: setDishes.toString(),
  },
  endpoint: '/dishes?categoryId=:categoryId',
  method: 'GET',
});

export const addDishThunk = (
  dishInfo: IDishInfoWithFile,
  categoryId: number,
): AppThunk => async (dispatch: AppDispatch) => {
  try {
    const imageUrl = apiUrl + await DishesApi.uploadImage(dishInfo.image);
    delete dishInfo.image;

    const dish = await DishesApi.add({
      ...dishInfo,
      imageUrl,
      category: {
        id: categoryId,
      },
    });
    dispatch(addDish(dish));
  } catch(err) {
    // TODO
    console.log(err);
  }
};

export const [getCategoriesThunk, getCategoriesStatusSelector] = createApiRequestThunk<ICategory[]>({
  actions: {
    success: setCategories.toString(),
  },
  endpoint: '/categories',
  method: 'GET',
});

export const [deleteDishThunk] = createApiRequestThunk<IDish>({
  actions: {
    success: deleteDish.toString(),
  },
  endpoint: '/dishes/:dishId',
  method: 'DELETE',
});

