import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { IDish } from '../../api/dishes';

interface IMenuDishProps {
  dish: IDish;
  onCart?: (dish: IDish) => void;
}

export const MenuDish: React.FC<IMenuDishProps> = (props) => {
  const [imageHash, setImageHash] = useState(0);

  useEffect(() => {
    setImageHash(Date.now());
  }, [props.dish])

  const { dish } = props;
  return (
    <div className="border rounded p-3 text-center">
      <h4>{dish.name}</h4>
      <div>
        <img src={`${dish.imageUrl}?${imageHash}`} alt={dish.name} className="w-75" />
      </div>
      <div>
        <span>Б: {dish.protein}, </span>
        <span>Ж: {dish.fat}, </span>
        <span>У: {dish.carbohydrates}</span>
      </div>
      <Button onClick={() => props.onCart?.(dish)} disabled={!props.onCart}>В корзину</Button>
    </div>
  );
};