import './styles.scss';

import React, { CSSProperties } from 'react';
import cn from 'classnames';
import MinusIcon from '../core/icons/MinusIcon';
import PlusIcon from '../core/icons/PlusIcon';

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
      <MinusIcon className={cn({ 'cursor-pointer': !disabled })} onClick={disabled ? undefined : onDecrease} />
      <span className="ml-2">{value}</span>
      <PlusIcon className={cn('ml-2', { 'cursor-pointer': !disabled })} onClick={disabled ? undefined : onIncrease} />
    </div>
  );
};
