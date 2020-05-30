import React from 'react';
import { IDish } from '../../types/menu';
import { Button } from 'react-bootstrap';

interface IMenuDishProps {
  dish: IDish;
  isAdminModeEnabled?: boolean;
  isAddInCartDisabled?: boolean;
  onCart?: (dish: IDish) => void;
  onDelete?: (dish: IDish) => void;
  onEdit?: (dish: IDish) => void;
}

export const MenuDish: React.SFC<IMenuDishProps> = (props) => {
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
        <Button onClick={() => props.onEdit?.(dish)}>Редактировать</Button>
      </React.Fragment>
    );
  };
  
  const { dish } = props;
  return (
    <div className="border rounded p-3 text-center">
      <h4>{dish.name}</h4>
      <div>
        <img src={dish.imageUrl} alt={dish.name} className="w-75" />
      </div>
      <div>
        <span>Б: {dish.protein}, </span>
        <span>Ж: {dish.fat}, </span>
        <span>У: {dish.carbohydrates}</span>
      </div>
      {getUserToolsIfAdminModeDisabled()}
      {getAdminToolsIfAdminModeEnabled()}
    </div>
  );
};