import { CategoriesApi, ICategory } from '../../api/categories';
import { DishesApi, IDish, IDishBase } from '../../api/dishes';
import { createStatusActions, RequestType } from '../../app/status/helpers';
import { AppDispatch, AppThunk } from '../../app/store';
import { handleError } from '../../errors/handler';
import { emojify } from '../../helpers/emoji/emoji-messages';
import { EmojiType } from '../../helpers/emoji/emoji-type';
import { DeepPartialWithId, WithoutId } from '../../types/utils';
import { addCategory, addDish, deleteCategory, deleteDish, updateCategory, updateDish } from '../MenuContainer/actions';

export const adminDishesStatus = createStatusActions('@@adminMenu/dish');
export const adminCategoriesStatus = createStatusActions('@@adminMenu/categories');


export const addDishThunk = (
  newDish: WithoutId<IDishBase>,
  image?: File,
): AppThunk => async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch(adminDishesStatus.actions.request(RequestType.ADD));
    const dish = await DishesApi.add(newDish, image);
    dispatch(addDish(dish));
    dispatch(adminDishesStatus.actions.success(RequestType.ADD));
  } catch (err) {
    handleError(err, emojify('Упс, не удалось добавить блюдо', EmojiType.SAD));
    dispatch(adminDishesStatus.actions.failure(RequestType.ADD));
  }
};

export const updateDishThunk = (
  dish: DeepPartialWithId<IDish>,
  image?: File,
): AppThunk => async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch(adminDishesStatus.actions.request(RequestType.UPDATE));
    const newDish = await DishesApi.update(dish, image);
    dispatch(updateDish(newDish));
    dispatch(adminDishesStatus.actions.success(RequestType.UPDATE));
  } catch (err) {
    handleError(err, emojify('Упс, не удалось обновить информацию о блюде', EmojiType.SAD));
    dispatch(adminDishesStatus.actions.failure(RequestType.UPDATE));
  }
};

export const deleteDishThunk = (
  dishId: number,
): AppThunk => async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch(adminDishesStatus.actions.request(RequestType.DELETE));
    await DishesApi.delete(dishId);
    dispatch(deleteDish(dishId));
    dispatch(adminDishesStatus.actions.success(RequestType.DELETE));
  } catch (err) {
    handleError(err, emojify('Упс, не удалось удалить блюдо', EmojiType.SAD));
    dispatch(adminDishesStatus.actions.failure(RequestType.DELETE));
  }
};

export const addCategoryThunk = (
  categoryInfo: WithoutId<ICategory>,
  image?: File,
): AppThunk => async (dispatch: AppDispatch) => {
  try {
    dispatch(adminCategoriesStatus.actions.request(RequestType.ADD));
    const category = await CategoriesApi.add(categoryInfo, image);
    dispatch(addCategory(category));
    dispatch(adminCategoriesStatus.actions.success(RequestType.ADD));
  } catch (err) {
    handleError(err, emojify('Упс, не удалось добавить категорию блюд', EmojiType.SAD));
    dispatch(adminCategoriesStatus.actions.failure(RequestType.ADD));
  }
};

export const updateCategoryThunk = (
  category: DeepPartialWithId<ICategory>,
  image?: File,
): AppThunk => async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch(adminCategoriesStatus.actions.request(RequestType.UPDATE));
    const newDish = await CategoriesApi.update(category, image);
    dispatch(updateCategory(newDish));
    dispatch(adminCategoriesStatus.actions.success(RequestType.UPDATE));
  } catch (err) {
    handleError(err, emojify('Упс, не удалось обновить информацию о категории', EmojiType.SAD));
    dispatch(adminCategoriesStatus.actions.failure(RequestType.UPDATE));
  }
};

export const deleteCategoryThunk = (
  categoryId: number,
): AppThunk => async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch(adminCategoriesStatus.actions.request(RequestType.DELETE));
    await CategoriesApi.delete(categoryId);
    dispatch(deleteCategory(categoryId));
    dispatch(adminCategoriesStatus.actions.success(RequestType.DELETE));
  } catch (err) {
    handleError(err, emojify('Упс, не удалось удалить категорию', EmojiType.SAD));
    dispatch(adminCategoriesStatus.actions.failure(RequestType.DELETE));
  }
};
