import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Location } from 'history';
import { IDish, ICategory } from '../../types/menu';
import { MenuDish } from '../MenuDish';
import { DishCategory } from '../DishCategory';
import { Link } from 'react-router-dom';
import { AddDish, IDishInfoWithFile } from '../AddDish';

interface IMenuProps {
  dishes: IDish[];
  categories: ICategory[];
  selectedCategoryId?: number;
  isAdminModeEnabled?: boolean;
  onPutDishInCart: (dish: IDish) => void;
  onAddNewDish: (dish: IDishInfoWithFile) => void;
  onDeleteDish: (dish: IDish) => void;
  onEditDish: (dish: IDish) => void;
}

export const Menu: React.SFC<IMenuProps> = (props) => {
  const isCategorySelected = (category: ICategory) => {
    return category.id === props.selectedCategoryId;
  };

  const getAddDishElementIfAdminMode = () => {
    if (!props.isAdminModeEnabled) {
      return;
    }

    return (
      <Col sm={12} md={4} lg={3}>
        <AddDish
          onAdd={props.onAddNewDish}
        />
      </Col>
    );
  };

  return (
    <React.Fragment>
      <Container fluid>
        <Row className="justify-content-center">
          {props.categories.map((e, i) => (
            <Col key={i} sm={2} md={1}>
              <Link
                key={i}
                className="deco-none"
                to={(location: Location) => ({
                  ...location,
                  search: `?categoryId=${e.id}`,
                })}
              >
                <DishCategory
                  name={e.name}
                  isSelected={isCategorySelected(e)}
                />
              </Link>
            </Col>
          ))}
        </Row>
        <Row className="justify-content-center">
          {getAddDishElementIfAdminMode()}
          {props.dishes.map((e, i) => (
            <Col sm={12} md={4} lg={3} key={i}>
              <MenuDish
                isAdminModeEnabled={props.isAdminModeEnabled}
                dish={e}
                onCart={props.onPutDishInCart}
                onDelete={props.onDeleteDish}
                onEdit={props.onEditDish}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </React.Fragment >
  );
};