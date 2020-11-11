import './styles.scss';

import React from 'react';
import cn from 'classnames';

interface IPlateProps {
  className?: string;
}

export const Plate: React.FC<IPlateProps> = (props) => {
  return (
    <div className={cn('plate', props.className)}>
      {props.children}
    </div>
  );
};
