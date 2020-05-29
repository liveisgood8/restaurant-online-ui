import React from 'react';
import { IDish } from '../../types/menu';

interface ICartDishProps {
  dish: IDish;
}

export const CartDish: React.SFC<ICartDishProps> = ({ dish }) => {
  return (
    <div className="border rounded p-2">
      <img src={dish.imageUrl} alt={dish.name} className="d-inline-block" />
      <span>{dish.name}</span>
      {/* <Button onClick={() => onCart(dish)}>В корзину</Button> */}
    </div>
  );
};