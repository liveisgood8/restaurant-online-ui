import './styles.scss';

import React, { Fragment, useState } from 'react';
import { IDish } from '../../api/dishes';
import { DishLikes } from './DishLikes';
import { DishAttributeLabel } from './DishAttributeLabel';
import { DishCardModal } from './DishCardModal';

interface IMenuDishProps {
  dish: IDish;
  canLike?: boolean;
  onCart?: (dish: IDish, count: number) => void;
  onLike?: (dish: IDish) => void;
  onDislike?: (dish: IDish) => void;
  preventDefaultClick?: boolean;
  onClick?: () => void;
}

export const MenuDish: React.FC<IMenuDishProps> = (props) => {
  const [isDishCardModalVisible, setDishCardModalVisible] = useState(false);

  const onDishClick = () => {
    if (!props.preventDefaultClick) {
      setDishCardModalVisible(true);
    }
    props.onClick?.();
  };

  const { dish } = props;
  return (
    <Fragment>
      <DishCardModal
        isVisible={isDishCardModalVisible}
        dish={dish}
        onHide={(): void => setDishCardModalVisible(false)}
        canLike={props.canLike}
        onLike={(): void => props.onLike?.(dish)}
        onDislike={(): void => props.onDislike?.(dish)}
        onCart={(count: number) => {
          setDishCardModalVisible(false);
          props.onCart?.(dish, count);
        }}
      />
      <div
        className="component__dish ro-basic-shadow-hover p-2"
      >
        <DishLikes
          className="ml-auto mr-2"
          likes={dish.likes}
          disabled={!props.canLike}
          onLike={(): void => props.onLike?.(dish)}
          onDislike={(): void => props.onDislike?.(dish)}
        />
        <div className="d-flex flex-column cursor-pointer" onClick={onDishClick}>
          <img className="d-block my-2 align-self-center" src={dish.imageUrl} alt={dish.name} />
          <div className="mx-2">
            <div className="d-flex align-items-center">
              <span className="ro-font-light-small">{dish.name}</span>
              <DishAttributeLabel className="ml-2" label={`${dish.weight} г`} />
            </div>
            <span className="ro-font-regular-small">{dish.price}₽</span>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
