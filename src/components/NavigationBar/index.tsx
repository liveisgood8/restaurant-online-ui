import './styles.scss';

import React from 'react';
import { Navbar } from 'react-bootstrap';
import { ICartIndicatorProps, CartIndicator } from './CartIndicator';
import { RoutePath } from '../../routes/paths';
import { Link } from 'react-router-dom';
import { IUserMinimalInfo } from '../../api/auth';
import { UserInfo } from './UserInfo';
import { Bubble } from './Bubble';

interface INavigationBarProps {
  cart: ICartIndicatorProps;
  userInfo?: IUserMinimalInfo | null;
}

export const NavigationBar: React.FC<INavigationBarProps> = ({ cart, userInfo }) => {
  return (
    <Navbar className="flex-column flex-md-row">
      <Link to={RoutePath.HOME} className="text-dark text-decoration-none mb-2 mb-md-0">
        <span className="ro-font-medium-middle">Ресторан</span>
      </Link>
      <div className="ml-md-auto d-flex">
        {userInfo ? (
          <UserInfo
            userInfo={userInfo}
            className="mr-4"
          />
        ) : (
          <Link to={RoutePath.LOGIN} className="text-decoration-none text-dark">
            <Bubble className="mr-4">
              Войти
            </Bubble>
          </Link>
        )}
        <CartIndicator
          {...cart}
        />
      </div>
    </Navbar>
  );
};
