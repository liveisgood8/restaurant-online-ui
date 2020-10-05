import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../../components/Loading';
import { RootState } from '../../app/store';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IDish, INewDish, DishesApi } from '../../api/dishes';
import { getCategoryIdFromUrlSearch } from '../../helpers/utils';
import { getCategoriesStatusSelector,
  getCategoriesThunk,
  getDishesThunk,
  clearDishes,
  addDishThunk,
  addCategoryThunk,
  updateCategoryThunk,
  deleteCategoryThunk,
  updateDish,
  deleteDish,
  selectDishById,
} from '../MenuContainer/actions';
import { AdminMenu } from '../../components/AdminMenu';
import { INewCategory, ICategory } from '../../api/categories';
import { DeepPartialWithId } from '../../types/utils';
import { AdminDishCardModalContainer } from './AdminDishCardModalContainer';

export const AdminMenuContainer: React.FC = () => {
  const { search } = useLocation();
  const categoryId = getCategoryIdFromUrlSearch(search);
  const dispatch = useDispatch();
  const dishes = useSelector((state: RootState) => state.menu.dishes);
  const categories = useSelector((state: RootState) => state.menu.categories);
  const isCategoriesLoading = useSelector(getCategoriesStatusSelector);
  const [dishUpdating, setDishUpdating] = useState(false);

  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  useEffect(() => {
    if (categoryId) {
      dispatch(getDishesThunk({
        endpoint: {
          bindings: {
            categoryId,
          },
        },
      }));
    } else {
      dispatch(clearDishes());
    }
  }, [categoryId, dispatch]);

  const onDishClick = (dish: IDish) => {
    dispatch(selectDishById(dish.id));
  };

  const onAddNewDish = (dish: Omit<INewDish, 'category' | 'likes'>, image?: File) => {
    if (!categoryId) {
      toast.error('Для добавления блюда необходимо выбрать категорию!');
    } else {
      dispatch(addDishThunk({
        ...dish,
        category: {
          id: categoryId,
        },
      }, image));
    }
  };

  const onDeleteDish = async (dish: IDish) => {
    try {
      await DishesApi.delete(dish.id);
      dispatch(deleteDish(dish.id));
      return true;
    } catch (err) {
      // TODO
      console.error(err);
      return false;
    }
  };

  const onUpdateDish = async (dish: DeepPartialWithId<IDish>, image?: File) => {
    setDishUpdating(true);
    try {
      const newDish = await DishesApi.update(dish, image);
      dispatch(updateDish(newDish));
    } catch ( err) {
      // TODO
      console.error(err);
    }
    setDishUpdating(false);
  };

  const onAddNewCategory = (category: INewCategory, image?: File) => {
    dispatch(addCategoryThunk(category, image));
  };

  const onChangeCategory = (category: ICategory, image?: File) => {
    dispatch(updateCategoryThunk(category, image));
  };

  const onDeleteCategory = (category: ICategory) => {
    dispatch(deleteCategoryThunk({
      endpoint: {
        bindings: { id: category.id },
      },
    }));
  };

  return (
    <React.Fragment>
      {isCategoriesLoading ? (
        <Loading />
      ) : (
        <Fragment>
          <AdminMenu
            dishes={dishes}
            categories={categories}
            selectedCategoryId={categoryId}
            isDishUpdating={dishUpdating}
            onDishClick={onDishClick}
            onAddNewDish={onAddNewDish}
            onDeleteDish={onDeleteDish}
            onUpdateDish={onUpdateDish}
            onAddNewCategory={onAddNewCategory}
            onChangeCategory={onChangeCategory}
            onDeleteCategory={onDeleteCategory}
          />
          <AdminDishCardModalContainer />
        </Fragment>
      )}
    </React.Fragment>
  );
};
