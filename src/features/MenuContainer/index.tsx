import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDishesThunk,
  getCategoriesThunk,
  getCategoriesStatusSelector,
  clearDishes,
  likeDishThunk,
  dislikeDishThunk,
  selectDishById,
} from './actions';
import { Loading } from '../../components/Loading';
import { RootState } from '../../app/store';
import { Menu } from '../../components/Menu';
import { useLocation } from 'react-router-dom';
import { IDish } from '../../api/dishes';
import { getCategoryIdFromUrlSearch } from '../../helpers/utils';
import { isAuthSelector } from '../../app/auth/selectors';
import { DishCardModalContainer } from './DishCardModalContainer';

export const MenuContainer: React.FC = () => {
  const { search } = useLocation();
  const categoryId = getCategoryIdFromUrlSearch(search);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(isAuthSelector);
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

  const onDishClick = (dish: IDish) => {
    dispatch(selectDishById(dish.id));
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
        <Fragment>
          <Menu
            dishes={dishes}
            categories={categories}
            selectedCategoryId={categoryId}
            canLikeDishes={isAuthenticated}
            onDishClick={onDishClick}
            onDishLike={onDishLike}
            onDishDislike={onDishDislike}
          />
          <DishCardModalContainer />
        </Fragment>
      )}
    </React.Fragment>
  );
};
