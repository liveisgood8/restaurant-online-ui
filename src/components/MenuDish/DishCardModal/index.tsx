import './styles.scss';

import React, { useState } from 'react';
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

  onCart: (count: number) => void;
  onHide: () => void;
}

export const DishCardModal: React.FC<IDishCardModalProps> = ({
  isVisible,
  dish,
  canLike,
  onLike,
  onDislike,
  onCart,
  onHide,
}) => {
  const [count, setCount] = useState(1);

  return (
    <Modal
      show={isVisible}
      centered
      onHide={onHide}
      dialogClassName="components__dish-card-modal"
    >
      <div className="px-4 py-2 py-md-4 p-md-5">
        <div className="d-flex flex-column flex-md-row align-items-center align-items-md-stretch">
          <div className="dish-card-modal__image-wrapper mt-2 d-flex flex-column align-items-center">
            <img src={dish.imageUrl} alt={dish.name} />
            <DishLikes
              className="mt-3"
              likes={dish.likes}
              disabled={!canLike}
              onLike={onLike}
              onDislike={onDislike}
            />
          </div>
          <div className="d-flex mt-4 mt-md-0 flex-column flex-grow-1 ml-md-4">
            <div className="mb-3 mb-md-0">
              <div>
                <span className="ro-font-regular-small">{dish.name}</span>
              </div>
              <div className="d-flex mt-2 flex-wrap">
                <DishAttributeLabel className="mr-1" label={`${dish.weight} г`}/>
                <DishAttributeLabel className="mr-1" label={`100 ккал`}/>
                {dish.protein && <DishAttributeLabel className="mr-1" label={`б. ${dish.protein}`}/>}
                {dish.fat && <DishAttributeLabel className="mr-1" label={`ж. ${dish.fat}`}/>}
                {dish.carbohydrates && <DishAttributeLabel label={`у. ${dish.carbohydrates}`}/>}
              </div>
              <div className="mt-2">
                <span className="ro-font-light-small">{dish.description}</span>
              </div>
            </div>
            <div className="mt-auto">
              <span className="ro-font-regular-small">{dish.price}₽</span>
            </div>
            <div className="mt-3 align-self-end d-flex align-items-center">
              <Counter
                style={{ height: '30px' }}
                value={count}
                onIncrease={(): void => setCount(count + 1)}
                onDecrease={(): void => {
                  if (count > 1) {
                    setCount(count - 1);
                  }
                }}
              />
              <Button
                className="ml-3"
                text="В корзину"
                onClick={(): void => onCart(count)}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
