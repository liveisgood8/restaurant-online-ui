import React from 'react';
import { ModalPlate } from '../core/ModalPlate';
import { DishEditForm, IDishEditFormProps } from './DishEditForm';

export interface IDishEditBaseCardProps extends IDishEditFormProps {
  show?: boolean;
  onHide?: () => void;
}

export const DishEditBaseCard: React.FC<IDishEditBaseCardProps> = (props) => {
  return (
    <ModalPlate
      title={(props.dish ? 'Редактирование' : 'Добавление') + ' блюда'}
      show={props.show}
      onHide={props.onHide}
    >
      <DishEditForm
        dish={props.dish}
        categoryId={props.categoryId}
        isLoading={props.isLoading}
        onCreate={props.onCreate}
        onUpdate={props.onUpdate}
      />
    </ModalPlate>
  );
};
