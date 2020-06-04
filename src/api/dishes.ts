import { AxiosInstance } from '../helpers/axios-instance';
import { WithoutId, DeepPartialWithId } from '../types/utils';


export const DishesApi = {
  uploadImage: async (file: File): Promise<string> => {
    const data = new FormData();
    data.append('file', file, file.name);

    const response = await AxiosInstance.post('/menu/dishes/upload-image', data, {
      headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data`,
      }
    })
    return response.data;
  },

  add: async (newDish: INewDishWithFile): Promise<IDish> => {
    let imageUrl;
    if (newDish.image) {
      imageUrl = await DishesApi.uploadImage(newDish.image);
    }

    delete newDish.image;

    const response = await AxiosInstance.post('/menu/dishes', {
      ...newDish,
      imageUrl,
    });
    return response.data;
  },

  update: async (dish: DeepPartialWithId<IDish & IDishImage>): Promise<DeepPartialWithId<IDish>> => {
    let imageUrl;
    if (dish.image) {
      imageUrl = await DishesApi.uploadImage(dish.image as File);
    }

    delete dish.image;

    const newDish: DeepPartialWithId<IDish> = {
      ...dish,
    };
    if (imageUrl) {
      newDish.imageUrl = imageUrl;
    }

    await AxiosInstance.patch(`/menu/dishes/${dish.id}`, newDish);
    return newDish;
  }
}

export interface IDish {
  id: number;
  name: string;
  description: string;
  protein: number | null;
  fat: number | null;
  carbohydrates: number | null;
  imageUrl?: string;
}

export interface IDishWithCategory extends IDish {
  category: {
    id: number;
  };
}

export interface IDishImage {
  image?: File;
}

type INewDish = WithoutId<IDishWithCategory>;

export interface INewDishWithFile extends Omit<WithoutId<IDishWithCategory>, 'imageUrl'> {
  image?: File;
}
