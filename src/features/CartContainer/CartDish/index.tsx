import './styles.scss';

import React from 'react';
import { ICartDish } from '../types';

export const CartDish: React.SFC<ICartDish> = ({ dish, count }) => {
  return (
    <div className="border rounded p-2">
      <img id="cart-dish-image" src={dish.imageUrl} alt={dish.name} className="d-inline-block" />
      <span>{dish.name}</span>
      <span>Количество: {count}</span>
    </div>
  );
};