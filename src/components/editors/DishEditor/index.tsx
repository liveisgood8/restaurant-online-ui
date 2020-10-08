import React, { Fragment, useState } from 'react';
import { MenuDish } from '../../MenuDish';
import { IDish } from '../../../api/dishes';
import { DishCardModal } from '../../DishCardModal';
import { DeepPartialWithId } from '../../../types/utils';

interface IDishEditorProps {
  dish: IDish;
  isUpdating?: boolean;
  onDelete?: (dish: IDish) => Promise<boolean>;
  onUpdate?: (dish: DeepPartialWithId<IDish>, image?: File) => void;
}

export const DishEditor: React.FC<IDishEditorProps> = (props) => {
  const [isCardVisible, setCardVisible] = useState(false);

  return (
    <Fragment>
      <DishCardModal
        dish={props.dish}
        editableMode
        isVisible={isCardVisible}
        onHide={() => setCardVisible(false)}
        onUpdate={props.onUpdate}
      />
      <MenuDish
        dish={props.dish}
        preventDefaultClick
        onClick={() => setCardVisible(true)}
      />
    </Fragment>

  );
};
