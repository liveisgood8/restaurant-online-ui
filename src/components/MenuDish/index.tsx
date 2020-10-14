import './styles.scss';
import FallbackDishImage from './fallback.png';

import React from 'react';
import { IDish } from '../../api/dishes';
import { DishLikes } from './DishLikes';
import { DishAttributeLabel } from './DishAttributeLabel';
import { Button } from '../core/Button';
import EditIcon from '../core/icons/EditIcon';
import TrashIcon from '../core/icons/TrashIcon';
import { ImageContainer } from '../core/ImageContainer';

interface IMenuDishProps {
  dish: IDish;
  canLike?: boolean;
  onLike?: () => void;
  onDislike?: () => void;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const MenuDish: React.FC<IMenuDishProps> = (props) => {
  const { dish } = props;

  return (
    <div
      className="component__dish ro-basic-shadow-hover p-2"
    >
      <DishLikes
        className="ml-auto mr-2"
        likes={dish.likes}
        disabled={!props.canLike}
        onLike={props.onLike}
        onDislike={props.onDislike}
      />
      <div className="d-flex flex-column cursor-pointer" onClick={props.onClick}>
        <ImageContainer
          className="d-block my-2 align-self-center dish__image"
          src={dish.imageUrl}
          fallbackSrc={FallbackDishImage}
        />
        <div className="mx-2">
          <div className="d-flex align-items-center">
            <span className="ro-font-light-small">{dish.name}</span>
            <DishAttributeLabel className="ml-2" label={`${dish.weight} г`} />
          </div>
          <span className="ro-font-regular-small">{dish.price}₽</span>
        </div>
      </div>
      {(props.onEdit || props.onDelete) && (
        <div className="d-flex justify-content-end">
          {props.onEdit && (
            <Button
              onClick={props.onEdit}
              className="ro-vector-fill-white"
              variant="success"
              disableShadow
              rightIcon={EditIcon}
            />
          )}
          {props.onDelete && (
            <Button
              onClick={props.onDelete}
              className="ml-2 ro-vector-fill-white"
              variant="danger"
              disableShadow
              rightIcon={TrashIcon}
            />
          )}
        </div>
      )}
    </div>
  );
};
