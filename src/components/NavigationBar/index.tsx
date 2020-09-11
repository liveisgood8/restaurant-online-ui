import './styles.scss';
import logo from './logo.svg';

import React from 'react';
import { Navbar } from 'react-bootstrap';
import { ICartIndicatorProps, CartIndicator } from './CartIndicator';
import { RoutePath } from '../../routes/paths';
import { Link } from 'react-router-dom';
import { IUserMinimalInfo } from '../../api/auth';
import { UserInfo } from './UserInfo';

interface INavigationBarProps {
  cart: ICartIndicatorProps;
  userInfo?: IUserMinimalInfo
}

export const NavigationBar: React.SFC<INavigationBarProps> = ({ cart, userInfo }) => {
  return (
    <Navbar bg="primary" variant="dark">
      <Link to={RoutePath.HOME} className="deco-none">
        <img id="logo" src={logo} alt="logo" />
      </Link>
      <div className="ml-auto text-white">
        {userInfo && (
          <UserInfo
            className="d-inline"
            userInfo={userInfo} 
          />
        )}
        <CartIndicator
          className="ml-2"
          {...cart}
        />
      </div>
    </Navbar>
  );
};
