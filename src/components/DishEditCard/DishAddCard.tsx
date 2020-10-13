import React from 'react';
import { DishEditBaseCard, IDishEditBaseCardProps } from './DishEditBaseCard';

interface IDishAddCardProps extends Omit<IDishEditBaseCardProps, 'dish' | 'onUpdate'> {
  categoryId: number;
}

export const DishAddCard: React.FC<IDishAddCardProps> = (props) => {
  return (
    <DishEditBaseCard
      {...props}
    />
  );
};
