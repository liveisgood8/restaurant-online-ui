import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDishesThunk,
  getCategoriesThunk,
  getCategoriesStatusSelector,
  clearDishes,
  likeDishThunk,
  dislikeDishThunk,
} from './actions';
import { Loading } from '../../components/Loading';
import { RootState } from '../../app/store';
import { Menu } from '../../components/Menu';
import { IDish } from '../../api/dishes';
import { isAuthSelector } from '../../app/auth/selectors';
import { NumberParam, useQueryParam } from 'use-query-params';
import { DishCardModal } from '../../components/DishCardModal';
import { addPersistentDishInCart } from '../CartContainer/actions';
import { showSuccessNotification } from '../../helpers/notifications';

export const MenuContainer: React.FC = () => {
  const [categoryId] = useQueryParam('categoryId', NumberParam);
  const [selectedDishId, setSelectedDishId] = useQueryParam('dishId', NumberParam);
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
    showSuccessNotification(`${dish.name} добавлена в корзину!`);
  };

  const unselectDish = () => {
    setSelectedDishId(undefined);
  };

  const makeDishCardComponent = () => {
    const selectedDish = dishes.find((e) => e.id === selectedDishId);
    if (!selectedDish) {
      return null;
    }
    return (
      <DishCardModal
        dish={selectedDish}
        isVisible={true}
        onHide={unselectDish}
        onCart={(count) => onCart(selectedDish, count)}
      />
    );
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
          {makeDishCardComponent()}
        </Fragment>
      )}
    </React.Fragment>
  );
};
