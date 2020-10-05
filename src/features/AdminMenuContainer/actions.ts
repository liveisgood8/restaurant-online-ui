import { createAction } from '@reduxjs/toolkit';
import { DishesApi, IDish } from '../../api/dishes';
import { AppDispatch, AppThunk } from '../../app/store';
import { handleError } from '../../errors/handler';
import { emojify } from '../../helpers/emoji/emoji-messages';
import { EmojiType } from '../../helpers/emoji/emoji-type';
import { DeepPartialWithId } from '../../types/utils';
import { updateDish } from '../MenuContainer/actions';

export const setDishImageUpdating = createAction<boolean>('@@adminMenu/setDishImageUpdating');
export const setDishPropertiesUpdating = createAction<boolean>('@@adminMenu/setDishPropertiesUpdating');

export const updateDishThunk = (
  dish: DeepPartialWithId<IDish>,
  image?: File,
): AppThunk => async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch(setDishPropertiesUpdating(true));
    if (image) {
      dispatch(setDishImageUpdating(true));
    }
    const newDish = await DishesApi.update(dish, image);
    dispatch(updateDish(newDish));
  } catch (err) {
    handleError(err, emojify('Упс, не удалось обновить информацию о блюде', EmojiType.SAD));
  } finally {
    dispatch(setDishPropertiesUpdating(false));
    if (image) {
      dispatch(setDishImageUpdating(false));
    }
  }
};
