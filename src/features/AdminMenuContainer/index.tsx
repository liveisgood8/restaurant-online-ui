import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../../components/Loading';
import { RootState } from '../../app/store';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IDish, INewDish } from '../../api/dishes';
import { getCategoryIdFromUrlSearch } from '../../helpers/utils';
import { getCategoriesStatusSelector,
  getCategoriesThunk,
  getDishesThunk,
  clearDishes,
  addDishThunk,
  deleteDishThunk,
  updateDishThunk,
  addCategoryThunk,
  updateCategoryThunk,
  deleteCategoryThunk,
} from '../MenuContainer/actions';
import { AdminMenu } from '../../components/AdminMenu';
import { INewCategory, ICategory } from '../../api/categories';

export const AdminMenuContainer: React.FC = () => {
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
          id: dish.id,
        },
      },
    }));
  };

  const onChangeDish = (dish: IDish, image?: File) => {
    dispatch(updateDishThunk(dish, image));
  }

  const onAddNewCategory = (category: INewCategory, image?: File) => {
    dispatch(addCategoryThunk(category, image));
  }

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
        <AdminMenu
          dishes={dishes}
          categories={categories}
          selectedCategoryId={categoryId}
          onAddNewDish={onAddNewDish}
          onDeleteDish={onDeleteDish}
          onChangeDish={onChangeDish}
          onAddNewCategory={onAddNewCategory}
          onChangeCategory={onChangeCategory}
          onDeleteCategory={onDeleteCategory}
        />
      )}
    </React.Fragment>
  )
};