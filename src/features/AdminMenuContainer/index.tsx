import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../../components/Loading';
import { RootState } from '../../app/store';
import { toast } from 'react-toastify';
import { IDish, INewDish, DishesApi, IDishBase } from '../../api/dishes';
import { getCategoriesStatusSelector,
  getCategoriesThunk,
  getDishesThunk,
  clearDishes,
} from '../MenuContainer/actions';
import { AdminMenu } from '../../components/AdminMenu';
import { ICategory } from '../../api/categories';
import { useQueryParam, NumberParam, StringParam } from 'use-query-params';
import { DishEditCard } from '../../components/DishEditCard/DishEditCard';
import { updateCategoryThunk, updateDishThunk } from './actions';
import { DishCardModal } from '../../components/DishCardModal';
import { CategoryEditCard } from '../../components/CategoryEditCard';

enum Mode {
  ADD_DISH = 'add-dish',
  ADD_CATEGORY = 'add-category',
}

export const AdminMenuContainer: React.FC = () => {
  const [selectedCategoryId] = useQueryParam('categoryId', NumberParam);
  const [selectedDishId, setSelectedDishId] = useQueryParam('dishId', NumberParam);
  const [selectedEditCategoryId, setSelectedEditCategoryId] = useQueryParam('editCategoryId', NumberParam);
  const [selectedEditDishId, setSelectedEditDishId] = useQueryParam('editDishId', NumberParam);
  const [mode, setMode] = useQueryParam('mode', StringParam);
  const dispatch = useDispatch();
  const dishes = useSelector((state: RootState) => state.menu.dishes);
  const categories = useSelector((state: RootState) => state.menu.categories);
  const isCategoriesLoading = useSelector(getCategoriesStatusSelector);
  const isDishUpdating = useSelector((state: RootState) => state.adminMenu.dishes.isUpdating);
  const isCategoryUpdating = useSelector((state: RootState) => state.adminMenu.categories.isUpdating);

  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategoryId) {
      dispatch(getDishesThunk({
        endpoint: {
          bindings: {
            categoryId: selectedCategoryId,
          },
        },
      }));
    } else {
      dispatch(clearDishes());
    }
  }, [selectedCategoryId, dispatch]);

  const onUpdateDish = (dish: IDishBase, image?: File) => {
    dispatch(updateDishThunk(dish, image));
  };

  const onUpdateCategory = (category: ICategory, image?: File) => {
    dispatch(updateCategoryThunk(category, image));
  };

  // const onAddNewDish = (dish: Omit<INewDish, 'category' | 'likes'>, image?: File) => {
  //   if (!categoryId) {
  //     toast.error('Для добавления блюда необходимо выбрать категорию!');
  //   } else {
  //     dispatch(addDishThunk({
  //       ...dish,
  //       category: {
  //         id: selectedCategoryId,
  //       },
  //     }, image));
  //   }
  // };

  // const onDeleteDish = async (dish: IDish) => {
  //   try {
  //     await DishesApi.delete(dish.id);
  //     dispatch(deleteDish(dish.id));
  //     return true;
  //   } catch (err) {
  //     // TODO
  //     console.error(err);
  //     return false;
  //   }
  // };

  // const onAddNewCategory = (category: INewCategory, image?: File) => {
  //   dispatch(addCategoryThunk(category, image));
  // };

  // const onChangeCategory = (category: ICategory, image?: File) => {
  //   dispatch(updateCategoryThunk(category, image));
  // };

  // const onDeleteCategory = (category: ICategory) => {
  //   dispatch(deleteCategoryThunk({
  //     endpoint: {
  //       bindings: { id: category.id },
  //     },
  //   }));
  // };

  const onDishPreview = (dish: IDish) => {
    setSelectedDishId(dish.id);
  };

  const onDishEdit = (dish: IDish) => {
    setSelectedEditDishId(dish.id);
  };

  const onCategoryAdd = () => {

  };

  const onCategoryEdit = (category: ICategory) => {
    setSelectedEditCategoryId(category.id);
  };

  const makeDishPreviewCard = () => {
    if (!selectedDishId) {
      return null;
    }

    const selectedDish = dishes.find((e) => e.id === selectedDishId);
    if (!selectedDish) {
      return null;
    }

    return (
      <DishCardModal
        dish={selectedDish}
        isVisible={true}
        disableAddInCartFeature
        onHide={() => setSelectedDishId(undefined)}
      />
    );
  };

  const makeDishEditCard = () => {
    if (!selectedEditDishId) {
      return null;
    }

    const selectedDish = dishes.find((e) => e.id === selectedEditDishId);
    if (!selectedDish) {
      return null;
    }

    return (
      <DishEditCard
        dish={selectedDish}
        isLoading={isDishUpdating}
        onUpdate={onUpdateDish}
        show={true}
        onHide={() => setSelectedEditDishId(undefined)}
      />
    );
  };

  const makeDishCard = () => {
    return (
      <Fragment>
        {makeDishPreviewCard()}
        {makeDishEditCard()}
      </Fragment>
    );
  };

  const makeCategoryEditCard = () => {
    if (!selectedEditCategoryId) {
      return null;
    }

    const selectedCategory = categories.find((e) => e.id === selectedEditCategoryId);
    if (!selectedCategory) {
      return null;
    }

    return (
      <CategoryEditCard
        category={selectedCategory}
        isLoading={isCategoryUpdating}
        onUpdate={onUpdateCategory}
        show={true}
        onHide={() => setSelectedEditCategoryId(undefined)}
      />
    );
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
            selectedCategoryId={selectedCategoryId}
            onDishPreview={onDishPreview}
            onDishEdit={onDishEdit}
            onCategoryAdd={onCategoryAdd}
            onCategoryEdit={onCategoryEdit}
          />
          {makeDishCard()}
          {makeCategoryEditCard()}
        </Fragment>
      )}
    </React.Fragment>
  );
};
