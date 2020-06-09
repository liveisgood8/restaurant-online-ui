import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { faPlus, faEdit, faStreetView, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ControlChangeEvent, FormEvent } from '../../../types/ui';
import { ImageUploader, IFileWithPreviewUrl } from '../../ImageUploader';
import { MenuDish } from '../../MenuDish';
import { IDish, INewDish } from '../../../api/dishes';
import { ViewMode } from '../types';

interface IDishEditorProps {
  onAdd: (dish: Omit<INewDish, 'category'>, image?: File) => void;
  onDelete?: (dish: IDish) => void;
  onChange?: (dish: IDish, image?: File) => void;
  dish?: IDish;
}

export const DishEditor: React.FC<IDishEditorProps> = (props) => {
  const [viewMode, setViewMode] = useState(props?.dish ? ViewMode.PREVIEW : ViewMode.ADD);
  const [name, setName] = useState(props?.dish?.name || '');
  const [description, setDescription] = useState(props?.dish?.description || '');
  const [protein, setProtein] = useState<number | null>(props?.dish?.protein || null);
  const [fat, setFat] = useState<number | null>(props?.dish?.fat || null);
  const [carbohydrates, setCarbohydrates] = useState<number | null>(props?.dish?.carbohydrates || null);
  const [imageFiles, setImageFiles] = useState<IFileWithPreviewUrl[]>([]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const image = imageFiles.length ? imageFiles[0] : undefined;
    if (props.dish && props.onChange) {
      props.onChange({
        ...props.dish,
        ...getDishInfo(),
      }, image);
    } else {
      props.onAdd(getDishInfo(), image);
      setViewMode(ViewMode.ADD);
    }
  };

  const getDishInfo = (): Omit<INewDish, 'category'> => {
    return {
      name,
      description,
      protein,
      fat,
      carbohydrates,
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
    console.log(props);
    if (viewMode === ViewMode.EDIT) {
      return (
        <Form onSubmit={onSubmit}>
          <Form.Control
            required
            placeholder="Наименование блюда"
            onChange={(e: ControlChangeEvent) => setName(e.currentTarget.value)}
            value={name}
          />
          <Form.Control
            required
            placeholder="Описание блюда"
            onChange={(e: ControlChangeEvent) => setDescription(e.currentTarget.value)}
            value={description}
          />
          <Form.Control
            type="number"
            placeholder="Белки"
            onChange={(e: ControlChangeEvent) => setProtein(+e.currentTarget.value)}
            value={protein || ''}
          />
          <Form.Control
            type="number"
            placeholder="Жиры"
            onChange={(e: ControlChangeEvent) => setFat(+e.currentTarget.value)}
            value={fat || ''}
          />
          <Form.Control
            type="number"
            placeholder="Углеводы"
            onChange={(e: ControlChangeEvent) => setCarbohydrates(+e.currentTarget.value)}
            value={carbohydrates || ''}
          />
          <ImageUploader
            initialFilesOrImageUrls={props?.dish?.imageUrl || imageFiles}
            onDropFiles={(images) => setImageFiles(images)}
          />
          <Button type="submit">
            {props.dish ? 'Применить' : 'Добавить'}
          </Button>
        </Form>
      );
    }
  };

  const getControlPanel = () => {
    return (
      <React.Fragment>
        {viewMode === ViewMode.PREVIEW && (
          <Button onClick={() => setViewMode(ViewMode.EDIT)}>
            <FontAwesomeIcon icon={faEdit} />
          </Button>
        )}
        {viewMode === ViewMode.EDIT && (
          <Button onClick={() => setViewMode(ViewMode.PREVIEW)}>
            <FontAwesomeIcon icon={faStreetView} />
          </Button>
        )}
        {props.dish && (
          <Button variant="danger" onClick={() => props.onDelete?.(props.dish as IDish)}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        )}
      </React.Fragment>
    );
  };

  const getPreviewComponentIfPreviewMode = () => {
    if (viewMode === ViewMode.PREVIEW) {
      const imageUrl = imageFiles.length ? imageFiles[0].preview :
        props?.dish?.imageUrl ? props.dish.imageUrl : 'Изображение блюда';
      return (
        <React.Fragment>
          <MenuDish
            dish={{
              ...getDishInfo(),
              id: 0,
              imageUrl,
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