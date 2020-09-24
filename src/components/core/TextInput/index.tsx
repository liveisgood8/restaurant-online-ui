import './style.scss';
import { ReactComponent as AlertTriangle } from './alert-triangle.svg';
import { ReactComponent as AlertCircle } from './alert-circle.svg';

import React, { Fragment } from 'react';
import cn from 'classnames';

interface ITextInputProps {
  value?: string;
  className?: string;
  showWarning?: boolean;
  showError?: boolean;
  warningText?: string;
  errorText?: string;
  required?: boolean;
  placeholder?: string;
  type?: 'password' | 'email';
  onChange?: (value: string) => void;
}

export const TextInput: React.FC<ITextInputProps> = (props) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = e.currentTarget.value;
    props.onChange?.(newValue);
  };

  return (
    <div className={cn(props.className, 'components__input-holder', {
      'ro-border-warning': props.showWarning,
      'ro-border-error': props.showError,
    })}>
      <input
        type={props.type || 'text'}
        className="ro-font-light-small"
        required={props.required}
        placeholder={props.placeholder}
        value={props.value}
        onChange={onChange}
      />
      <div className="d-flex mr-3 align-self-center align-items-center">
        {props.showWarning && (
          <Fragment>
            <AlertTriangle
              className="ro-vector-fill-warning"
            />
            {props.warningText && (
              <span className="ro-word-wrap-disabled ml-2 ro-text-warning ro-text-small">{props.warningText}</span>
            )}
          </Fragment>
        )}
        {props.showError && (
          <Fragment>
            <AlertCircle
              className="ro-vector-fill-error"
            />
            {props.errorText && (
              <span className="ro-word-wrap-disabled ml-2 ro-text-error ro-text-small">{props.errorText}</span>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};
