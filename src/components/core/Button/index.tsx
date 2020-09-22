import './styles.scss';

import React from 'react';
import cn from 'classnames';

interface IButtonProps {
  className?: string;
  text?: string;
  onClick?: () => void;
}

export const Button: React.FC<IButtonProps> = (props) => {
  return (
    <button
      className={cn('components__button', 'ro-bg-primary', 'ro-font-light-small', 'ro-basic-shadow', props.className)}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};
