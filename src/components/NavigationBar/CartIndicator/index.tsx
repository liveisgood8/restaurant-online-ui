import './styles.scss';
import { ReactComponent as CartIcon } from './cart.svg';

import React from 'react';
import { Link } from 'react-router-dom';
import { RoutePath } from '../../../routes/paths';
import { Bubble } from '../Bubble';

export interface ICartIndicatorProps {
  cartDishesNumber: number;
}

export const CartIndicator: React.FC<ICartIndicatorProps> = ({ cartDishesNumber }) => {
  return (
    <Link to={RoutePath.CART} className="text-dark text-decoration-none">
      <Bubble>
        <CartIcon width="22" height="22" />
        <span className="ro-font-thin-small ml-2">{cartDishesNumber}</span>
      </Bubble>
    </Link>
  );
};
