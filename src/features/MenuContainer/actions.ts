import { createAction } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch } from '../../app/store';
import { DishesApi, IDish } from '../../api/dishes';
import { CategoriesApi, ICategory } from '../../api/categories';
import { DeepPartialWithId } from '../../types/utils';
import { handleError } from '../../errors/handler';
import { EmojiType } from '../../helpers/emoji/emoji-type';
import { emojify } from '../../helpers/emoji/emoji-messages';
import { createStatusActions, RequestType } from '../../app/status/helpers';

export const dishesStatus = createStatusActions('@@menu/dishes');
export const setDishes = createAction<IDish[]>('@@menu/setDishes');
export const addDish = createAction<IDish>('@@menu/addDish');
export const updateDish = createAction<DeepPartialWithId<IDish>>('@@menu/updateDish');
export const likeDish = createAction<Pick<IDish, 'id'>>('@@menu/likeDish');
export const dislikeDish = createAction<Pick<IDish, 'id'>>('@@menu/dislikeDish');
export const deleteDish = createAction<number>('@@menu/deleteDish');
export const clearDishes = createAction('@@menu/clearDishes');

export const categoriesStatus = createStatusActions('@@menu/categories');
export const setCategories = createAction<ICategory[]>('@@menu/setCategories');
export const addCategory = createAction<ICategory>('@@menu/addCategory');
export const updateCategory = createAction<DeepPartialWithId<ICategory>>('@@menu/updateCategory');
export const deleteCategory = createAction<number>('@@menu/deleteCategory');

export const getDishesThunk = (categoryId: number): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(dishesStatus.actions.request(RequestType.FETCH));
    const dishes = await DishesApi.get(categoryId);
    dispatch(setDishes(dishes));
    dispatch(dishesStatus.actions.success(RequestType.FETCH));
  } catch (err) {
    dispatch(dishesStatus.actions.failure(RequestType.FETCH));
    handleError(err, emojify('Упс, не удалось получить список блюд', EmojiType.SAD));
  }
};

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

export const getCategoriesThunk = (): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(dishesStatus.actions.request(RequestType.FETCH));
    const categories = await CategoriesApi.get();
    dispatch(setCategories(categories));
    dispatch(dishesStatus.actions.success(RequestType.FETCH));
  } catch (err) {
    dispatch(dishesStatus.actions.failure(RequestType.FETCH));
    handleError(err, emojify('Упс, не удалось получить список категорий', EmojiType.SAD));
  }
};
