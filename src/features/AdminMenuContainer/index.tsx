import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../../components/Loading';
import { RootState } from '../../app/store';
import { IDish, IDishBase } from '../../api/dishes';
import {
  getCategoriesThunk,
  getDishesThunk,
  clearDishes,
} from '../MenuContainer/actions';
import { AdminMenu } from '../../components/AdminMenu';
import { ICategory } from '../../api/categories';
import { NumberParam, StringParam, useQueryParams } from 'use-query-params';
import { DishEditCard } from '../../components/DishEditCard/DishEditCard';
import {
  addCategoryThunk,
  addDishThunk,
  deleteCategoryThunk,
  deleteDishThunk,
  updateCategoryThunk,
  updateDishThunk,
} from './actions';
import { DishCardModal } from '../../components/DishCardModal';
import { CategoryAddCard, CategoryEditCard } from '../../components/CategoryEditCard';
import { WithoutId } from '../../types/utils';
import { DishAddCard } from '../../components/DishEditCard';
import { categoriesStatusSelectors } from '../MenuContainer/selectors';

enum Mode {
  ADD_DISH = 'add-dish',
  ADD_CATEGORY = 'add-category',
}

export const AdminMenuContainer: React.FC = () => {
  const [query, setQuery] = useQueryParams({
    categoryId: NumberParam,
    selectedDishId: NumberParam,
    selectedEditCategoryId: NumberParam,
    selectedEditDishId: NumberParam,
    mode: StringParam,
  });
  const { categoryId: selectedCategoryId, selectedDishId, selectedEditCategoryId, selectedEditDishId, mode } = query;
  const dispatch = useDispatch();
  const dishes = useSelector((state: RootState) => state.menu.dishes);
  const categories = useSelector((state: RootState) => state.menu.categories);
  const isCategoriesLoading = useSelector(categoriesStatusSelectors.isFetching);
  const isDishUpdating = useSelector((state: RootState) => state.adminMenu.dishes.isUpdating);
  const isDishAdding = useSelector((state: RootState) => state.adminMenu.dishes.isAdding);
  const isDishAdded = useSelector((state: RootState) => state.adminMenu.dishes.isAdded);
  const isCategoryUpdating = useSelector((state: RootState) => state.adminMenu.categories.isUpdating);
  const isCategoryAdding = useSelector((state: RootState) => state.adminMenu.categories.isAdding);
  const isCategoryAdded = useSelector((state: RootState) => state.adminMenu.categories.isAdded);

  useEffect(() => {
    dispatch(getCategoriesThunk());
  }, [dispatch]);

  useEffect(() => {
    console.log(selectedCategoryId);
    if (selectedCategoryId) {
      dispatch(getDishesThunk(selectedCategoryId));
    } else {
      dispatch(clearDishes());
    }
  }, [selectedCategoryId, dispatch]);

  useEffect(() => {
    if ((isCategoryAdded && mode === Mode.ADD_CATEGORY) || (isDishAdded && mode === Mode.ADD_DISH)) {
      setQuery(({
        ...query,
        mode: undefined,
      }), 'push');
    }
  }, [query, setQuery, isCategoryAdded, isDishAdded, mode]);

  const onAddNewDish = (dish: WithoutId<IDishBase>, image?: File) => {
    dispatch(addDishThunk(dish, image));
  };

  const onUpdateDish = (dish: IDishBase, image?: File) => {
    dispatch(updateDishThunk(dish, image));
  };

  const onUpdateCategory = (category: ICategory, image?: File) => {
    dispatch(updateCategoryThunk(category, image));
  };

  const onAddNewCategory = (category: WithoutId<ICategory>, image?: File) => {
    console.log(category);
    dispatch(addCategoryThunk(category, image));
  };

  const onDishPreview = (dish: IDish) => {
    // setSelectedDishId(dish.id);
    setQuery(({
      ...query,
      selectedDishId: dish.id,
    }), 'push');
  };

  const onDishAdd = () => {
    // setMode(Mode.ADD_DISH);
    setQuery(({
      ...query,
      mode: Mode.ADD_DISH,
    }), 'push');
  };

  const onDishEdit = (dish: IDish) => {
    // setSelectedEditDishId(dish.id);
    setQuery(({
      ...query,
      selectedEditDishId: dish.id,
    }), 'push');
  };

  const onDishDelete = (dish: IDish) => {
    dispatch(deleteDishThunk(dish.id));
  };

  const onCategoryAdd = () => {
    // setMode(Mode.ADD_CATEGORY);
    setQuery(({
      ...query,
      mode: Mode.ADD_CATEGORY,
    }), 'push');
  };

  const onCategoryEdit = (category: ICategory) => {
    // setSelectedEditCategoryId(category.id);
    setQuery(({
      ...query,
      selectedEditCategoryId: category.id,
    }), 'push');
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
        onHide={() => setQuery(({
          ...query,
          selectedDishId: undefined,
        }), 'push')}
      />
    );
  };

  const makeDishAddCard = () => {
    if (mode !== Mode.ADD_DISH || !selectedCategoryId) {
      return null;
    }

    return (
      <DishAddCard
        show={true}
        categoryId={selectedCategoryId}
        isLoading={isDishAdding}
        onCreate={onAddNewDish}
        onHide={() => setQuery(({
          ...query,
          mode: undefined,
        }), 'push')}
      />
    );
  };

  const makeDishEditCard = () => {
    if (!selectedEditDishId || !selectedCategoryId) {
      return null;
    }

    const selectedDish = dishes.find((e) => e.id === selectedEditDishId);
    if (!selectedDish) {
      return null;
    }

    return (
      <DishEditCard
        dish={selectedDish}
        categoryId={selectedCategoryId}
        isLoading={isDishUpdating}
        onUpdate={onUpdateDish}
        show={true}
        onHide={() => setQuery(({
          ...query,
          selectedEditDishId: undefined,
        }), 'push')}
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
        onHide={() => setQuery(({
          ...query,
          selectedEditCategoryId: undefined,
        }), 'push')}
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
        onHide={() => setQuery(({
          ...query,
          mode: undefined,
        }), 'push')}
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
        <Loading />
      ) : (
        <Fragment>
          <AdminMenu
            dishes={dishes}
            categories={categories}
            selectedCategoryId={selectedCategoryId}
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
