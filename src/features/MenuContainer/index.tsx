import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDishesThunk,
  getCategoriesThunk,
  getCategoriesStatusSelector,
  clearDishes} from './actions';
import { Loading } from '../../components/Loading';
import { RootState } from '../../app/store';
import { Menu } from '../../components/Menu';
import { addPersistentDishInCart } from '../CartContainer/actions';
import { useLocation } from 'react-router-dom';
import { IDish } from '../../api/dishes';
import { getCategoryIdFromUrlSearch } from '../../helpers/utils';

export const MenuContainer: React.FC = () => {
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

  
  return (
    <React.Fragment>
      {isCategoriesLoading ? (
        <Loading />
      ) : (
        <Menu
          dishes={dishes}
          categories={categories}
          selectedCategoryId={categoryId}
          onPutDishInCart={onPutDishInCart}
        />
      )}
    </React.Fragment>
  )
};