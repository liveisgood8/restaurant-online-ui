import './styles.scss';
import FallbackDishImage from '../../images/dish-image-fallback.png';

import React, { useState } from 'react';
import { IDish } from '../../api/dishes';
import { DishAttributeLabel } from '../MenuDish/DishAttributeLabel';
import { DishLikes } from '../MenuDish/DishLikes';
import { Button } from '../core/Button';
import { Counter } from '../Counter';
import { ImageContainer } from '../core/ImageContainer';
import { ModalPlate } from '../core/ModalPlate';

interface IDishCardModalProps {
  isVisible: boolean;
  dish: IDish;

  canLike?: boolean;
  disableAddInCartFeature?: boolean;
  onLike?: () => void;
  onDislike?: () => void;
  onCart?: (count: number) => void;
  onHide?: () => void;
}


export const DishCardModal: React.FC<IDishCardModalProps> = ({
  isVisible,
  dish,
  canLike,
  disableAddInCartFeature,
  onLike,
  onDislike,
  onCart,
  onHide,
}) => {
  const [count, setCount] = useState(1);

  return (
    <ModalPlate
      show={isVisible}
      onHide={onHide}
      className="components__dish-card-modal"
    >
      <div className="px-4 py-2 py-md-2 pb-md-4 px-md-5">
        <div className="d-flex flex-column flex-md-row align-items-center align-items-md-stretch">
          <div className="d-flex flex-column align-items-center">
            <ImageContainer
              className="dish-card-modal__image"
              src={dish.imageUrl}
              fallbackSrc={FallbackDishImage}
            />
            <DishLikes
              className="mt-3"
              likes={dish.likes}
              disabled={!canLike}
              onLike={onLike}
              onDislike={onDislike}
            />
          </div>
          <div className="d-flex mt-2 mt-md-0 flex-column flex-grow-1 ml-md-4">
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
                disabled={disableAddInCartFeature}
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
                disabled={disableAddInCartFeature}
                onClick={(): void => onCart?.(count)}
              />
            </div>
          </div>
        </div>
      </div>
    </ModalPlate>
  );
};
