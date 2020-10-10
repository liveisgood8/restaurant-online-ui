import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IDishBase } from '../../../api/dishes';
import { RootState } from '../../../app/store';
import { DishEditCard } from '../../../components/DishEditCard/DishEditCard';
import { selectDishById } from '../../MenuContainer/actions';
import { selectedDishSelector } from '../../MenuContainer/selectors';
import { updateDishThunk } from '../actions';

export const AdminDishCardModalContainer: React.FC = () => {
  const dispatch = useDispatch();
  const selectedDish = useSelector(selectedDishSelector);
  const isUpdating = useSelector((state: RootState) => state.adminMenu.dishUpdate.isUpdating);

  const unselectDish = () => {
    dispatch(selectDishById(null));
  };

  const onUpdate = (dish: IDishBase, image?: File) => {
    dispatch(updateDishThunk(dish, image));
  };

  if (!selectedDish) {
    return null;
  }

  return (
    <DishEditCard
      dish={selectedDish}
      isLoading={isUpdating}
      onUpdate={onUpdate}
      show={true}
      onHide={unselectDish}
    />
  );
};
