import React, { useEffect, useState } from 'react';
import cn from 'classnames';

interface ITextAreaProps {
  className?: string;
  required?: boolean;
  wrapperClassName?: string;
  label?: string;
  placeholder?: string;
  value?: string | null;
  onChange?: (value: string) => void;
}

export const TextArea: React.FC<ITextAreaProps> = (props) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(props.value || '');
  }, [props.value]);

  const onTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.currentTarget.value;
    setValue(newValue);
    props.onChange?.(newValue);
  };

  return (
    <div className={props.wrapperClassName}>
      {props.label && (
        <span className="ro-font-light-small">{props.label}</span>
      )}
      <textarea
        required
        className={cn(props.className, 'components__input-holder components__input-holder_textarea ro-font-light-small')}
        placeholder={props.placeholder}
        value={value}
        onChange={onTextAreaChange}
      />
    </div>
  );
};
