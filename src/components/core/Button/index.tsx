import './styles.scss';

import React from 'react';
import cn from 'classnames';

interface IButtonProps {
  className?: string;
  text?: string;
}

export const Button: React.FC<IButtonProps> = (props) => {
  return (
    <button className={cn('components__button', 'ro-bg-primary', 'ro-font-light-small', 'ro-basic-shadow', props.className)}>
      {props.text}
    </button>
  );
};
