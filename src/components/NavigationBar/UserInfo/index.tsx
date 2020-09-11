import '../styles.scss';

import React from 'react';
import cn from 'classnames';
import { IUserMinimalInfo } from '../../../api/auth';
import { Button } from 'react-bootstrap';

interface IUserInfoProps {
  className?: string;
  userInfo: IUserMinimalInfo;
}

export const UserInfo: React.SFC<IUserInfoProps> = ({ className, userInfo }) => {
  return (
    <Button className={cn(className, 'navbar__outline-element')} variant="outline-light">
      <span>{userInfo.name || 'Аноним'}</span>
    </Button>
  )
};