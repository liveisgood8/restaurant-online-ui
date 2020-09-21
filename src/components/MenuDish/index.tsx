import './styles.scss';

import React, { Fragment, useState } from 'react';
import { IDish } from '../../api/dishes';
import { DishLikes } from './DishLikes';
import { DishAttributeLabel } from './DishAttributeLabel';
import { DishCardModal } from './DishCardModal';

interface IMenuDishProps {
  dish: IDish;
  canLike?: boolean;
  onCart?: (dish: IDish) => void;
  onLike?: (dish: IDish) => void;
  onDislike?: (dish: IDish) => void;
}

export const MenuDish: React.FC<IMenuDishProps> = (props) => {
  const [isDishCardModalVisible, setDishCardModalVisible] = useState(false);

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
      />
      <div
        className="component__dish d-flex flex-column ro-basic-shadow-hover p-2"
        onClick={(): void => setDishCardModalVisible(true)}
      >
        <DishLikes
          className="ml-auto mr-2"
          likes={dish.likes}
          disabled={!props.canLike}
          onLike={(): void => props.onLike?.(dish)}
          onDislike={(): void => props.onDislike?.(dish)}
        />
        <img className="d-block my-2 align-self-center" src={dish.imageUrl} alt={dish.name} />
        <div className="mx-2">
          <div className="d-flex align-items-center">
            <span className="ro-font-light-small">{dish.name}</span>
            <DishAttributeLabel className="ml-2" label={`${dish.weight} г`} />
          </div>
          <span className="ro-font-regular-small">{dish.price}₽</span>
        </div>
      </div>
    </Fragment>
  );
};
