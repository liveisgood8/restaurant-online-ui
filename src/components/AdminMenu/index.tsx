import React from 'react';
import { IDish, INewDish } from '../../api/dishes';
import { ICategory, INewCategory } from '../../api/categories';
import { Container, Row, Col } from 'react-bootstrap';
import { CategoryEditor } from '../editors/CategoryEditor';
import { DishEditor } from '../editors/DishEditor';

interface IAdminMenuProps {
  dishes: IDish[];
  categories: ICategory[];
  selectedCategoryId?: number;
  onAddNewDish: (dish: Omit<INewDish, 'category'>, image?: File) => void;
  onDeleteDish: (dish: IDish) => void;
  onChangeDish: (dish: IDish, image?: File) => void;
  onAddNewCategory: (category: INewCategory, image?: File) => void;
  onDeleteCategory: (category: ICategory) => void;
  onChangeCategory: (category: ICategory, image?: File) => void;
}

export const AdminMenu: React.SFC<IAdminMenuProps> = (props) => {
  return (
    <React.Fragment>
      <Container fluid>
        <Row className="align-items-center mb-3">
          <Col xs={6} md={2}>
            <CategoryEditor onAdd={props.onAddNewCategory} />
          </Col>
          {props.categories.map((e, i) => (
            <Col key={i} xs={6} md={2}>
              <CategoryEditor
                category={e}
                isSelected={e.id === props.selectedCategoryId}
                onAdd={props.onAddNewCategory}
                onChange={props.onChangeCategory}
                onDelete={props.onDeleteCategory}
              />
            </Col>
          ))}
        </Row>
        <Row className="justify-content-center align-items-center">
          <Col sm={12} md={4} lg={3}>
            <DishEditor onAdd={props.onAddNewDish} />
          </Col>
          {props.dishes.map((e, i) => (
            <Col sm={12} md={4} lg={3} key={i}>
              <DishEditor
                dish={e}
                onDelete={props.onDeleteDish}
                onChange={props.onChangeDish}
                onAdd={props.onAddNewDish}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </React.Fragment >
  );
};