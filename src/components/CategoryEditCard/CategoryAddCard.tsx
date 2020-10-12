import React from 'react';
import { CategoryEditBaseCard, ICategoryEditBaseCardProps } from './CategoryEditBaseCard';

type ICategoryAddCardProps = Omit<ICategoryEditBaseCardProps, 'category' | 'onUpdate'>;

export const CategoryAddCard: React.FC<ICategoryAddCardProps> = (props) => {
  return (
    <CategoryEditBaseCard
      {...props}
    />
  );
};
