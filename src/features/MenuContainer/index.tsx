import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDishesThunk,
  getCategoriesThunk,
  clearDishes,
  likeDishThunk,
  dislikeDishThunk,
} from './actions';
import { RootState } from '../../app/store';
import { Menu } from '../../components/Menu';
import { IDish } from '../../api/dishes';
import { isAuthSelector } from '../../app/auth/selectors';
import { NumberParam, useQueryParam } from 'use-query-params';
import { addPersistentDishInCart } from '../CartContainer/actions';
import { notifications } from '../../helpers/notifications';
import { categoriesStatusSelectors, dishesStatusSelectors } from './selectors';
import { Loading } from '../../components/core/Loading';

export const MenuContainer: React.FC = () => {
  const [categoryId] = useQueryParam('categoryId', NumberParam);
  const [selectedDishId, setSelectedDishId] = useQueryParam('dishId', NumberParam);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(isAuthSelector);
  const dishes = useSelector((state: RootState) => state.menu.dishes);
  const categories = useSelector((state: RootState) => state.menu.categories);
  const isCategoriesLoading = useSelector(categoriesStatusSelectors.isFetching);
  const isDishesLoading = useSelector(dishesStatusSelectors.isFetching);

  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  useEffect(() => {
    if (categoryId) {
      dispatch(getDishesThunk(categoryId));
    } else {
      dispatch(clearDishes());
    }
  }, [categoryId, dispatch]);

  const onDishClick = (dish: IDish) => {
    setSelectedDishId(dish.id);
  };

  const onDishLike = (dish: IDish) => {
    dispatch(likeDishThunk(dish.id));
  };

  const onDishDislike = (dish: IDish) => {
    dispatch(dislikeDishThunk(dish.id));
  };

  const onCart = (dish: IDish, count: number) => {
    dispatch(addPersistentDishInCart(dish, count));
    unselectDish();
    notifications.success(`${dish.name} добавлена в корзину!`);
  };

  const unselectDish = () => {
    setSelectedDishId(undefined);
  };

  return (
    <React.Fragment>
      {isCategoriesLoading ? (
        <Loading />
      ) : (
        <Fragment>
          <Menu
            isDishesLoading={isDishesLoading}
            dishes={dishes}
            categories={categories}
            selectedCategoryId={categoryId}
            selectedDishId={selectedDishId}
            canLikeDishes={isAuthenticated}
            onDishCardHide={unselectDish}
            onPutDishInCart={onCart}
            onDishClick={onDishClick}
            onDishLike={onDishLike}
            onDishDislike={onDishDislike}
          />
        </Fragment>
      )}
    </React.Fragment>
  );
};
