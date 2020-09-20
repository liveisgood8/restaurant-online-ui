import './styles.scss';

import React from 'react';
import { ICartDish } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

interface ICartDishProps {
  onIncrease: () => void;
  onDecrease: () => void;
}

export const CartDish: React.FC<ICartDish & ICartDishProps> = ({ dish, count, onIncrease, onDecrease }) => {
  return (
    <div className="border rounded p-2">
      <img id="cart-dish-image" src={dish.imageUrl} alt={dish.name} className="d-inline-block" />
      <span>{dish.name}</span>
      <span>Количество: {count}</span>
      <div className="d-inline-block">
        <FontAwesomeIcon
          className="cursor-pointer"
          icon={faPlus}
          onClick={onIncrease}
        />
        <FontAwesomeIcon
          className="ml-2 cursor-pointer"
          icon={faMinus}
          onClick={onDecrease}
        />
      </div>
    </div>
  );
};
