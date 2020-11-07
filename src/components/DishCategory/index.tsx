import './styles.scss';
import FallbackCategoryImage from '../../images/category-image-fallback.svg';

import React from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import { Location } from 'history';
import { ICategory } from '../../api/categories';
import { Button } from '../core/Button';
import { ImageContainer } from '../core/ImageContainer';
import { Icons } from '../core/icons/icons';

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
          pathname: location.pathname,
          search: `?categoryId=${category.id}`,
        })}
      >
        <div className="category__image-container">
          <ImageContainer
            src={category.imageUrl}
            fallbackSrc={FallbackCategoryImage}
            className="w-100 h-100"
          />
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
              rightIcon={Icons.PENCIL}
            />
          )}
          {onDelete && (
            <Button
              onClick={onDelete}
              className="ro-vector-fill-white"
              variant="danger"
              disableShadow
              rightIcon={Icons.TRASH}
            />
          )}
        </div>
      )}
    </div>
  );
};
