import './styles.scss';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RoutePath } from '../../routes/paths';

export interface ICartIndicatorProps {
  cartDishesNumber: number;
}

type IFinalCartIndicatorProps = ICartIndicatorProps &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const CartIndicator: React.SFC<IFinalCartIndicatorProps> = ({ cartDishesNumber, className }) => {
  return (
    <div className={className + ' d-flex align-items-center'}>
      <Link to={RoutePath.CART} className="text-white deco-none">
        <FontAwesomeIcon id="cart-icon" icon={faShoppingCart} className="mr-2" />
      </Link>
      <div>
        <Badge id="cart-badge" variant="light">{cartDishesNumber}</Badge>
      </div>
    </div>
  );
};