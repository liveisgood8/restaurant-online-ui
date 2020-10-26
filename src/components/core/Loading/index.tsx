import './styles.scss';

import React, { CSSProperties } from 'react';
import cn from 'classnames';
import { Icon } from '../icons/Icon';
import { Icons } from '../icons/icons';

interface ILoadingProps {
  className?: string;
  style?: CSSProperties;
}

export const Loading: React.FC<ILoadingProps> = ({ className, style }) => {
  return (
    <div className={cn('d-flex flex-column align-items-center justify-content-center', className)} style={style}>
      <Icon className="d-block loading" icon={Icons.BURGER} />
      <span>Загрузка...</span>
    </div>
  );
};
