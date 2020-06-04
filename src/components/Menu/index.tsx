import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Location } from 'history';
import { MenuDish } from '../MenuDish';
import { DishCategory } from '../DishCategory';
import { Link } from 'react-router-dom';
import { DishEditor } from '../DishEditor';
import { CategoryEditor } from '../CategoryEditor';
import { IDish, INewDishWithFile } from '../../api/dishes';
import { ICategory, INewCategoryWithFile } from '../../api/categories';

interface IMenuProps {
  dishes: IDish[];
  categories: ICategory[];
  selectedCategoryId?: number;
  isAdminModeEnabled?: boolean;
  onPutDishInCart: (dish: IDish) => void;
  onAddNewDish: (dish: Omit<INewDishWithFile, 'category'>) => void;
  onDeleteDish: (dish: IDish) => void;
  onChangeDish: (dish: IDish) => void;
  onAddNewCategory: (category: INewCategoryWithFile) => void;
}

export const Menu: React.SFC<IMenuProps> = (props) => {
  const isCategorySelected = (category: ICategory) => {
    return category.id === props.selectedCategoryId;
  };

  const getCategoryEditorIfAdminMode = () => {
    if (!props.isAdminModeEnabled) {
      return;
    }

    return (
      <Col sm={12} md={4} lg={3}>
        <CategoryEditor
          onAdd={props.onAddNewCategory}
        />
      </Col>
    );
  };

  const getDishEditorElementIfAdminMode = () => {
    if (!props.isAdminModeEnabled) {
      return;
    }

    return (
      <Col sm={12} md={4} lg={3}>
        <DishEditor
          onSubmit={props.onAddNewDish}
        />
      </Col>
    );
  };

  return (
    <React.Fragment>
      <Container fluid>
        <Row className="justify-content-center">
          {getCategoryEditorIfAdminMode()}
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
          {getDishEditorElementIfAdminMode()}
          {props.dishes.map((e, i) => (
            <Col sm={12} md={4} lg={3} key={i}>
              <MenuDish
                isAdminModeEnabled={props.isAdminModeEnabled}
                dish={e}
                onCart={props.onPutDishInCart}
                onDelete={props.onDeleteDish}
                onChange={props.onChangeDish}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </React.Fragment >
  );
};