import './styles.scss';
import '../styles.scss';

import React from 'react';
import cn from 'classnames';
import { Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RoutePath } from '../../../routes/paths';

export interface ICartIndicatorProps {
  cartDishesNumber: number;
}

type IFinalCartIndicatorProps = ICartIndicatorProps &
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const CartIndicator: React.SFC<IFinalCartIndicatorProps> = ({ cartDishesNumber, className }) => {
  return (
    <div className={cn(className, 'd-inline-flex', 'align-items-center')}>
      <Link to={RoutePath.CART} className="text-white text-decoration-none">
        <Button className="navbar__outline-element" variant="outline-light">
          <span>Корзина</span>
          <Badge id="cart-badge" variant="light" className="ml-2">{cartDishesNumber}</Badge>
        </Button>
      </Link>

    </div>
  );
};