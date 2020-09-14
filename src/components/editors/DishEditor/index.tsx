import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { faPlus, faEdit, faStreetView, faTrash, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ControlChangeEvent, FormEvent } from '../../../types/ui';
import { ImageUploader, IFileWithPreviewUrl } from '../../ImageUploader';
import { MenuDish } from '../../MenuDish';
import { IDish, INewDish } from '../../../api/dishes';
import { ViewMode } from '../types';
import { loadable } from '../../../helpers/utils';

interface IDishEditorProps {
  onAdd: (dish: Omit<INewDish, 'category' | 'likes'>, image?: File) => void;
  onDelete?: (dish: IDish) => Promise<boolean>;
  onChange?: (dish: IDish, image?: File) => Promise<boolean>;
  dish?: IDish;
}

export const DishEditor: React.FC<IDishEditorProps> = (props) => {
  const [viewMode, setViewMode] = useState(props?.dish ? ViewMode.PREVIEW : ViewMode.ADD);
  const [name, setName] = useState(props?.dish?.name || '');
  const [description, setDescription] = useState(props?.dish?.description || '');
  const [protein, setProtein] = useState<number | null>(props?.dish?.protein || null);
  const [fat, setFat] = useState<number | null>(props?.dish?.fat || null);
  const [carbohydrates, setCarbohydrates] = useState<number | null>(props?.dish?.carbohydrates || null);
  const [weight, setWeight] = useState<number>(props?.dish?.weight || 0);
  const [price, setPrice] = useState<number>(props?.dish?.price || 0);
  const [imageFiles, setImageFiles] = useState<IFileWithPreviewUrl[]>([]);
  const [isUpdated, setUpdated] = useState(false);
  const [isDeleted, setDeleted] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const image = imageFiles.length ? imageFiles[0] : undefined;
    if (props.dish && props.onChange) {
      await loadable(async () => {
        if (props.dish && props.onChange) {
          const isUpdatedSucceed = await props.onChange({
            ...props.dish,
            ...getDishInfo(),
          }, image);
          if (isUpdatedSucceed) {
            setImageFiles([]);
            setViewMode(ViewMode.PREVIEW);
          }
        }
      }, setUpdated);
    } else {
      props.onAdd(getDishInfo(), image);
      setViewMode(ViewMode.ADD);
    }
  };

  const onDelete = async () => {
    if (props.dish && props.onDelete) {
      setDeleted(true);
      const isDeletedSucceed = await props.onDelete?.(props.dish);
      if (!isDeletedSucceed) {
        setDeleted(false);
      }
    }
  };

  const getDishInfo = (): Omit<INewDish, 'category' | 'likes'> => {
    return {
      name,
      description,
      protein,
      fat,
      carbohydrates,
      weight,
      price,
    };
  };

  const getAddComponentIfAddMode = () => {
    if (viewMode === ViewMode.ADD) {
      return (
        <div
          className="text-center p-2 cursor-pointer"
          onClick={() => setViewMode(ViewMode.EDIT)}
        >
          <FontAwesomeIcon icon={faPlus} />
          <span className="d-block">Добавить новое <br /> блюдо</span>
        </div>
      );
    }
  };

  const getEditComponentIfEditMode = () => {
    if (viewMode === ViewMode.EDIT) {
      return (
        <Form onSubmit={onSubmit} className="p-2">
          <Form.Control
            required
            placeholder="Наименование блюда"
            className="mb-2"
            onChange={(e: ControlChangeEvent) => setName(e.currentTarget.value)}
            value={name}
          />
          <Form.Control
            required
            placeholder="Описание блюда"
            className="mb-2"
            onChange={(e: ControlChangeEvent) => setDescription(e.currentTarget.value)}
            value={description}
          />
          <Form.Control
            type="number"
            placeholder="Белки"
            className="mb-2"
            onChange={(e: ControlChangeEvent) => setProtein(+e.currentTarget.value)}
            value={protein || ''}
          />
          <Form.Control
            type="number"
            placeholder="Жиры"
            className="mb-2"
            onChange={(e: ControlChangeEvent) => setFat(+e.currentTarget.value)}
            value={fat || ''}
          />
          <Form.Control
            type="number"
            placeholder="Углеводы"
            className="mb-2"
            onChange={(e: ControlChangeEvent) => setCarbohydrates(+e.currentTarget.value)}
            value={carbohydrates || ''}
          />
          <Form.Control
            required
            type="number"
            placeholder="Вес"
            className="mb-2"
            onChange={(e: ControlChangeEvent) => setWeight(+e.currentTarget.value)}
            value={weight || ''}
          />
          <Form.Control
            required
            type="number"
            placeholder="Цена"
            className="mb-2"
            onChange={(e: ControlChangeEvent) => setPrice(+e.currentTarget.value)}
            value={price || ''}
          />
          <ImageUploader
            initialFilesOrImageUrls={props?.dish?.imageUrl || imageFiles}
            onDropFiles={(images) => setImageFiles(images)}
          />
          <Button type="submit" className="w-100 mb-2" disabled={isUpdated}>
            {props.dish ? 'Применить' : 'Добавить'}
            {isUpdated && (
              <FontAwesomeIcon icon={faSpinner} spin className="ml-2" />
            )}
          </Button>
          <Button
            variant="danger"
            className="w-100"
            onClick={() => setViewMode(props?.dish ? ViewMode.PREVIEW : ViewMode.ADD)}
          >
            Отмена
          </Button>
        </Form>
      );
    }
  };

  const getControlPanel = () => {
    return (
      <div className="my-2 px-2">
        {viewMode === ViewMode.PREVIEW && (
          <Button onClick={() => setViewMode(ViewMode.EDIT)} className="mr-2">
            <FontAwesomeIcon icon={faEdit} />
          </Button>
        )}
        {viewMode === ViewMode.EDIT && (
          <Button onClick={() => setViewMode(ViewMode.PREVIEW)} className="mr-2">
            <FontAwesomeIcon icon={faStreetView} />
          </Button>
        )}
        {props.dish && (
          <Button variant="danger" className="mr-2" onClick={onDelete}>
            {isDeleted ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              <FontAwesomeIcon icon={faTrash} />
            )}
          </Button>
        )}
      </div>
    );
  };

  const getPreviewComponentIfPreviewMode = () => {
    if (viewMode === ViewMode.PREVIEW) {
      const imageUrl = imageFiles.length ? imageFiles[0].preview :
        props?.dish?.imageUrl ? props.dish.imageUrl : 'Изображение блюда';
      const likes = props?.dish?.likes || {
        id: 0,
        likeCount: 0,
        dislikeCount: 0,
      };
      return (
        <React.Fragment>
          <MenuDish
            dish={{
              ...getDishInfo(),
              id: 0,
              imageUrl,
              likes,
            }}
          />
        </React.Fragment>

      )
    }
  };

  return (
    <div className="border rounded">
      {getAddComponentIfAddMode()}
      {getEditComponentIfEditMode()}
      {getPreviewComponentIfPreviewMode()}
      {getControlPanel()}
    </div>
  );
}