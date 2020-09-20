import './styles.scss';

import React from 'react';
import cn from 'classnames';

interface IBubbleProps {
  className?: string;
}

export const Bubble: React.FC<IBubbleProps> = ({ className, children }) => {
  return (
    <div className={cn('components__navbar-bubble ro-bg-base-element ro-basic-shadow-hover d-flex align-items-center',
      className)}
    >
      {children}
    </div>
  );
};
