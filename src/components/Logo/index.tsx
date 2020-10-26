import './styles.scss';

import React from 'react';
import cn from 'classnames';
import { Icon } from '../core/icons/Icon';
import { Icons } from '../core/icons/icons';

interface ILogoProps {
  className?: string;
}

export const Logo: React.FC<ILogoProps> = ({ className }) => {
  return (
    <div className={cn('logo', 'd-flex', 'align-items-center', className)}>
      <Icon icon={Icons.LOGO} />
      <span className="logo__label ro-font-medium-base">EatMeNow</span>
    </div>
  );
};
