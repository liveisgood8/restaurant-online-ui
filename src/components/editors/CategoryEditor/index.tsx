import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { faPlus, faEdit, faStreetView, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ImageContainer } from '../../core/ImageContainer';
import { ControlChangeEvent, FormEvent } from '../../../types/ui';
import { IFileWithPreviewUrl } from '../../ImageUploader';
import { ViewMode } from '../types';
import { ICategory, INewCategory } from '../../../api/categories';
import { DishCategory } from '../../DishCategory';

interface ICategoryEditorProps {
  onAdd: (category: INewCategory, image?: File) => void;
  onDelete?: (category: ICategory) => void;
  onChange?: (category: ICategory, image?: File) => void;
  category?: ICategory;
  isSelected?: boolean;
}

export const CategoryEditor: React.FC<ICategoryEditorProps> = (props) => {
  const [viewMode, setViewMode] = useState(props?.category ? ViewMode.PREVIEW : ViewMode.ADD);
  const [name, setName] = useState(props?.category?.name || '');
  const [imageFiles, setImageFiles] = useState<IFileWithPreviewUrl[]>([]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const image = imageFiles.length ? imageFiles[0] : undefined;
    if (props.category) {
      props.onChange?.({
        ...props.category,
        ...getCategoryInfo(),
      }, image);
      setViewMode(ViewMode.PREVIEW);
    } else {
      props.onAdd(getCategoryInfo(), image);
      setViewMode(ViewMode.ADD);
    }
  };

  const getCategoryInfo = (): INewCategory => {
    return {
      name,
    };
  };

  const getAddComponentIfAddMode = () => {
    if (viewMode === ViewMode.ADD) {
      return (
        <div className="text-center p-2 cursor-pointer" onClick={() => setViewMode(ViewMode.EDIT)}>
          <FontAwesomeIcon icon={faPlus} />
          <span className="d-block">Добавить категорию</span>
        </div>
      );
    }
  };

  const getEditComponentIfEditMode = () => {
    if (viewMode === ViewMode.EDIT) {
      return (
        <Form onSubmit={onSubmit} className="p-2">
          <Form.Control
            style={{ fontSize: '0.8rem' }}
            className="mb-3"
            required
            placeholder="Наименование"
            onChange={(e: ControlChangeEvent) => setName(e.currentTarget.value)}
            value={name}
          />
          {/* <ImageUploader
            initialFilesOrImageUrls={props?.category?.imageUrl || imageFiles}
            onDropFiles={(images) => setImageFiles(images)}
          /> */}
          <ImageContainer
            enableUploading
            src={props?.category?.imageUrl}
            onUpload={(file: File): void => {
              // TODO Сделано только для проверки
              if (props.category) {
                props.onChange?.({
                  ...props.category,
                  ...getCategoryInfo(),
                }, file);
              }
            }}
          />
          <Button type="submit" className="w-100 mb-2">
            {props.category ? 'Сохранить' : 'Добавить'}
          </Button>
          <Button
            variant="danger"
            className="w-100"
            onClick={() => setViewMode(props?.category ? ViewMode.PREVIEW : ViewMode.ADD)}
          >
            Отмена
          </Button>
        </Form>
      );
    }
  };

  const getControlPanel = () => {
    return (
      <div className="px-2 mb-2 mt-2">
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
        {viewMode !== ViewMode.ADD && props.category && (
          <Button variant="danger" className="mr-2" onClick={() => props.onDelete?.(props.category as ICategory)}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        )}
      </div>
    );
  };

  const getPreviewComponentIfPreviewMode = () => {
    if (viewMode === ViewMode.PREVIEW) {
      const imageUrl = imageFiles.length ? imageFiles[0].preview :
        props?.category?.imageUrl ? props.category.imageUrl : 'Изображение';
      return (
        <React.Fragment>
          <DishCategory
            category={{
              ...getCategoryInfo(),
              id: props?.category?.id || 0,
              imageUrl,
            }}
            isSelected={props.isSelected}
          />
        </React.Fragment>
      );
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
};
