import './styles.scss';

import React from 'react';
import { ICartIndicatorProps, CartIndicatorBubble } from './CartIndicatorBubble';
import { RoutePath } from '../../routes/paths';
import { Link } from 'react-router-dom';
import { IUser } from '../../api/auth';
import { UserInfoBubble } from './UserInfoBubble';
import { Bubble } from './Bubble';
import { isUserAdmin } from '../../app/auth/utils';
import { AdminPanelBubble } from './AdminPanelBubble';
import { Logo } from '../Logo';

interface INavigationBarProps {
  cart: ICartIndicatorProps;
  userInfo?: IUser | null;
}

export const NavigationBar: React.FC<INavigationBarProps> = ({ cart, userInfo }) => {
  return (
    <nav className="d-flex flex-column flex-md-row align-items-center my-3">
      <Link to={RoutePath.HOME} className="text-decoration-none mb-2 mb-md-0 align-self-md-stretch">
        <Logo className="h-100" />
      </Link>
      <div className="ml-md-auto d-flex">
        {userInfo && isUserAdmin(userInfo) && (
          <AdminPanelBubble
            className="mr-2 mr-sm-4"
          />
        )}
        {userInfo ? (
          <UserInfoBubble
            userInfo={userInfo}
            className="mr-2 mr-sm-4"
          />
        ) : (
          <Link to={RoutePath.LOGIN} className="text-decoration-none text-dark">
            <Bubble className="mr-2 mr-sm-4">
              Войти
            </Bubble>
          </Link>
        )}
        <CartIndicatorBubble
          {...cart}
        />
      </div>
    </nav>
  );
};
