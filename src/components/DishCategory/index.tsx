import './styles.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Location } from 'history';
import { ICategory } from '../../api/categories';
import { Button } from '../core/Button';
import EditIcon from '../core/icons/EditIcon';
import TrashIcon from '../core/icons/TrashIcon';

interface IDishCategoryProps {
  category: ICategory;
  isSelected?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const DishCategory: React.FC<IDishCategoryProps> = ({ category, isSelected, onEdit, onDelete }) => {
  return (
    <div className={cn('component__category', { 'component__category_selected': isSelected })}>
      <Link
        className="text-decoration-none text-color-inherit"
        to={(location: Location) => ({
          ...location,
          search: `?categoryId=${category.id}`,
        })}
      >
        <div className="category__image-container">
          <img src={category.imageUrl} className="w-100" alt={category.name} />
        </div>
        <div className="d-flex mt-2 mx-2 align-items-center text-center pb-2">
          <span className="ro-font-regular-small category__label">{category.name}</span>
        </div>
      </Link>
      {(onEdit || onDelete) && (
        <div className="d-flex justify-content-around">
          {onEdit && (
            <Button
              onClick={onEdit}
              className="ro-vector-fill-white"
              variant="success"
              disableShadow
              rightIcon={EditIcon}
            />
          )}
          {onDelete && (
            <Button
              onClick={onDelete}
              className="ro-vector-fill-white"
              variant="danger"
              disableShadow
              rightIcon={TrashIcon}
            />
          )}
        </div>
      )}
    </div>
  );
};
