import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { DishEditor } from '../DishEditor';
import { IDish } from '../../api/dishes';

interface IMenuDishProps {
  dish: IDish;
  isAdminModeEnabled?: boolean;
  isAddInCartDisabled?: boolean;
  onCart?: (dish: IDish) => void;
  onDelete?: (dish: IDish) => void;
  onChange?: (dish: IDish, image?: File) => void;
}

export const MenuDish: React.FC<IMenuDishProps> = (props) => {
  const [isEditable, setEditable] = useState(false);
  const [imageHash, setImageHash] = useState(0);

  useEffect(() => {
    setImageHash(Date.now());
  }, [props.dish])

  const getUserToolsIfAdminModeDisabled = () => {
    if (props.isAdminModeEnabled) {
      return;
    }

    return (
      <Button onClick={() => props.onCart?.(dish)} disabled={props.isAddInCartDisabled}>
        В корзину
      </Button>
    )
  };

  const getAdminToolsIfAdminModeEnabled = () => {
    if (!props.isAdminModeEnabled) {
      return;
    }

    return (
      <React.Fragment>
        <Button variant="danger" onClick={() => props.onDelete?.(dish)}>Удалить</Button>
        <Button onClick={() => setEditable(true)}>Редактировать</Button>
      </React.Fragment>
    );
  };

  const { dish } = props;
  return (
    <React.Fragment>
      {isEditable ? (
        <React.Fragment>
          <DishEditor 
            dish={props.dish}
            onSubmit={(dishInfo, image) => {
              props.onChange?.({
                ...props.dish,
                ...dishInfo,
              }, image);
              setEditable(false);
            }}
          />
        </React.Fragment>
      ) : (
      <div className="border rounded p-3 text-center">
        <h4>{dish.name}</h4>
        <div>
          <img src={`${dish.imageUrl}?${imageHash}`} alt={dish.name} className="w-75" />
        </div>
        <div>
          <span>Б: {dish.protein}, </span>
          <span>Ж: {dish.fat}, </span>
          <span>У: {dish.carbohydrates}</span>
        </div>
        {getUserToolsIfAdminModeDisabled()}
        {getAdminToolsIfAdminModeEnabled()}
      </div>
      )}
    </React.Fragment>
  );
};