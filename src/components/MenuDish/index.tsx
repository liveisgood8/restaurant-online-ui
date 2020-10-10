import './styles.scss';

import React from 'react';
import { IDish } from '../../api/dishes';
import { DishLikes } from './DishLikes';
import { DishAttributeLabel } from './DishAttributeLabel';
import { Button } from '../core/Button';
import { EditIcon } from '../core/icons/EditIcon';

interface IMenuDishProps {
  dish: IDish;
  canLike?: boolean;
  showEditIcon?: boolean;
  onLike?: () => void;
  onDislike?: () => void;
  onClick?: () => void;
  onEdit?: () => void;
}

export const MenuDish: React.FC<IMenuDishProps> = (props) => {
  const { dish } = props;
  return (
    <div
      className="component__dish ro-basic-shadow-hover p-2"
    >
      {props.showEditIcon && (
        <Button
          onClick={props.onEdit}
          className="dish__edit-button ro-vector-fill-white"
          variant="success"
          disableShadow
          rightIcon={EditIcon}
        />
      )}
      <DishLikes
        className="ml-auto mr-2"
        likes={dish.likes}
        disabled={!props.canLike}
        onLike={props.onLike}
        onDislike={props.onDislike}
      />
      <div className="d-flex flex-column cursor-pointer" onClick={props.onClick}>
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
  );
};
