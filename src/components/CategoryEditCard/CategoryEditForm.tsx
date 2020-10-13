import React, { useEffect, useState } from 'react';
import { ICategory } from '../../api/categories';
import { WithoutId } from '../../types/utils';
import { Button } from '../core/Button';
import { ImageContainer } from '../core/ImageContainer';
import { TextInput } from '../core/TextInput';

interface ICategoryEditFormProps {
  category?: ICategory;
  isLoading?: boolean;
  onCreate?: (category: WithoutId<ICategory>, image?: File) => void;
  onUpdate?: (category: ICategory, image?: File) => void;
}

export const CategoryEditForm: React.FC<ICategoryEditFormProps> = ({
  category,
  isLoading,
  onCreate,
  onUpdate,
}) => {
  const [image, setImage] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [name, setName] = useState<string>();

  useEffect(() => {
    if (category) {
      setImageUrl(category.imageUrl);
      setName(category.name);
    }
  }, [category]);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }

    if (category) {
      fireUpdate();
    } else {
      fireCreate();
    }
  };

  const fireCreate = () => {
    onCreate?.(getCategoryInfo(), image);
  };

  const fireUpdate = () => {
    if (!category) {
      throw new Error('Could not fire category update event, because category not passed as prop');
    }

    onUpdate?.({
      id: category.id,
      ...getCategoryInfo(),
    }, image);
  };

  const getCategoryInfo = (): WithoutId<ICategory> => {
    if (!name) {
      throw new Error('Category name must be filled');
    }

    return {
      name,
    };
  };

  const onUploadImage = (file: File) => {
    setImage(file);
    setImageUrl(URL.createObjectURL(file));
  };

  return (
    <form className="d-flex flex-column p-1 py-2 p-md-4 py-md-2" onSubmit={onFormSubmit}>
      <ImageContainer
        enableUploading
        className="category-editor-card__image align-self-center"
        src={imageUrl}
        alt={name}
        onUpload={onUploadImage}
      />
      <TextInput
        required
        className="mt-2"
        label="Наименование категории"
        placeholder="Введите наименование категории"
        value={name}
        onChange={setName}
      />
      <Button
        type="submit"
        className="align-self-center mt-3"
        variant="success"
        text="Сохранить информацию"
        isLoading={isLoading}
      />
    </form>
  );
};
