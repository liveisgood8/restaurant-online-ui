import './style.scss';
import { ReactComponent as AlertTriangle } from './alert-triangle.svg';
import { ReactComponent as AlertCircle } from './alert-circle.svg';

import React, { Fragment, useEffect, useState } from 'react';
import cn from 'classnames';

interface ITextInputProps {
  value?: string | null;
  className?: string;
  showWarning?: boolean;
  showError?: boolean;
  warningText?: string;
  errorText?: string;
  required?: boolean;
  placeholder?: string;
  label?: string;
  type?: 'password' | 'email';
  onChange?: (value: string) => void;
  inputFilter?: (value: string) => boolean;
}

export const TextInput: React.FC<ITextInputProps> = (props) => {
  const [value, setValue] = useState(props.value || '');

  useEffect(() => {
    setValue(props.value || '');
  }, [props.value]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = e.currentTarget.value;
    if (props.inputFilter) {
      const isInputValid = props.inputFilter(newValue);
      if (isInputValid) {
        setValue(newValue);
      } else {
        return;
      }
    } else {
      setValue(newValue);
    }
    props.onChange?.(newValue);
  };

  return (
    <div className={props.className}>
      {props.label && (
        <span className="ro-font-light-small">{props.label}</span>
      )}
      <div className={cn('components__input-holder', {
        'ro-border-warning': props.showWarning,
        'ro-border-error': props.showError,
      })}>
        <input
          type={props.type || 'text'}
          className="ro-font-light-small"
          required={props.required}
          placeholder={props.placeholder}
          value={value}
          onChange={onChange}
        />
        {(props.showError || props.showWarning) && (
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
        )}
      </div>
    </div>
  );
};
