import { AxiosInstance } from '../helpers/axios-instance';
import { WithoutId, DeepPartialWithId } from '../types/utils';


export const DishesApi = {
  uploadImage: async (dishId: number, file: File): Promise<string> => {
    const data = new FormData();
    data.append('file', file, file.name);

    const response = await AxiosInstance.post(`/menu/dishes/${dishId}/image`, data, {
      headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data`,
      }
    })
    return response.data;
  },

  add: async (newDish: INewDish, image?: File): Promise<IDish> => {
    const response = await AxiosInstance.post('/menu/dishes', newDish);

    const addedDish: IDish = response.data;

    if (image) {
      await DishesApi.uploadImage(addedDish.id, image);
    }

    return response.data;
  },

  update: async (dish: DeepPartialWithId<IDish>, image?: File): Promise<DeepPartialWithId<IDish>> => {
    let imageUrl;
    if (image) {
      imageUrl = await DishesApi.uploadImage(dish.id, image);
    }

    if (imageUrl) {
      dish.imageUrl = imageUrl;
    }

    await AxiosInstance.patch(`/menu/dishes/${dish.id}`, {
      ...dish,
      imageUrl: undefined,
    });
    return dish;
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

export type INewDish = WithoutId<IDishWithCategory>;
