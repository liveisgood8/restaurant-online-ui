import './styles.scss';

import React from 'react';
import { Modal } from 'react-bootstrap';
import { IDish } from '../../../api/dishes';
import { DishAttributeLabel } from '../DishAttributeLabel';
import { DishLikes } from '../DishLikes';
import { Button } from '../../core/Button';
import { Counter } from '../../Counter';

interface IDishCardModalProps {
  isVisible: boolean;
  dish: IDish;

  canLike?: boolean;
  onLike?: () => void;
  onDislike?: () => void;

  onHide: () => void;
}

export const DishCardModal: React.FC<IDishCardModalProps> = ({
  isVisible,
  dish,
  canLike,
  onLike,
  onDislike,
  onHide,
}) => {
  return (
    <Modal
      show={isVisible}
      centered
      onHide={onHide}
      dialogClassName="components__dish-card-modal"
    >
      <div className="px-4 py-5">
        <div className="d-flex">
          <div className="dish-card-modal__image-wrapper mt-2 d-flex flex-column align-items-center">
            <img className="w-100" src={dish.imageUrl} alt={dish.name} />
            <DishLikes
              className="mt-3"
              likes={dish.likes}
              disabled={!canLike}
              onLike={onLike}
              onDislike={onDislike}
            />
          </div>
          <div className="d-flex flex-column flex-grow-1 ml-4">
            <div>
              <span className="ro-font-regular-small">{dish.name}</span>
            </div>
            <div className="d-flex mt-2">
              <DishAttributeLabel label={`${dish.weight} г`}/>
              <DishAttributeLabel className="ml-1" label={`100 ккал`}/>
              {dish.protein && <DishAttributeLabel className="ml-1" label={`б. ${dish.protein}`}/>}
              {dish.fat && <DishAttributeLabel className="ml-1" label={`ж. ${dish.fat}`}/>}
              {dish.carbohydrates && <DishAttributeLabel className="ml-1" label={`у. ${dish.carbohydrates}`}/>}
            </div>
            <div className="mt-2">
              <span className="ro-font-light-very-small">Description</span>
            </div>
            <div className="mt-auto">
              <span className="ro-font-regular-small">{dish.price}₽</span>
            </div>
            <div className="mt-3 align-self-end d-flex align-items-center">
              <Counter style={{ height: '30px' }} value={1} />
              <Button
                className="ml-3"
                text="В корзину"
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
