import React from 'react';

interface IColorDotProps {
  color: string;
}

export const ColorDot: React.FC<IColorDotProps> = (props) => {
  return (
    <div style={{ backgroundColor: props.color }} className="color-dot" />
  );
};
