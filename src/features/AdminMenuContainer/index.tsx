import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { IDish, IDishBase } from '../../api/dishes';
import {
  getCategoriesThunk,
  getDishesThunk,
  clearDishes,
} from '../MenuContainer/actions';
import { AdminMenu } from '../../components/AdminMenu';
import { ICategory } from '../../api/categories';
import { NumberParam, StringParam, useQueryParam } from 'use-query-params';
import { DishEditCard } from '../../components/DishEditCard/DishEditCard';
import {
  addCategoryThunk,
  addDishThunk,
  deleteCategoryThunk,
  deleteDishThunk,
  updateCategoryThunk,
  updateDishThunk,
} from './actions';
import { adminDishesStatusSelector, adminCategoriesStatusSelector } from './selectors';
import { DishCardModal } from '../../components/DishCardModal';
import { CategoryAddCard, CategoryEditCard } from '../../components/CategoryEditCard';
import { WithoutId } from '../../types/utils';
import { DishAddCard } from '../../components/DishEditCard';
import { categoriesStatusSelectors, dishesStatusSelectors } from '../MenuContainer/selectors';
import { Loading } from '../../components/core/Loading';

enum Mode {
  ADD_DISH = 'add-dish',
  ADD_CATEGORY = 'add-category',
}

export const AdminMenuContainer: React.FC = () => {
  const [categoryId] = useQueryParam('categoryId', NumberParam);
  const [selectedDishId, setSelectedDishId] = useQueryParam('selectedDishId', NumberParam);
  const [selectedEditCategoryId, setSelectedEditCategoryId] = useQueryParam('selectedEditCategoryId', NumberParam);
  const [selectedEditDishId, setSelectedEditDishId] = useQueryParam('selectedEditDishId', NumberParam);
  const [mode, setMode] = useQueryParam('mode', StringParam);
  const dispatch = useDispatch();
  const dishes = useSelector((state: RootState) => state.menu.dishes);
  const categories = useSelector((state: RootState) => state.menu.categories);
  const isDishesLoading = useSelector(dishesStatusSelectors.isFetching);
  const isDishUpdating = useSelector(adminDishesStatusSelector.isUpdating);
  const isDishAdding = useSelector(adminDishesStatusSelector.isAdding);
  const isCategoriesLoading = useSelector(categoriesStatusSelectors.isFetching);
  const isCategoryUpdating = useSelector(adminCategoriesStatusSelector.isUpdating);
  const isCategoryAdding = useSelector(adminCategoriesStatusSelector.isAdding);

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

  const onAddNewDish = async (dish: WithoutId<IDishBase>, image?: File) => {
    await dispatch(addDishThunk(dish, image));
    setMode(undefined);
  };

  const onUpdateDish = (dish: IDishBase, image?: File) => {
    dispatch(updateDishThunk(dish, image));
  };

  const onUpdateCategory = (category: ICategory, image?: File) => {
    dispatch(updateCategoryThunk(category, image));
  };

  const onAddNewCategory = async (category: WithoutId<ICategory>, image?: File) => {
    await dispatch(addCategoryThunk(category, image));
    setMode(undefined);
  };

  const onDishPreview = (dish: IDish) => {
    setSelectedDishId(dish.id);
  };

  const onDishAdd = () => {
    setMode(Mode.ADD_DISH);
  };

  const onDishEdit = (dish: IDish) => {
    setSelectedEditDishId(dish.id);
  };

  const onDishDelete = (dish: IDish) => {
    dispatch(deleteDishThunk(dish.id));
  };

  const onCategoryAdd = () => {
    setMode(Mode.ADD_CATEGORY);
  };

  const onCategoryEdit = (category: ICategory) => {
    setSelectedEditCategoryId(category.id);
  };

  const onCategoryDelete = (category: ICategory) => {
    dispatch(deleteCategoryThunk(category.id));
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

  const makeDishAddCard = () => {
    if (mode !== Mode.ADD_DISH || !categoryId) {
      return null;
    }

    return (
      <DishAddCard
        show={true}
        categoryId={categoryId}
        isLoading={isDishAdding}
        onCreate={onAddNewDish}
        onHide={() => setMode(undefined)}
      />
    );
  };

  const makeDishEditCard = () => {
    if (!selectedEditDishId || !categoryId) {
      return null;
    }

    const selectedDish = dishes.find((e) => e.id === selectedEditDishId);
    if (!selectedDish) {
      return null;
    }

    return (
      <DishEditCard
        dish={selectedDish}
        categoryId={categoryId}
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
        {makeDishAddCard()}
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

  const makeCategoryAddCard = () => {
    if (mode !== Mode.ADD_CATEGORY) {
      return null;
    }

    return (
      <CategoryAddCard
        show={true}
        isLoading={isCategoryAdding}
        onCreate={onAddNewCategory}
        onHide={() => setMode(undefined)}
      />
    );
  };

  const makeCategoryCard = () => {
    return (
      <Fragment>
        {makeCategoryEditCard()}
        {makeCategoryAddCard()}
      </Fragment>
    );
  };

  return (
    <React.Fragment>
      {isCategoriesLoading ? (
        <Loading className="mt-5" />
      ) : (
        <Fragment>
          <AdminMenu
            isDishesLoading={isDishesLoading}
            dishes={dishes}
            categories={categories}
            selectedCategoryId={categoryId}
            onDishPreview={onDishPreview}
            onDishAdd={onDishAdd}
            onDishEdit={onDishEdit}
            onDishDelete={onDishDelete}
            onCategoryAdd={onCategoryAdd}
            onCategoryEdit={onCategoryEdit}
            onCategoryDelete={onCategoryDelete}
          />
          {makeDishCard()}
          {makeCategoryCard()}
        </Fragment>
      )}
    </React.Fragment>
  );
};
