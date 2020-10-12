import React from 'react';
import { IDish } from '../../api/dishes';
import { DishEditBaseCard, IDishEditBaseCardProps } from './DishEditBaseCard';

interface IDishEditCardProps extends Omit<IDishEditBaseCardProps, 'onCreate'> {
  dish: IDish;
}

export const DishEditCard: React.FC<IDishEditCardProps> = (props) => {
  return (
    <DishEditBaseCard
      {...props}
    />
  );
};
