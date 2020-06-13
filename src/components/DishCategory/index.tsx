import './styles.css';

import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Location } from 'history';
import { ICategory } from '../../api/categories';

interface IDishCategoryProps {
  category: ICategory;
  isSelected?: boolean;
}

export const DishCategory: React.SFC<IDishCategoryProps> = ({ category, isSelected }) => {
  const DishComponent = (
    <div
      id="dish-category"
      className={classNames('border', 'rounded', 'embed-responsive', 'embed-responsive-1by1', { 'selected': isSelected })}
    >
      <div className="embed-responsive-item text-center">
        <p>{category.name}</p>
      </div>
    </div>
  );

  return (
    <React.Fragment>
      {category.id > 0 ? (
        <Link
          className="deco-none"
          to={(location: Location) => ({
            ...location,
            search: `?categoryId=${category.id}`,
          })}
        >
          {DishComponent}
        </Link>
      ) : (
        <React.Fragment>
          {DishComponent}
        </React.Fragment>
      )}
    </React.Fragment>
  )
};