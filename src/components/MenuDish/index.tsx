import React from 'react';
import { IDish } from '../../types/menu';
import { Button } from 'react-bootstrap';

interface IMenuDishProps {
  dish: IDish;
  onCart: (dish: IDish) => void;
}

export const MenuDish: React.SFC<IMenuDishProps> = ({ dish, onCart }) => {
  return (
    <div className="border rounded p-3">
      <p>{dish.name}</p>
      <p>Белки: {dish.protein}</p>
      <p>Жиры: {dish.fat}</p>
      <p>Углеводы: {dish.carbohydrates}</p>
      <img src={dish.imageUrl} alt={dish.name} className="mw-100" />
      <Button onClick={() => onCart(dish)}>В корзину</Button>
    </div>
  );
};