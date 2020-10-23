import './styles.scss';
import FallbackDishImage from '../../../images/dish-image-fallback.png';

import React from 'react';
import { ICartDish } from '../types';
import { DishAttributeLabel } from '../../../components/MenuDish/DishAttributeLabel';
import { Counter } from '../../../components/Counter';
import { Button } from '../../../components/core/Button';
import { ImageContainer } from '../../../components/core/ImageContainer';
import { Icons } from '../../../components/core/icons/icons';

interface ICartDishProps {
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export const CartDish: React.FC<ICartDish & ICartDishProps> = ({ dish, count, onIncrease, onDecrease, onRemove }) => {
  return (
    <div className="cart-dish d-md-flex align-items-center">
      <div className="d-flex">
        <ImageContainer
          className="cart-dish__image-wrapper"
          src={dish.imageUrl}
          fallbackSrc={FallbackDishImage}
        />
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
          rightIcon={Icons.TRASH}
          onClick={onRemove}
        />
      </div>
    </div>
  );
};
