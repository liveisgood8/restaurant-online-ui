import React from 'react';
import { IDish } from '../../api/dishes';
import { ICategory } from '../../api/categories';
import { Container, Row, Col } from 'react-bootstrap';
import { CategoryEditor } from '../editors/CategoryEditor';
import { MenuDish } from '../MenuDish';
import { DishCategory } from '../DishCategory';

interface IAdminMenuProps {
  dishes: IDish[];
  categories: ICategory[];
  selectedCategoryId?: number | null;
  onDishPreview: (dish: IDish) => void;
  onDishEdit: (dish: IDish) => void;
  onCategoryAdd: () => void;
  onCategoryEdit: (category: ICategory) => void;
}

export const AdminMenu: React.FC<IAdminMenuProps> = (props) => {
  return (
    <React.Fragment>
      <Container fluid>
        <Row className="align-items-center mb-3 mt-1">
          <Col xs={6} md={2}>
            <CategoryEditor onAdd={props.onCategoryAdd} />
          </Col>
          {props.categories.map((e, i) => (
            <Col key={i} xs={6} md={2}>
              <DishCategory
                category={e}
                isSelected={e.id === props.selectedCategoryId}
                showEditIcon
                onEdit={() => props.onCategoryEdit?.(e)}
              />
            </Col>
          ))}
        </Row>
        <Row className="justify-content-center align-items-center">
          {/* {props.selectedCategoryId && (
            <Col sm={12} md={4} lg={3}>
              <DishEditor onAdd={props.onAddNewDish} />
            </Col>
          )} */}
          {props.dishes.map((e, i) => (
            <Col sm={12} md={4} lg={3} key={i}>
              <MenuDish
                dish={e}
                canLike={false}
                showEditIcon
                onClick={() => props.onDishPreview?.(e)}
                onEdit={() => props.onDishEdit?.(e)}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </React.Fragment >
  );
};
