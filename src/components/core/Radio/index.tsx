import React from 'react';

interface IRadioProps {
  id: string | number;
  label?: string;
}

export const Radio: React.FC<IRadioProps> = (props) => {
  return (
    <div className="d-flex align-items-center">
      <input id={props.id.toString()} type="radio" />
      <label className="ml-2 mb-0 ro-font-light-small">{props.label}</label>
    </div>
  );
};
