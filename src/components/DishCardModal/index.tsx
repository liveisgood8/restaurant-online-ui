import './styles.scss';

import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { IDish } from '../../api/dishes';
import { DishAttributeLabel } from '../MenuDish/DishAttributeLabel';
import { DishLikes } from '../MenuDish/DishLikes';
import { Button } from '../core/Button';
import { Counter } from '../Counter';
import { EditIcon } from '../core/EditIcon';
import { ImageContainer } from '../core/ImageContainer';
import { SingleTextFieldEditor } from '../core/EditIcon/SingleTextFieldEditor';
import { DeepPartialWithId, WithoutId } from '../../types/utils';

interface IDishCardModalProps {
  isVisible: boolean;
  dish?: IDish | null;

  editableMode?: boolean;
  canLike?: boolean;
  onLike?: () => void;
  onDislike?: () => void;

  isPropertiesUpdating?: boolean;
  isImageUpdating?: boolean;

  onUpdate?: (dish: DeepPartialWithId<IDish>, image?: File) => void;
  onCart?: (count: number) => void;
  onHide: () => void;
}


export const DishCardModal: React.FC<IDishCardModalProps> = ({
  isVisible,
  dish,
  editableMode,
  canLike,
  onLike,
  onDislike,
  isPropertiesUpdating,
  isImageUpdating,
  onUpdate,
  onCart,
  onHide,
}) => {
  const [count, setCount] = useState(1);

  const createStringPropertyEditor = (
    dish: IDish,
    property: keyof WithoutId<IDish>,
  ) => {
    return (
      <SingleTextFieldEditor
        isLoading={isPropertiesUpdating}
        value={dish[property] as string}
        onSubmit={(text: string) => onUpdate?.({
          id: dish.id,
          [property]: text,
        })}
      />
    );
  };

  return (
    <Modal
      enforceFocus={!editableMode}
      show={isVisible}
      centered
      onHide={onHide}
      dialogClassName="components__dish-card-modal"
    >
      {dish && (
        <div className="px-4 py-2 py-md-4 p-md-5">
          <div className="d-flex flex-column flex-md-row align-items-center align-items-md-stretch">
            <div className="mt-2 d-flex flex-column align-items-center">
              <ImageContainer
                className="dish-card-modal__image"
                enableUploading={editableMode}
                isUploading={isImageUpdating}
                onUpload={(image) => onUpdate?.({ id: dish.id }, image)}
                src={dish.imageUrl}
                alt={dish.name}
              />
              <DishLikes
                className="mt-3"
                likes={dish.likes}
                disabled={!canLike}
                onLike={onLike}
                onDislike={onDislike}
              />
            </div>
            <div className="d-flex mt-4 mt-md-0 flex-column flex-grow-1 ml-md-4">
              <div className="mb-3 mb-md-0">
                <div>
                  {editableMode && <EditIcon editorComponent={createStringPropertyEditor(dish, 'name')} />}
                  <span className="ro-font-regular-small">{dish.name}</span>
                </div>
                <div className="d-flex mt-2 flex-wrap">
                  {/* {editableMode && <EditIcon />} */}
                  <DishAttributeLabel className="mr-1" label={`${dish.weight} г`}/>
                  <DishAttributeLabel className="mr-1" label={`100 ккал`}/>
                  {dish.protein && <DishAttributeLabel className="mr-1" label={`б. ${dish.protein}`}/>}
                  {dish.fat && <DishAttributeLabel className="mr-1" label={`ж. ${dish.fat}`}/>}
                  {dish.carbohydrates && <DishAttributeLabel label={`у. ${dish.carbohydrates}`}/>}
                </div>
                <div className="mt-2">
                  {/* {editableMode && <EditIcon />} */}
                  <span className="ro-font-light-small">{dish.description}</span>
                </div>
              </div>
              <div className="mt-auto">
                {/* {editableMode && <EditIcon />} */}
                <span className="ro-font-regular-small">{dish.price}₽</span>
              </div>
              {!editableMode && (
                <div className="mt-3 align-self-end d-flex align-items-center">
                  <Counter
                    style={{ height: '30px' }}
                    value={count}
                    onIncrease={(): void => setCount(count + 1)}
                    onDecrease={(): void => {
                      if (count > 1) {
                        setCount(count - 1);
                      }
                    }}
                  />
                  <Button
                    className="ml-3"
                    text="В корзину"
                    onClick={(): void => onCart?.(count)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};