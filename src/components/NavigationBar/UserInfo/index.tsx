import '../styles.scss';

import React from 'react';
import cn from 'classnames';
import { IUserMinimalInfo } from '../../../api/auth';
import { Button } from 'react-bootstrap';
import { RoutePath } from '../../../routes/paths';
import { Link } from 'react-router-dom';

interface IUserInfoProps {
  className?: string;
  userInfo: IUserMinimalInfo;
}

export const UserInfo: React.SFC<IUserInfoProps> = ({ className, userInfo }) => {
  return (
    <Link to={RoutePath.PROFILE} className="text-decoration-none">
      <Button className={cn(className, 'navbar__outline-element')} variant="outline-light">
        <span className="font-weight-bold mr-2">{userInfo.bonuses}₽</span>
        <span>{userInfo.name || 'Аноним'}</span>
      </Button>
    </Link>
  )
};