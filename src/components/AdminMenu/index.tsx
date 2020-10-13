import './styles.scss';

import React from 'react';
import cn from 'classnames';
import { IDish } from '../../api/dishes';
import { ICategory } from '../../api/categories';
import { Container, Row, Col } from 'react-bootstrap';
import { MenuDish } from '../MenuDish';
import { DishCategory } from '../DishCategory';
import { Button } from '../core/Button';
import PlusIcon from '../core/icons/PlusIcon';

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
      <Container fluid>
        <div className="d-flex p-2 component__categories-container">
          <div className="d-flex align-self-center align-items-center flex-column mr-4">
            <Button
              className="admin-menu__add-button ro-vector-fill-white"
              disableShadow
              rightIcon={PlusIcon}
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
        <Row className="justify-content-center mt-4">
          {props.selectedCategoryId && (
            <div className="d-flex align-self-center align-items-center flex-column">
              <Button
                className="admin-menu__add-button ro-vector-fill-white"
                disableShadow
                rightIcon={PlusIcon}
                onClick={props.onDishAdd}
              />
              <span className="d-block mt-2 ro-font-light-small text-center">Добавить<br />блюдо</span>
            </div>
          )}
          {props.dishes.map((e, i) => (
            <Col sm={12} md={4} lg={3} key={i}>
              <MenuDish
                dish={e}
                canLike={false}
                onClick={() => props.onDishPreview?.(e)}
                onEdit={() => props.onDishEdit?.(e)}
                onDelete={() => props.onDishDelete?.(e)}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </React.Fragment >
  );
};
