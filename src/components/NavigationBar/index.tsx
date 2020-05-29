import './styles.scss';
import logo from './logo.svg';

import React from 'react';
import { Navbar } from 'react-bootstrap';
import { ICartIndicatorProps, CartIndicator } from '../CartIndicator';
import { RoutePath } from '../../Routes';
import { Link } from 'react-router-dom';

interface INavigationBarProps {
  cart: ICartIndicatorProps;
}

export const NavigationBar: React.SFC<INavigationBarProps> = ({ cart }) => {
  return (
    <Navbar bg="primary" variant="dark">
      <Link to={RoutePath.HOME} className="deco-none">
        <img id="logo" src={logo} alt="logo" />
      </Link>
      <CartIndicator
        className="ml-auto text-white"
        {...cart}
      />
    </Navbar>
  );
};
