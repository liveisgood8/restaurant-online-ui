import './styles.scss';

import React from 'react';
import cn from 'classnames';
import { LoadingSpinner } from '../LoadingSpinner';

interface IButtonProps {
  className?: string;
  text?: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'danger' | 'success';
  disableShadow?: boolean;
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  isLoading?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<IButtonProps> = (props) => {
  const { icon: Icon } = props;

  return (
    <button
      disabled={props.disabled || props.isLoading}
      type={props.type}
      className={cn('components__button', 'ro-font-light-base', {
        'ro-basic-shadow': !props.disableShadow,
        'components__button_primary': !props.variant || props.variant === 'primary',
        'components__button_danger': props.variant === 'danger',
        'components__button_success': props.variant === 'success',
      }, props.className)}
      onClick={props.onClick}
    >
      <div>
        {props.text}
        {!props.isLoading && Icon && (
          <span className={cn({ 'ml-2': Boolean(props.text) })}>
            <Icon />
          </span>
        )}
        {props.isLoading && (
          <LoadingSpinner style={{ width: '20px', height: '20px' }} />
        )}
        {props.children}
      </div>
    </button>
  );
};
