import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { IDish } from '../../../api/dishes';
import { CartDish } from '../CartDish';
import { ICartDish } from '../types';

interface ICartProps {
  dishes: ICartDish[];
  onIncreaseDishCount: (dish: IDish) => void;
  onDecreaseDishCount: (dish: IDish) => void;
  onCleanCart: () => void;
  onMakeOrder: () => void;
}

export const Cart: React.FC<ICartProps> = ({
  dishes,
  onCleanCart,
  onMakeOrder,
  onIncreaseDishCount,
  onDecreaseDishCount,
}) => {
  return (
    <Container>
      {dishes.map((e, i) => (
        <CartDish
          key={i}
          dish={e.dish}
          count={e.count}
          onIncrease={(): void => onIncreaseDishCount(e.dish)}
          onDecrease={(): void => onDecreaseDishCount(e.dish)}
        />
      ))}
      <Button variant="danger" onClick={onCleanCart}>Очистить корзину</Button>
      <Button variant="success" onClick={onMakeOrder}>Сделать заказ</Button>
    </Container>
  );
};
