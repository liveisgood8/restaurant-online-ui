import './styles.scss';
import { ReactComponent as MinusIcon } from './minus.svg';
import { ReactComponent as PlusIcon } from './plus.svg';

import React, { CSSProperties } from 'react';
import cn from 'classnames';

interface ICounterProps {
  className?: string;
  style?: CSSProperties
  value: number;
  onIncrease?: () => void;
  onDecrease?: () => void;
}

export const Counter: React.FC<ICounterProps> = ({ className, style, value, onIncrease, onDecrease }) => {
  return (
    <div className={cn('d-flex align-items-center component__counter px-2', className)} style={style}>
      <MinusIcon className="cursor-pointer" onClick={onDecrease} />
      <span className="ml-2">{value}</span>
      <PlusIcon className="cursor-pointer ml-2" onClick={onIncrease} />
    </div>
  );
};
