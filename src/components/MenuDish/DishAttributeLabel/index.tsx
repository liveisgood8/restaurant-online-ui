import './styles.scss';

import React from 'react';
import cn from 'classnames';

interface IDishAttributeLabelProps {
  className?: string;
  label: string;
}

export const DishAttributeLabel: React.FC<IDishAttributeLabelProps> = ({ className, label }) => {
  return (
    <div className={cn('dish__label mb-1', className)}>
      <span className="ro-font-light-small ro-word-wrap-disabled">{label}</span>
    </div>
  );
};
