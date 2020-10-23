import './styles.scss';

import React from 'react';
import cn from 'classnames';
import { IDish } from '../../api/dishes';
import { ICategory } from '../../api/categories';
import { MenuDish } from '../MenuDish';
import { DishCategory } from '../DishCategory';
import { Button } from '../core/Button';
import { Icons } from '../core/icons/icons';

interface IAdminMenuProps {
  dishes: IDish[];
  categories: ICategory[];
  selectedCategoryId?: number | null;
  onDishPreview: (dish: IDish) => void;
  onDishAdd: () => void;
  onDishEdit: (dish: IDish) => void;
  onDishDelete: (dish: IDish) => void;
  onCategoryAdd: () => void;
  onCategoryEdit: (category: ICategory) => void;
  onCategoryDelete: (category: ICategory) => void;
}

export const AdminMenu: React.FC<IAdminMenuProps> = (props) => {
  return (
    <React.Fragment>
      <div className="d-flex py-2 component__categories-container">
        <div className="d-flex align-self-center align-items-center flex-column mx-3">
          <Button
            className="admin-menu__add-button ro-vector-fill-white"
            disableShadow
            rightIcon={Icons.PLUS}
            onClick={props.onCategoryAdd}
          />
          <span className="d-block mt-2 ro-font-light-small text-center">Добавить<br />категорию</span>
        </div>
        {props.categories.map((e, i) => (
          <div key={i} className={cn({ 'ml-4': i !== 0 })}>
            <DishCategory
              category={e}
              isSelected={e.id === props.selectedCategoryId}
              onEdit={() => props.onCategoryEdit?.(e)}
              onDelete={() => props.onCategoryDelete?.(e)}
            />
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center justify-content-md-start flex-wrap mt-4">
        {props.selectedCategoryId && (
          <div
            className="d-flex admin-menu__dish-add-button-wrapper align-items-center justify-content-center flex-column mx-3 mb-4"
          >
            <Button
              className="admin-menu__add-button ro-vector-fill-white"
              disableShadow
              rightIcon={Icons.PLUS}
              onClick={props.onDishAdd}
            />
            <span className="d-block mt-2 ro-font-light-small text-center">Добавить<br />блюдо</span>
          </div>
        )}
        {props.dishes.map((e, i) => (
          <div key={i} className="admin-menu__dish-card-wrapper mx-2 mb-4">
            <MenuDish
              dish={e}
              canLike={false}
              onClick={() => props.onDishPreview?.(e)}
              onEdit={() => props.onDishEdit?.(e)}
              onDelete={() => props.onDishDelete?.(e)}
            />
          </div>
        ))}
      </div>
    </React.Fragment >
  );
};
