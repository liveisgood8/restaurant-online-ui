import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ControlChangeEvent, FormEvent } from '../../types/ui';
import { ImageUploader, IFileWithPreviewUrl } from '../ImageUploader';
import { MenuDish } from '../MenuDish';
import { IDish, INewDishWithFile } from '../../api/dishes';

enum ViewMode {
  ADD,
  EDIT,
}

interface IDishEditorProps {
  onSubmit?: (dish: Omit<INewDishWithFile, 'category'>) => void;
  dish?: IDish;
}

export const DishEditor: React.FC<IDishEditorProps> = (props) => {
  const [viewMode, setViewMode] = useState(props?.dish ? ViewMode.EDIT : ViewMode.ADD);
  const [isPreviewEnabled, setPreviewEnabled] = useState(false);
  const [name, setName] = useState(props?.dish?.name || '');
  const [description, setDescription] = useState(props?.dish?.description || '');
  const [protein, setProtein] = useState<number | null>(props?.dish?.protein || null);
  const [fat, setFat] = useState<number | null>(props?.dish?.fat || null);
  const [carbohydrates, setCarbohydrates] = useState<number | null>(props?.dish?.carbohydrates || null);
  const [imageFiles, setImageFiles] = useState<IFileWithPreviewUrl[]>([]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    props.onSubmit?.(getDishInfo());
    setViewMode(ViewMode.ADD);
  };

  const getDishInfo = (): Omit<INewDishWithFile, 'category'> => {
    return {
      name,
      description,
      protein,
      fat,
      carbohydrates,
      image: imageFiles.length ? imageFiles[0] : undefined,
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
            initialFilesOrImageUrls={props?.dish?.imageUrl || imageFiles}
            onDropFiles={(images) => setImageFiles(images)}
          />
          <Button variant="secondary" onClick={() => setPreviewEnabled(!isPreviewEnabled)}>
            Просмотреть
          </Button>
          <Button type="submit">Добавить</Button>
        </Form>
      );
    }
  };

  const getPreviewComponentIfPreviewMode = () => {
    if (isPreviewEnabled) {
      const imageUrl =  imageFiles.length ? imageFiles[0].preview : 
        props?.dish?.imageUrl ? props.dish.imageUrl : 'Изображение блюда';
      return (
        <React.Fragment>
          <MenuDish
            isAddInCartDisabled
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
    </div>
  );
}