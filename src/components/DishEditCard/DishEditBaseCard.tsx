import React from 'react';
import { IDish, IDishBase } from '../../api/dishes';
import { WithoutId } from '../../types/utils';
import { ModalPlate } from '../core/ModalPlate';
import { DishEditForm } from './DishEditForm';

export interface IDishEditBaseCardProps {
  dish?: IDish;
  show?: boolean;
  isLoading?: boolean;
  onCreate?: (dish: WithoutId<IDishBase>, image?: File) => void;
  onUpdate?: (dish: IDishBase, image?: File) => void;
  onHide?: () => void;
}

export const DishEditBaseCard: React.FC<IDishEditBaseCardProps> = (props) => {
  return (
    <ModalPlate
      title="Редактирование блюда"
      show={props.show}
      onHide={props.onHide}
    >
      <DishEditForm
        dish={props.dish}
        isLoading={props.isLoading}
        onCreate={props.onCreate}
        onUpdate={props.onUpdate}
      />
    </ModalPlate>
  );
};
