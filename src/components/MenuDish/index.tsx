import React from 'react';
import { Button } from 'react-bootstrap';
import { IDish } from '../../api/dishes';
import { DishLikes } from './DishLikes';

interface IMenuDishProps {
  dish: IDish;
  canLike?: boolean;
  onCart?: (dish: IDish) => void;
  onLike?: (dish: IDish) => void;
  onDislike?: (dish: IDish) => void;
}

export const MenuDish: React.FC<IMenuDishProps> = (props) => {
  const { dish } = props;
  console.log(props.canLike);
  return (
    <div className="border rounded p-3 text-center">
      <h4>{dish.name}</h4>
      <div>
        <img src={dish.imageUrl} alt={dish.name} className="w-75" />
      </div>
      <div>
        <span>Б: {dish.protein}, </span>
        <span>Ж: {dish.fat}, </span>
        <span>У: {dish.carbohydrates}</span>
        <p className="my-0">Вес: {dish.weight}</p>
        <p className="my-0">Цена: {dish.price}</p>
      </div>
      <DishLikes
        likes={dish.likes}
        disabled={!props.canLike}
        onLike={() => props.onLike?.(dish)}
        onDislike={() => props.onDislike?.(dish)}
      />
      <Button onClick={() => props.onCart?.(dish)} disabled={!props.onCart}>В корзину</Button>
    </div>
  );
};
