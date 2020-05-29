import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { IDish } from '../../types/menu';
import { MenuDish } from '../MenuDish';

interface IMenuProps {
  dishes: IDish[];
  onCart: (dish: IDish) => void;
}

export const Menu: React.SFC<IMenuProps> = ({ dishes, onCart }) => {
  return (
    <React.Fragment>
      <Container fluid>
        <Row className="justify-content-center">
          {dishes.map((e, i) => (
            <Col sm={12} md={4} lg={3} key={i}>
              <MenuDish
                dish={e}
                onCart={onCart}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </React.Fragment>
  );
};