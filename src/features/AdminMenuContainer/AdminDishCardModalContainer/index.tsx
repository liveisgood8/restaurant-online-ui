import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IDish } from '../../../api/dishes';
import { RootState } from '../../../app/store';
import { DishCardModal } from '../../../components/DishCardModal';
import { showSuccessNotification } from '../../../helpers/notifications';
import { DeepPartialWithId } from '../../../types/utils';
import { addPersistentDishInCart } from '../../CartContainer/actions';
import { selectDishById } from '../../MenuContainer/actions';
import { selectedDishSelector } from '../../MenuContainer/selectors';
import { updateDishThunk } from '../actions';

export const AdminDishCardModalContainer: React.FC = () => {
  const dispatch = useDispatch();
  const selectedDish = useSelector(selectedDishSelector);
  const isImageUpdating = useSelector((state: RootState) => state.adminMenu.dishUpdate.isImageUpdating);
  const isPropertiesUpdating = useSelector((state: RootState) => state.adminMenu.dishUpdate.isPropertiesUpdating);

  const onCart = (count: number) => {
    if (selectedDish) {
      dispatch(addPersistentDishInCart(selectedDish, count));
      unselectDish();
      showSuccessNotification(`${selectedDish.name} добавлена в корзину!`);
    }
  };

  const unselectDish = () => {
    dispatch(selectDishById(null));
  };

  const onUpdate = (dish: DeepPartialWithId<IDish>, image?: File) => {
    dispatch(updateDishThunk(dish, image));
  };

  return (
    <DishCardModal
      dish={selectedDish as IDish}
      isVisible={selectedDish != null}
      onHide={unselectDish}
      onCart={onCart}
      editableMode={true}
      onUpdate={onUpdate}
      isImageUpdating={isImageUpdating}
      isPropertiesUpdating={isPropertiesUpdating}
    />
  );
};
