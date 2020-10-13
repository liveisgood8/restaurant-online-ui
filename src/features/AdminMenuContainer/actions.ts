import { createAction } from '@reduxjs/toolkit';
import { CategoriesApi, ICategory } from '../../api/categories';
import { DishesApi, IDish, IDishBase } from '../../api/dishes';
import { AppDispatch, AppThunk } from '../../app/store';
import { handleError } from '../../errors/handler';
import { emojify } from '../../helpers/emoji/emoji-messages';
import { EmojiType } from '../../helpers/emoji/emoji-type';
import { DeepPartialWithId, WithoutId } from '../../types/utils';
import { addCategory, addDish, deleteCategory, deleteDish, updateCategory, updateDish } from '../MenuContainer/actions';

export const setDishUpdating = createAction<boolean>('@@adminMenu/setDishUpdating');
export const setDishAdding = createAction<boolean>('@@adminMenu/setDishAdding');
export const setDishAdded = createAction<boolean>('@@adminMenu/setDishAdded');
export const setCategoryUpdating = createAction<boolean>('@@adminMenu/setCategoryUpdating');
export const setCategoryAdding = createAction<boolean>('@@adminMenu/setCategoryAdding');
export const setCategoryAdded = createAction<boolean>('@@adminMenu/setCategoryAdded');


export const addDishThunk = (
  newDish: WithoutId<IDishBase>,
  image?: File,
): AppThunk => async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch(setDishAdded(false));
    dispatch(setDishAdding(true));
    const dish = await DishesApi.add(newDish, image);
    dispatch(addDish(dish));
    dispatch(setDishAdded(true));
  } catch (err) {
    handleError(err, emojify('Упс, не удалось добавить блюдо', EmojiType.SAD));
    dispatch(setDishAdded(false));
  } finally {
    dispatch(setDishAdding(false));
  }
};

export const updateDishThunk = (
  dish: DeepPartialWithId<IDish>,
  image?: File,
): AppThunk => async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch(setDishUpdating(true));
    const newDish = await DishesApi.update(dish, image);
    dispatch(updateDish(newDish));
  } catch (err) {
    handleError(err, emojify('Упс, не удалось обновить информацию о блюде', EmojiType.SAD));
  } finally {
    dispatch(setDishUpdating(false));
  }
};

export const deleteDishThunk = (
  dishId: number,
): AppThunk => async (dispatch: AppDispatch): Promise<void> => {
  try {
    await DishesApi.delete(dishId);
    dispatch(deleteDish(dishId));
  } catch (err) {
    handleError(err, emojify('Упс, не удалось удалить блюдо', EmojiType.SAD));
  }
};

export const addCategoryThunk = (
  categoryInfo: WithoutId<ICategory>,
  image?: File,
): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(setCategoryAdded(false));
    dispatch(setCategoryAdding(true));
    const category = await CategoriesApi.add(categoryInfo, image);
    dispatch(addCategory(category));
    dispatch(setCategoryAdded(true));
  } catch (err) {
    handleError(err, emojify('Упс, не удалось добавить категорию блюд', EmojiType.SAD));
    dispatch(setCategoryAdded(false));
  } finally {
    dispatch(setCategoryAdding(false));
  }
};

export const updateCategoryThunk = (
  category: DeepPartialWithId<ICategory>,
  image?: File,
): AppThunk => async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch(setCategoryUpdating(true));
    const newDish = await CategoriesApi.update(category, image);
    dispatch(updateCategory(newDish));
  } catch (err) {
    handleError(err, emojify('Упс, не удалось обновить информацию о категории', EmojiType.SAD));
  } finally {
    dispatch(setCategoryUpdating(false));
  }
};

export const deleteCategoryThunk = (
  categoryId: number,
): AppThunk => async (dispatch: AppDispatch): Promise<void> => {
  try {
    await CategoriesApi.delete(categoryId);
    dispatch(deleteCategory(categoryId));
  } catch (err) {
    handleError(err, emojify('Упс, не удалось удалить категорию', EmojiType.SAD));
  }
};
