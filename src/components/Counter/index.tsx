import './styles.scss';

import React, { CSSProperties } from 'react';
import cn from 'classnames';
import { Icons } from '../core/icons/icons';
import { Icon } from '../core/icons/Icon';

interface ICounterProps {
  className?: string;
  style?: CSSProperties
  value: number;
  disabled?: boolean;
  onIncrease?: () => void;
  onDecrease?: () => void;
}

export const Counter: React.FC<ICounterProps> = ({ className, style, value, disabled, onIncrease, onDecrease }) => {
  return (
    <div className={cn('d-flex align-items-center component__counter px-2', className)} style={style}>
      <Icon
        icon={Icons.MINUS}
        className={cn({ 'cursor-pointer': !disabled })}
        onClick={disabled ? undefined : onDecrease}
      />
      <span className="ml-2">{value}</span>
      <Icon
        icon={Icons.PLUS}
        className={cn('ml-2', { 'cursor-pointer': !disabled })}
        onClick={disabled ? undefined : onIncrease}
      />
    </div>
  );
};
