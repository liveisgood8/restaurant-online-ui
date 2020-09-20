import './style.scss';
import { ReactComponent as AlertTriangle } from './alert-triangle.svg';
import { ReactComponent as AlertCircle } from './alert-circle.svg';

import React, { Fragment } from 'react';
import cn from 'classnames';

interface ITextInputProps {
  showWarning?: boolean;
  showError?: boolean;
  warningText?: string;
  errorText?: string;
}

export const TextInput: React.FC<ITextInputProps> = (props) => {
  return (
    <div className={cn('components__input-holder', {
      'ro-border-warning': props.showWarning,
      'ro-border-error': props.showError,
    })}>
      <input type="text" className="ro-font-light-small" />
      <div className="d-flex mr-3 align-self-center align-items-center">
        {props.showWarning && (
          <Fragment>
            <AlertTriangle
              className="ro-vector-fill-warning"
            />
            {props.warningText && (
              <span className="ml-2 ro-text-warning ro-text-small">{props.warningText}</span>
            )}
          </Fragment>
        )}
        {props.showError && (
          <Fragment>
            <AlertCircle
              className="ro-vector-fill-error"
            />
            {props.errorText && (
              <span className="ml-2 ro-text-error ro-text-small">{props.errorText}</span>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};
