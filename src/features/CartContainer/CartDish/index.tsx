import './styles.scss';
import { ReactComponent as TrashIcon } from './trash.svg';

import React from 'react';
import { ICartDish } from '../types';
import { DishAttributeLabel } from '../../../components/MenuDish/DishAttributeLabel';
import { Counter } from '../../../components/Counter';
import { Button } from '../../../components/core/Button';

interface ICartDishProps {
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export const CartDish: React.FC<ICartDish & ICartDishProps> = ({ dish, count, onIncrease, onDecrease, onRemove }) => {
  return (
    <div className="cart-dish d-md-flex align-items-center mb-3">
      <div className="d-flex">
        <div className="cart-dish__image-wrapper">
          <img className="w-100 h-100" src={dish.imageUrl} alt={dish.name} />
        </div>
        <div className="ml-4">
          <span className="ro-font-regular-base">{dish.name}</span>
          <DishAttributeLabel
            className="mt-2"
            label={`${dish.weight} г`}
          />
        </div>
      </div>
      <div className="mt-2 mt-md-0 ml-auto d-flex align-items-center justify-content-center">
        <Counter
          value={count}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
        />
        <span className="ro-font-medium-base ml-3">{`${dish.price}₽`}</span>
        <Button
          className="ml-3"
          disableShadow
          icon={TrashIcon}
          onClick={onRemove}
        />
      </div>
    </div>
  );
};
