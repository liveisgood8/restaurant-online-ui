import '../styles.scss';

import React from 'react';
import { IUserMinimalInfo } from '../../../api/auth';
import { RoutePath } from '../../../routes/paths';
import { Link } from 'react-router-dom';
import { Bubble } from '../Bubble';

interface IUserInfoProps {
  className?: string;
  userInfo: IUserMinimalInfo;
}

export const UserInfo: React.FC<IUserInfoProps> = ({ className, userInfo }) => {
  return (
    <Link to={RoutePath.PROFILE} className="text-decoration-none text-dark">
      <Bubble className={className}>
        <span className="ro-font-medium-base">{userInfo.bonuses}₽</span>
        <span className="ml-2">{userInfo.name || 'Аноним'}</span>
      </Bubble>
    </Link>
  );
};
