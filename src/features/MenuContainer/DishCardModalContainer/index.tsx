import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IDish } from '../../../api/dishes';
import { DishCardModal } from '../../../components/DishCardModal';
import { showSuccessNotification } from '../../../helpers/notifications';
import { addPersistentDishInCart } from '../../CartContainer/actions';
import { selectDishById } from '../actions';
import { selectedDishSelector } from '../selectors';

export const DishCardModalContainer: React.FC = () => {
  const dispatch = useDispatch();
  const selectedDish = useSelector(selectedDishSelector);

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

  return (
    <DishCardModal
      dish={selectedDish as IDish}
      isVisible={selectedDish != null}
      onHide={unselectDish}
      onCart={onCart}
    />
  );
};
