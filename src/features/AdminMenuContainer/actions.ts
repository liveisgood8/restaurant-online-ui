import { createAction } from '@reduxjs/toolkit';
import { CategoriesApi, ICategory } from '../../api/categories';
import { DishesApi, IDish } from '../../api/dishes';
import { AppDispatch, AppThunk } from '../../app/store';
import { handleError } from '../../errors/handler';
import { emojify } from '../../helpers/emoji/emoji-messages';
import { EmojiType } from '../../helpers/emoji/emoji-type';
import { DeepPartialWithId } from '../../types/utils';
import { updateCategory, updateDish } from '../MenuContainer/actions';

export const setDishUpdating = createAction<boolean>('@@adminMenu/setDishUpdating');
export const setCategoryUpdating = createAction<boolean>('@@adminMenu/setCategoryUpdating');

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

