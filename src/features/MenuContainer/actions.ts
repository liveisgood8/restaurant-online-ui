import { createAction } from '@reduxjs/toolkit';
import { createApiRequestThunk } from '../../helpers/fetch';
import { AppThunk, AppDispatch } from '../../app/store';
import { DishesApi, IDish } from '../../api/dishes';
import { ICategory } from '../../api/categories';
import { DeepPartialWithId } from '../../types/utils';
import { apiUrl } from '../../config';
import { handleError } from '../../errors/handler';
import { EmojiType } from '../../helpers/emoji/emoji-type';
import { emojify } from '../../helpers/emoji/emoji-messages';

export const setDishes = createAction<IDish[]>('@@menu/setDishes');
export const addDish = createAction<IDish>('@@menu/addDish');
export const updateDish = createAction<DeepPartialWithId<IDish>>('@@menu/updateDish');
export const likeDish = createAction<Pick<IDish, 'id'>>('@@menu/likeDish');
export const dislikeDish = createAction<Pick<IDish, 'id'>>('@@menu/dislikeDish');
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
        }))));
      },
      preventDefault: true,
    },
  },
  endpoint: '/menu/dishes?categoryId=:categoryId',
  method: 'GET',
});

export const likeDishThunk = (dishId: number): AppThunk => async (dispatch: AppDispatch): Promise<void> => {
  try {
    await DishesApi.like(dishId);
    dispatch(likeDish({
      id: dishId,
    }));
  } catch (err) {
    handleError(err, emojify('Упс, не удалось поставить лайк блюду', EmojiType.SAD));
  }
};

export const dislikeDishThunk = (dishId: number): AppThunk => async (dispatch: AppDispatch): Promise<void> => {
  try {
    await DishesApi.dislike(dishId);
    dispatch(dislikeDish({
      id: dishId,
    }));
  } catch (err) {
    handleError(err, emojify('Упс, не удалось поставить дизлайк блюду', EmojiType.SAD));
  }
};

export const [getCategoriesThunk, getCategoriesStatusSelector] = createApiRequestThunk<ICategory[]>({
  actions: {
    success: {
      type: setCategories.toString(),
      handler: (dispatch: AppDispatch, categories: ICategory[]): void => {
        dispatch(setCategories(categories.map((e) => ({
          ...e,
          imageUrl: e.imageUrl ? apiUrl + e.imageUrl : undefined,
        }))));
      },
      preventDefault: true,
    },
  },
  endpoint: '/menu/categories',
  method: 'GET',
});
