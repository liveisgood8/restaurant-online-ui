import React from 'react';
import { IDish, IDishBase } from '../../api/dishes';
import { DishEditBaseCard, IDishEditBaseCard } from './DishEditBaseCard';

interface IDishEditCard extends IDishEditBaseCard {
  dish: IDish;
}

export const DishEditCard: React.FC<IDishEditCard> = (props) => {
  return (
    <DishEditBaseCard
      {...props}
    />
  );
};
