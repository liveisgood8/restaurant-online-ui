import React from 'react';
import { TextInput } from '../TextInput';

interface INumberInputProps {
  value?: string;
  className?: string;
  showWarning?: boolean;
  showError?: boolean;
  warningText?: string;
  errorText?: string;
  required?: boolean;
  placeholder?: string;
  onChange?: (value: number) => void;
}

export const NumberInput: React.FC<INumberInputProps> = (props) => {
  return (
    <TextInput
      {...props}
      inputFilter={(value: string) => /^\d*$/.test(value)}
      onChange={(value: string) => props.onChange?.(+value)}
    />
  );
};
