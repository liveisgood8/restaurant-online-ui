import './styles.scss';

import React from 'react';
import cn from 'classnames';
import { LoadingSpinner } from '../LoadingSpinner';

interface IButtonProps {
  className?: string;
  text?: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
  variant?: 'default' | 'primary' | 'danger' | 'success';
  disableShadow?: boolean;
  leftIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  rightIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  isLoading?: boolean;
  onClick?: () => void;
}

export const Button: React.FC<IButtonProps> = (props) => {
  const { leftIcon: LeftIcon, rightIcon: RightIcon } = props;

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
        {LeftIcon && (
          <LeftIcon className={cn('button__icon', { 'mr-2': Boolean(props.text) })} />
        )}
        <span>{props.text}</span>
        {!props.isLoading && RightIcon && (
          <RightIcon className={cn('button__icon', { 'ml-2': Boolean(props.text) })} />
        )}
        {props.isLoading && (
          <LoadingSpinner style={{ width: '20px', height: '20px' }} />
        )}
        {props.children}
      </div>
    </button>
  );
};
