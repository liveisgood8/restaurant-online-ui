import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDishesThunk,
  getCategoriesThunk,
  getCategoriesStatusSelector,
  clearDishes,
  deleteDishThunk,
  addDishThunk
} from './actions';
import { Loading } from '../../components/Loading';
import { RootState } from '../../app/store';
import { Menu } from '../../components/Menu';
import { IDish } from '../../types/menu';
import { addPersistentDishInCart } from '../CartContainer/actions';
import { useLocation } from 'react-router-dom';
import { IDishInfoWithFile } from '../../components/AddDish';
import { toast } from 'react-toastify';

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

  const onAddNewDish = (dishInfo: IDishInfoWithFile) => {
    if (!categoryId) {
      toast.error('Для добавления блюда необходимо выбрать категорию!');
    } else {
      dispatch(addDishThunk(dishInfo, categoryId));
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

  const onEditDish = (dish: IDish) => {
    // TODO
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
          onEditDish={onEditDish}
        />
      )}
    </React.Fragment>
  )
};