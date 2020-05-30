import './styles.scss';

import React from 'react';
import classNames from 'classnames';

interface IDishCategoryProps {
  name: string;
  isSelected?: boolean;
}

export const DishCategory: React.SFC<IDishCategoryProps> = ({ name, isSelected }) => {
  return (
      <div
        id="dish-category"
        className={classNames('border', 'rounded', { 'selected': isSelected })}
      >
        <p>{name}</p>
      </div>
  )
};