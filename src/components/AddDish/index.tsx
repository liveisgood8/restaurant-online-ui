import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ControlChangeEvent, FormEvent } from '../../types/ui';
import { ImageUploader, IFileWithPreviewUrl } from '../ImageUploader';
import { MenuDish } from '../MenuDish';
import { IDishBaseInfo } from '../../types/menu';

export interface IDishInfoWithFile extends IDishBaseInfo {
  image: File;
}

enum ViewMode {
  ADD,
  EDIT,
  PREVIEW,
}

interface IAddDishProps {
  onAdd: (dish: IDishInfoWithFile) => void;
}

export const AddDish: React.FC<IAddDishProps> = (props) => {
  const [viewMode, setViewMode] = useState(ViewMode.ADD);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [protein, setProtein] = useState<number | null>(null);
  const [fat, setFat] = useState<number | null>(null);
  const [carbohydrates, setCarbohydrates] = useState<number | null>(null);
  const [imageFiles, setImageFiles] = useState<IFileWithPreviewUrl[]>([]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    props.onAdd(getDishInfo());
  };

  const getDishInfo = (): IDishInfoWithFile => {
    return {
      name,
      description,
      protein,
      fat,
      carbohydrates,
      image: imageFiles[0],
    };
  };

  const getAddComponentIfAddMode = () => {
    if (viewMode === ViewMode.ADD) {
      return (
        <div className="text-center p-3">
          <FontAwesomeIcon icon={faPlus} onClick={() => setViewMode(ViewMode.EDIT)} />
          <p>Добавить новое блюдо</p>
        </div>
      );
    }
  };

  const getEditComponentIfEditMode = () => {
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
            required
            initialFiles={imageFiles}
            onDropFiles={(images) => setImageFiles(images)}
          />
          <Button variant="secondary" onClick={() => setViewMode(ViewMode.PREVIEW)}>
            Просмотреть
          </Button>
          <Button type="submit">Добавить</Button>
        </Form>
      );
    }
  };

  const getPreviewComponentIfPreviewMode = () => {
    if (viewMode === ViewMode.PREVIEW) {
      return (
        <React.Fragment>
          <MenuDish
            isAddInCartDisabled
            dish={{
              ...getDishInfo(),
              id: 0,
              imageUrl: imageFiles.length ? imageFiles[0].preview : 'Изображение блюда',
            }}
          />
          <Button variant="secondary" onClick={() => setViewMode(ViewMode.EDIT)}>
            К редактированию
          </Button>
        </React.Fragment>
        
      )
    }
  };

  return (
    <div className="border rounded">
      {getAddComponentIfAddMode()}
      {getEditComponentIfEditMode()}
      {getPreviewComponentIfPreviewMode()}
    </div>
  );
}