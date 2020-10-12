import './styles.scss';

import React from 'react';
import cn from 'classnames';
import { Container, Col, Row } from 'react-bootstrap';
import { IDish } from '../../api/dishes';
import { ICategory } from '../../api/categories';
import { DishCategory } from '../DishCategory';
import { MenuDish } from '../MenuDish';

interface IMenuProps {
  dishes: IDish[];
  categories: ICategory[];
  selectedCategoryId?: number | null;
  canLikeDishes?: boolean;
  onDishClick: (dish: IDish) => void;
  onDishLike: (dish: IDish) => void;
  onDishDislike: (dish: IDish) => void;
}

export const Menu: React.FC<IMenuProps> = (props) => {
  return (
    <React.Fragment>
      <Container fluid>
        <div className="d-flex p-2 component__categories-container">
          {props.categories.map((e, i) => (
            <div key={i} className={cn({ 'ml-3': i !== 0 })}>
              <DishCategory
                category={e}
                isSelected={e.id === props.selectedCategoryId}
              />
            </div>
          ))}
        </div>
        <Row className="justify-content-center mt-3">
          {props.dishes.map((e, i) => (
            <Col key={i} className="d-flex justify-content-center mb-3" xs={12} sm={6} md={5} lg={4} xl={3}>
              <MenuDish
                dish={e}
                onClick={() => props.onDishClick?.(e)}
                canLike={props.canLikeDishes}
                onLike={() => props.onDishLike?.(e)}
                onDislike={() => props.onDishDislike?.(e)}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </React.Fragment >
  );
};
