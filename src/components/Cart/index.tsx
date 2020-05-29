import React from 'react';
import { Container } from 'react-bootstrap';
import { IDish } from '../../types/menu';
import { CartDish } from '../CartDish';

interface ICartProps {
  dishes: IDish[];
}

export const Cart: React.SFC<ICartProps> = ({ dishes }) => {
  return (
    <Container>
      {dishes.map((e, i) => (
        <CartDish
          key={i}
          dish={e}
        />
      ))}
    </Container>
  );
};
