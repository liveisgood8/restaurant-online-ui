import React from 'react';
import { TextInput } from '../TextInput';

interface INumberInputProps {
  value?: number | null;
  className?: string;
  label?: string;
  showWarning?: boolean;
  showError?: boolean;
  warningText?: string;
  errorText?: string;
  required?: boolean;
  placeholder?: string;
  onChange?: (value: number | undefined) => void;
}

export const NumberInput: React.FC<INumberInputProps> = (props) => {
  return (
    <TextInput
      {...props}
      value={props.value?.toString()}
      inputFilter={(value: string) => /^\d*$/.test(value)}
      onChange={(value: string) => props.onChange?.(value.length ? +value : undefined)}
    />
  );
};
