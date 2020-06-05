import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDishesThunk,
  getCategoriesThunk,
  getCategoriesStatusSelector,
  clearDishes,
  deleteDishThunk,
  addDishThunk,
  addCategoryThunk,
  updateDishThunk
} from './actions';
import { Loading } from '../../components/Loading';
import { RootState } from '../../app/store';
import { Menu } from '../../components/Menu';
import { addPersistentDishInCart } from '../CartContainer/actions';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IDish, INewDish } from '../../api/dishes';
import { INewCategoryWithFile } from '../../api/categories';

const getCategoryIdFromUrlSearch = (searchPartOfUrl: string): number | undefined => {
  const categoryIdString = new URLSearchParams(searchPartOfUrl).get('categoryId');
  if (categoryIdString) {
    return parseInt(categoryIdString);
  }
};

interface IMenuContainerProps {
  isAdminModeEnabled?: boolean;
}

export const MenuContainer: React.FC<IMenuContainerProps> = ({ isAdminModeEnabled }) => {
  const { search } = useLocation();
  const categoryId = getCategoryIdFromUrlSearch(search);
  const dispatch = useDispatch();
  const dishes = useSelector((state: RootState) => state.menu.dishes);
  const categories = useSelector((state: RootState) => state.menu.categories);
  const isCategoriesLoading = useSelector(getCategoriesStatusSelector);

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
  }, [categoryId, dispatch])

  const onPutDishInCart = (dish: IDish) => {
    dispatch(addPersistentDishInCart(dish));
  };

  const onAddNewDish = (dish: Omit<INewDish, 'category'>, image?: File) => {
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

  const onDeleteDish = (dish: IDish) => {
    dispatch(deleteDishThunk({
      entity: dish,
      endpoint: {
        bindings: {
          dishId: dish.id,
        },
      },
    }));
  };

  const onChangeDish = (dish: IDish, image?: File) => {
    dispatch(updateDishThunk(dish, image));
  }

  const onAddNewCategory = (category: INewCategoryWithFile) => {
    dispatch(addCategoryThunk(category));
  }

  return (
    <React.Fragment>
      {isCategoriesLoading ? (
        <Loading />
      ) : (
        <Menu
          isAdminModeEnabled={isAdminModeEnabled}
          dishes={dishes}
          categories={categories}
          selectedCategoryId={categoryId}
          onPutDishInCart={onPutDishInCart}
          onAddNewDish={onAddNewDish}
          onDeleteDish={onDeleteDish}
          onChangeDish={onChangeDish}
          onAddNewCategory={onAddNewCategory}
        />
      )}
    </React.Fragment>
  )
};