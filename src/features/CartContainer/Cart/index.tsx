import React from 'react';
import { Link } from 'react-router-dom';
import { IDish } from '../../../api/dishes';
import { Button } from '../../../components/core/Button';
import { RoutePath } from '../../../routes/paths';
import { CartDish } from '../CartDish';
import { ICartDish } from '../types';

interface ICartProps {
  dishes: ICartDish[];
  onIncreaseDishCount: (dish: IDish) => void;
  onDecreaseDishCount: (dish: IDish) => void;
  onRemoveDish: (dish: IDish) => void;
  onCleanCart: () => void;
}

export const Cart: React.FC<ICartProps> = ({
  dishes,
  onIncreaseDishCount,
  onDecreaseDishCount,
  onRemoveDish,
}) => {
  const calculateTotalPrice = (): number => {
    let price = 0;
    dishes.forEach((d) => {
      price += d.dish.price * d.count;
    });
    return price;
  };

  const calculateBonuses = (): number => {
    return calculateTotalPrice() * 0.05;
  };

  return (
    <div className="d-flex flex-column">
      <div className="mb-3">
        {dishes.map((e, i) => (
          <CartDish
            key={i}
            dish={e.dish}
            count={e.count}
            onIncrease={(): void => onIncreaseDishCount(e.dish)}
            onDecrease={(): void => onDecreaseDishCount(e.dish)}
            onRemove={(): void => onRemoveDish(e.dish)}
          />
        ))}
      </div>
      <div className="ml-auto text-end">
        <div className="mb-3">
          <span className="ro-font-light-base">Бонусы за заказ:</span>
          <span className="ro-font-medium-base ml-2">{calculateBonuses()}₽</span>
        </div>
        <div className="mb-3">
          <span className="ro-font-light-base">Стоимость заказа:</span>
          <span className="ro-font-medium-base ml-2">{calculateTotalPrice()}₽</span>
        </div>
      </div>
      <Link
        className="align-self-center text-decoration-none"
        to={RoutePath.ORDER_CONFIRMATION}
      >
        <Button
          text="Перейти к оформлению заказа"
        />
      </Link>
    </div>
  );
};
