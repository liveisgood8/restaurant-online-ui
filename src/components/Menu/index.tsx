import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { IDish } from '../../api/dishes';
import { ICategory } from '../../api/categories';
import { DishCategory } from '../DishCategory';
import { MenuDish } from '../MenuDish';

interface IMenuProps {
  dishes: IDish[];
  categories: ICategory[];
  selectedCategoryId?: number;
  canLikeDishes?: boolean;
  onPutDishInCart: (dish: IDish) => void;
  onDishLike: (dish: IDish) => void;
  onDishDislike: (dish: IDish) => void;
}

export const Menu: React.FC<IMenuProps> = (props) => {
  return (
    <React.Fragment>
      <Container fluid>
        <Row className="mb-3">
          {props.categories.map((e, i) => (
            <Col key={i} xs={6} md={2}>
              <DishCategory
                category={e}
                isSelected={e.id === props.selectedCategoryId}
              />
            </Col>
          ))}
        </Row>
        <Row className="justify-content-center">
          {props.dishes.map((e, i) => (
            <Col sm={12} md={4} lg={3} key={i}>
              <MenuDish
                dish={e}
                canLike={props.canLikeDishes}
                onCart={props.onPutDishInCart}
                onLike={props.onDishLike}
                onDislike={props.onDishDislike}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </React.Fragment >
  );
};
