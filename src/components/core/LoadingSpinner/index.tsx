import React, { CSSProperties } from 'react';
import { Spinner } from 'react-bootstrap';

interface ILoadingSpinnerProps {
  className?: string;
  style?: CSSProperties;
}

export const LoadingSpinner: React.FC<ILoadingSpinnerProps> = (props) => {
  return (
    <Spinner animation="border" {...props} />
  );
};
