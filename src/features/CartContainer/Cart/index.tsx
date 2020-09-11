import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { CartDish } from '../CartDish';
import { ICartDish } from '../types';

interface ICartProps {
  dishes: ICartDish[];
  onCleanCart: () => void;
  onMakeOrder: () => void;
}

export const Cart: React.SFC<ICartProps> = ({ dishes, onCleanCart, onMakeOrder }) => {
  return (
    <Container>
      {dishes.map((e, i) => (
        <CartDish
          key={i}
          dish={e.dish}
          count={e.count}
        />
      ))}
      <Button variant="danger" onClick={onCleanCart}>Очистить корзину</Button>
      <Button variant="success" onClick={onMakeOrder}>Сделать заказ</Button>
    </Container>
  );
};
