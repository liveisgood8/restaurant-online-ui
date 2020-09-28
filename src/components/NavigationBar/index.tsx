import './styles.scss';

import React from 'react';
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
    <nav className="d-flex flex-column flex-md-row align-items-center my-3">
      <Link to={RoutePath.HOME} className="text-dark text-decoration-none mb-2 mb-md-0">
        <span className="ro-font-medium-big">Ресторан</span>
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
    </nav>
  );
};
