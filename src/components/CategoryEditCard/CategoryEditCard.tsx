import React from 'react';
import { ICategory } from '../../api/categories';
import { CategoryEditBaseCard, ICategoryEditBaseCardProps } from './CategoryEditBaseCard';

interface ICategoryEditCardProps extends Omit<ICategoryEditBaseCardProps, 'onCreate'> {
  category: ICategory;
}

export const CategoryEditCard: React.FC<ICategoryEditCardProps> = (props) => {
  return (
    <CategoryEditBaseCard
      {...props}
    />
  );
};
