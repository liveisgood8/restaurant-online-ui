import React from 'react';
import { DishEditBaseCard, IDishEditBaseCardProps } from './DishEditBaseCard';

type IDishAddCardProps = Omit<IDishEditBaseCardProps, 'dish' | 'onUpdate'>;

export const DishAddCard: React.FC<IDishAddCardProps> = (props) => {
  return (
    <DishEditBaseCard
      {...props}
    />
  );
};
