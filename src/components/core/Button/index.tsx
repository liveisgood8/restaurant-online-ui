import './styles.scss';

import React from 'react';
import cn from 'classnames';

interface IButtonProps {
  className?: string;
  text?: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'danger'
  onClick?: () => void;
}

export const Button: React.FC<IButtonProps> = (props) => {
  return (
    <button
      disabled={props.disabled}
      type={props.type}
      className={cn('components__button', 'ro-basic-shadow', 'ro-font-light-base', {
        'components__button_primary': !props.variant || props.variant === 'primary',
        'components__button_danger': props.variant === 'danger',
      }, props.className)}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};
