import './styles.scss';

import React from 'react';
import { IUser } from '../../api/auth';
import { RoutePath } from '../../routes/paths';
import { Link } from 'react-router-dom';
import { Bubble } from './Bubble';
import { bonusify } from '../../helpers/money';

interface IUserInfoProps {
  className?: string;
  userInfo: IUser;
}

export const UserInfoBubble: React.FC<IUserInfoProps> = ({ className, userInfo }) => {
  return (
    <Link to={RoutePath.PROFILE} className="text-decoration-none text-dark">
      <Bubble className={className}>
        <span className="ro-font-medium-base">{bonusify(userInfo.bonusesBalance)}</span>
        <span className="ml-2">{userInfo.name || 'Аноним'}</span>
      </Bubble>
    </Link>
  );
};
