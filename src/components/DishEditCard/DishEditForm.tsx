import React, { useEffect, useState } from 'react';
import { IDish, IDishBase } from '../../api/dishes';
import { WithoutId } from '../../types/utils';
import { Button } from '../core/Button';
import { ImageContainer } from '../core/ImageContainer';
import { NumberInput } from '../core/NumberInput';
import { TextInput } from '../core/TextInput';
import { TextArea } from '../core/TextInput/TextArea';

interface IDishEditFormProps {
  dish?: IDish;
  isLoading?: boolean;
  onCreate?: (dish: WithoutId<IDishBase>, image?: File) => void;
  onUpdate?: (dish: IDishBase, image?: File) => void;
}

export const DishEditForm: React.FC<IDishEditFormProps> = ({
  dish,
  isLoading,
  onCreate,
  onUpdate,
}) => {
  const [image, setImage] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [weight, setWeight] = useState<number>();
  const [price, setPrice] = useState<number>();
  const [protein, setProtein] = useState<number | null>(null);
  const [fat, setFat] = useState<number| null>(null);
  const [carbohydrates, setCarbohydrates] = useState<number | null>(null);

  useEffect(() => {
    if (dish) {
      setImageUrl(dish.imageUrl);
      setName(dish.name);
      setDescription(dish.description);
      setWeight(dish.weight);
      setPrice(dish.price);
      setProtein(dish.protein);
      setFat(dish.fat);
      setCarbohydrates(dish.carbohydrates);
    }
  }, [dish]);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLoading) {
      return;
    }

    if (dish) {
      fireUpdate();
    } else {
      fireCreate();
    }
  };

  const fireCreate = () => {
    onCreate?.(getDishInfo());
  };

  const fireUpdate = () => {
    if (!dish) {
      throw new Error('Could not fire dish update event, because dish not passed as prop');
    }

    onUpdate?.({
      id: dish.id,
      ...getDishInfo(),
    }, image);
  };

  const getDishInfo = (): WithoutId<Omit<IDish, 'likes'>> => {
    if (!name) {
      throw new Error('Dish name must be filled');
    }
    if (!description) {
      throw new Error('Dish description must be filled');
    }
    if (!weight) {
      throw new Error('Dish weight must be filled');
    }
    if (!price) {
      throw new Error('Dish price must be filled');
    }

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

  const onUploadImage = (file: File) => {
    setImage(file);
    setImageUrl(URL.createObjectURL(file));
  };

  return (
    <form className="d-flex flex-column p-1 py-2 p-md-4 py-md-2" onSubmit={onFormSubmit}>
      <ImageContainer
        enableUploading
        className="dish-editor-card__image align-self-center"
        src={imageUrl}
        alt={name}
        onUpload={onUploadImage}
      />
      <TextInput
        required
        className="mt-2"
        label="Наименование блюда"
        placeholder="Введите наименование блюда"
        value={name}
        onChange={setName}
      />
      <div className="d-flex mt-2">
        <NumberInput
          label="Белки"
          placeholder="Белки"
          value={protein}
          onChange={setProtein}
        />
        <NumberInput
          className="ml-1"
          label="Жиры"
          placeholder="Жиры"
          value={fat}
          onChange={setFat}
        />
        <NumberInput
          className="ml-1"
          label="Углеводы"
          placeholder="Углеводы"
          value={carbohydrates}
          onChange={setCarbohydrates}
        />
      </div>
      <div className="d-flex mt-2">
        <NumberInput
          required
          className="dish-editor-card__weight-input"
          label="Вес"
          placeholder="Вес"
          value={weight}
          onChange={setWeight}
        />
        <NumberInput
          required
          className="ml-1 flex-grow-1"
          label="Цена"
          placeholder="Введите цену"
          value={price}
          onChange={setPrice}
        />
      </div>
      <TextArea
        wrapperClassName="mt-2"
        className="dish-editor-card__description-textarea"
        label="Описание блюда"
        placeholder="Введите описание блюда"
        value={description}
        onChange={setDescription}
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
