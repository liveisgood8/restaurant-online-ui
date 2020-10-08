import { ReactComponent as CheckMarkIcon } from './check-mark.svg';

import React, { useEffect, useState } from 'react';
import { Button } from '../Button';
import { TextInput } from '../TextInput';

interface ISingleTextFieldEditorProps {
  value?: string;
  isLoading?: boolean;
  onSubmit: (text: string) => void;
}

export const SingleTextFieldEditor: React.FC<ISingleTextFieldEditorProps> = ({
  value: propValue,
  onSubmit,
  isLoading,
}) => {
  const [value, setValue] = useState('');
  const [isChanged, setChanged] = useState(false);

  useEffect(() => {
    setValue(propValue || '');
    setChanged(false);
  }, [propValue]);

  return (
    <div className="d-flex p-1">
      <TextInput
        value={value}
        onChange={(value: string) => {
          setValue(value);
          if (!isChanged) {
            setChanged(true);
          }
        }}
      />
      <Button
        className="ml-2 ro-vector-fill-white"
        variant="success"
        isLoading={isLoading}
        disabled={!isChanged}
        rightIcon={CheckMarkIcon}
        onClick={() => onSubmit(value)}
      />
    </div>
  );
};
