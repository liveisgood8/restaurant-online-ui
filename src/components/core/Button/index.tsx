import './styles.scss';

import React from 'react';
import cn from 'classnames';
import { LoadingSpinner } from '../LoadingSpinner';
import { Icons } from '../icons/icons';
import { Icon } from '../icons/Icon';

interface IButtonProps {
  className?: string;
  text?: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
  variant?: 'default' | 'primary' | 'danger' | 'success';
  disableShadow?: boolean;
  leftIcon?: Icons;
  rightIcon?: Icons;
  isLoading?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<IButtonProps> = (props) => {
  const { leftIcon, rightIcon } = props;

  return (
    <button
      disabled={props.disabled || props.isLoading}
      type={props.type}
      className={cn('components__button', 'ro-font-light-base', {
        'ro-basic-shadow': !props.disableShadow,
        'components__button_primary': !props.variant || props.variant === 'primary',
        'components__button_default': props.variant === 'default',
        'components__button_danger': props.variant === 'danger',
        'components__button_success': props.variant === 'success',
      }, props.className)}
      onClick={props.onClick}
    >
      <div className="d-flex align-items-center justify-content-center">
        {(!props.isLoading && leftIcon != null && rightIcon == null) && (
          <Icon icon={leftIcon} className={cn('button__icon', { 'mr-2': Boolean(props.text) })} />
        )}
        {props.text && (
          <span>{props.text}</span>
        )}
        {(!props.isLoading && rightIcon != null) && (
          <Icon icon={rightIcon} className={cn('button__icon', { 'ml-2': Boolean(props.text) })} />
        )}
        {props.isLoading && (
          <LoadingSpinner
            className={cn({ 'ml-2': Boolean(props.text) })}
            style={{ width: '20px', height: '20px' }}
          />
        )}
      </div>
    </button>
  );
};
