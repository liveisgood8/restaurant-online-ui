import React from 'react';
import { ICategory } from '../../api/categories';
import { WithoutId } from '../../types/utils';
import { ModalPlate } from '../core/ModalPlate';
import { CategoryEditForm } from './CategoryEditForm';

export interface ICategoryEditBaseCardProps {
  category?: ICategory;
  show?: boolean;
  isLoading?: boolean;
  onCreate?: (category: WithoutId<ICategory>, image?: File) => void;
  onUpdate?: (category: ICategory, image?: File) => void;
  onHide?: () => void;
}

export const CategoryEditBaseCard: React.FC<ICategoryEditBaseCardProps> = (props) => {
  return (
    <ModalPlate
      title="Редактирование категории"
      show={props.show}
      onHide={props.onHide}
    >
      <CategoryEditForm
        category={props.category}
        isLoading={props.isLoading}
        onCreate={props.onCreate}
        onUpdate={props.onUpdate}
      />
    </ModalPlate>
  );
};
