import './styles.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Location } from 'history';
import { ICategory } from '../../api/categories';

interface IDishCategoryProps {
  category: ICategory;
  isSelected?: boolean;
}

export const DishCategory: React.FC<IDishCategoryProps> = ({ category, isSelected }) => {
  return (
    <Link
      className="text-decoration-none"
      to={(location: Location) => ({
        ...location,
        search: `?categoryId=${category.id}`,
      })}
    >
      <div className={cn('component__category', { 'component__category_selected': isSelected })}>
        <div className="category__image-container">
          <img src={category.imageUrl} className="w-100" alt={category.name} />
        </div>
        <p className="ro-font-regular-small mt-3 text-center">{category.name}</p>
      </div>
    </Link>
  );
};
