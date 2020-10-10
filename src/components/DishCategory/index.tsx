import './styles.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Location } from 'history';
import { ICategory } from '../../api/categories';
import { Button } from '../core/Button';
import { EditIcon } from '../core/icons/EditIcon';

interface IDishCategoryProps {
  category: ICategory;
  isSelected?: boolean;
  showEditIcon?: boolean;
  onEdit?: () => void;
}

export const DishCategory: React.FC<IDishCategoryProps> = ({ category, isSelected, showEditIcon, onEdit }) => {
  return (
    <Link
      className="text-decoration-none"
      to={(location: Location) => ({
        ...location,
        search: `?categoryId=${category.id}`,
      })}
    >
      <div className={cn('component__category', { 'component__category_selected': isSelected })}>
        {showEditIcon && (
          <Button
            onClick={onEdit}
            className="category__edit-button ro-vector-fill-white"
            variant="success"
            disableShadow
            rightIcon={EditIcon}
          />
        )}
        <div className="category__image-container">
          <img src={category.imageUrl} className="w-100" alt={category.name} />
        </div>
        <div className="d-flex mt-2 mx-2 align-items-center text-center">
          <span className="ro-font-regular-small category__label">{category.name}</span>
        </div>
      </div>
    </Link>
  );
};
