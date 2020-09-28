import './styles.scss';

import React from 'react';
import cn from 'classnames';

interface IButtonProps {
  className?: string;
  text?: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'danger'
  disableShadow?: boolean;
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
}

export const Button: React.FC<IButtonProps> = (props) => {
  const { icon: Icon } = props;

  return (
    <button
      disabled={props.disabled}
      type={props.type}
      className={cn('components__button', 'ro-font-light-base', {
        'ro-basic-shadow': !props.disableShadow,
        'components__button_primary': !props.variant || props.variant === 'primary',
        'components__button_danger': props.variant === 'danger',
      }, props.className)}
      onClick={props.onClick}
    >
      <div>
        {props.text}
        {Icon && (
          <span className={cn({ 'ml-2': Boolean(props.text) })}>
            <Icon />
          </span>
        )}
      </div>
    </button>
  );
};
