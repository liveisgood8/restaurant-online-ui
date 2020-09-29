import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDishesThunk,
  getCategoriesThunk,
  getCategoriesStatusSelector,
  clearDishes, likeDishThunk, dislikeDishThunk } from './actions';
import { Loading } from '../../components/Loading';
import { RootState } from '../../app/store';
import { Menu } from '../../components/Menu';
import { addPersistentDishInCart } from '../CartContainer/actions';
import { useLocation } from 'react-router-dom';
import { IDish } from '../../api/dishes';
import { getCategoryIdFromUrlSearch } from '../../helpers/utils';
import { showSuccessNotification } from '../../helpers/notifications';

export const MenuContainer: React.FC = () => {
  const { search } = useLocation();
  const categoryId = getCategoryIdFromUrlSearch(search);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.authInfo.isAuthenticated);
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
  }, [categoryId, dispatch]);

  const onPutDishInCart = (dish: IDish, count: number) => {
    dispatch(addPersistentDishInCart(dish, count));
    showSuccessNotification(`${dish.name} добавлена в корзину!`);
  };

  const onDishLike = (dish: IDish) => {
    dispatch(likeDishThunk(dish.id));
  };

  const onDishDislike = (dish: IDish) => {
    dispatch(dislikeDishThunk(dish.id));
  };

  return (
    <React.Fragment>
      {isCategoriesLoading ? (
        <Loading />
      ) : (
        <Menu
          dishes={dishes}
          categories={categories}
          selectedCategoryId={categoryId}
          canLikeDishes={isAuthenticated}
          onPutDishInCart={onPutDishInCart}
          onDishLike={onDishLike}
          onDishDislike={onDishDislike}
        />
      )}
    </React.Fragment>
  );
};
