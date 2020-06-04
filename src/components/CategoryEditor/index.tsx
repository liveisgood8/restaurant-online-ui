import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ControlChangeEvent, FormEvent } from '../../types/ui';
import { ImageUploader, IFileWithPreviewUrl } from '../ImageUploader';
import { DishCategory } from '../DishCategory';
import { ICategory, INewCategoryWithFile } from '../../api/categories';

enum ViewMode {
  ADD,
  EDIT,
}

interface ICategoryEditorProps {
  onAdd: (category: INewCategoryWithFile) => void;
  category?: ICategory;
}

export const CategoryEditor: React.FC<ICategoryEditorProps> = (props) => {
  const [viewMode, setViewMode] = useState(ViewMode.ADD);
  const [isPreviewEnabled, setPreviewEnabled] = useState(false);
  const [name, setName] = useState(props?.category?.name || '');
  const [imageFiles, setImageFiles] = useState<IFileWithPreviewUrl[]>([]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    props.onAdd(getCategoryInfo());
    
    setViewMode(ViewMode.ADD);
  };

  const getCategoryInfo = (): INewCategoryWithFile => {
    return {
      name,
      image: imageFiles.length ? imageFiles[0] : undefined,
    };
  };

  const getAddComponentIfAddMode = () => {
    if (viewMode === ViewMode.ADD) {
      return (
        <div className="text-center p-3">
          <FontAwesomeIcon icon={faPlus} onClick={() => setViewMode(ViewMode.EDIT)} />
          <p>Добавить новую категорию</p>
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
            placeholder="Наименование категории"
            onChange={(e: ControlChangeEvent) => setName(e.currentTarget.value)}
            value={name}
          />
          <ImageUploader
            initialFilesOrImageUrls={imageFiles}
            onDropFiles={(images) => setImageFiles(images)}
          />
          <Button variant="secondary" onClick={() => setPreviewEnabled(true)}>
            Просмотреть
          </Button>
          <Button type="submit">Добавить</Button>
        </Form>
      );
    }
  };

  const getPreviewComponentIfPreviewMode = () => {
    if (isPreviewEnabled) {
      return (
        <React.Fragment>
          <DishCategory
            name={name}
          />
          <Button variant="secondary" onClick={() => setPreviewEnabled(false)}>
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