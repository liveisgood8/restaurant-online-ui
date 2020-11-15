import './styles.scss';

import React, { Fragment } from 'react';
import cn from 'classnames';
import { Col, Row } from 'react-bootstrap';
import { IDish } from '../../api/dishes';
import { ICategory } from '../../api/categories';
import { DishCategory } from '../DishCategory';
import { MenuDish } from '../MenuDish';
import { Loading } from '../core/Loading';
import { DishCardModal } from '../DishCardModal';

interface IMenuProps {
  isDishesLoading?: boolean;
  dishes: IDish[];
  categories: ICategory[];
  selectedCategoryId?: number | null;
  selectedDishId?: number | null;
  canLikeDishes?: boolean;
  onDishCardHide?: () => void;
  onPutDishInCart?: (dish: IDish, count: number) => void;
  onDishClick: (dish: IDish) => void;
  onDishLike: (dish: IDish) => void;
  onDishDislike: (dish: IDish) => void;
}

export const Menu: React.FC<IMenuProps> = (props) => {
  const selectedDish = props.dishes.find((e) => e.id === props.selectedDishId);

  return (
    <React.Fragment>
      {selectedDish && (
        <DishCardModal
          dish={selectedDish}
          isVisible={true}
          onHide={props.onDishCardHide}
          onCart={(count) => props.onPutDishInCart?.(selectedDish, count)}
        />
      )}
      <div className="w-100">
        {props.categories.length > 0 && (
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
        )}
        <Row className="justify-content-center mt-3">
          {props.isDishesLoading ? (
            <Loading className="mt-5 w-100" />
          ) : (
            <Fragment>
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
            </Fragment>
          )}
        </Row>
      </div>
    </React.Fragment >
  );
};
