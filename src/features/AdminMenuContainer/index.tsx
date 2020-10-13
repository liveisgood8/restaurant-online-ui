import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../../components/Loading';
import { RootState } from '../../app/store';
import { IDish, IDishBase } from '../../api/dishes';
import { getCategoriesStatusSelector,
  getCategoriesThunk,
  getDishesThunk,
  clearDishes,
} from '../MenuContainer/actions';
import { AdminMenu } from '../../components/AdminMenu';
import { ICategory } from '../../api/categories';
import { useQueryParam, NumberParam, StringParam } from 'use-query-params';
import { DishEditCard } from '../../components/DishEditCard/DishEditCard';
import { addCategoryThunk, addDishThunk, deleteCategoryThunk, deleteDishThunk, updateCategoryThunk, updateDishThunk } from './actions';
import { DishCardModal } from '../../components/DishCardModal';
import { CategoryAddCard, CategoryEditCard } from '../../components/CategoryEditCard';
import { WithoutId } from '../../types/utils';
import { DishAddCard } from '../../components/DishEditCard';

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
  const isDishAdding = useSelector((state: RootState) => state.adminMenu.dishes.isAdding);
  const isDishAdded = useSelector((state: RootState) => state.adminMenu.dishes.isAdded);
  const isCategoryUpdating = useSelector((state: RootState) => state.adminMenu.categories.isUpdating);
  const isCategoryAdding = useSelector((state: RootState) => state.adminMenu.categories.isAdding);
  const isCategoryAdded = useSelector((state: RootState) => state.adminMenu.categories.isAdded);

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

  useEffect(() => {
    if ((isCategoryAdded && mode === Mode.ADD_CATEGORY) || (isDishAdded && mode === Mode.ADD_DISH)) {
      setMode(undefined);
    }
  }, [isCategoryAdded, isDishAdded, mode, setMode]);

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
    dispatch(addCategoryThunk(category, image));
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
    if (mode !== Mode.ADD_DISH || !selectedCategoryId) {
      return null;
    }

    return (
      <DishAddCard
        show={true}
        categoryId={selectedCategoryId}
        isLoading={isDishAdding}
        onCreate={onAddNewDish}
        onHide={() => setMode(undefined)}
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
