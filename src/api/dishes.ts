import { apiUrl } from '../config';
import { AxiosInstance } from '../helpers/axios-instance';
import { WithoutId, DeepPartialWithId } from '../types/utils';
import { IImageUploadResponse } from './payloads/general';


export const DishesApi = {
  uploadImage: async (dishId: number, file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file, file.name);

    const { data } = await AxiosInstance.post<IImageUploadResponse>(`/menu/dishes/${dishId}/image`, formData, {
      headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data`,
      },
    });
    return apiUrl + data.imageUrl;
  },

  add: async (newDish: WithoutId<IDishBase>, image?: File): Promise<IDish> => {
    const { data } = await AxiosInstance.post<IDish>('/menu/dishes', newDish);

    let imageUrl;
    if (image) {
      imageUrl = await DishesApi.uploadImage(data.id, image);
    }

    return {
      ...data,
      imageUrl,
    };
  },

  update: async (dish: DeepPartialWithId<IDish>, image?: File): Promise<DeepPartialWithId<IDish>> => {
    let imageUrl = dish.imageUrl;
    if (image) {
      imageUrl = await DishesApi.uploadImage(dish.id, image);
    }

    if (Object.keys(dish).length > 1) {
      await AxiosInstance.patch(`/menu/dishes/${dish.id}`, {
        ...dish,
      });
    }

    return {
      ...dish,
      imageUrl,
    };
  },

  delete: async (dishId: number): Promise<void> => {
    await AxiosInstance.delete(`/menu/dishes/${dishId}`);
  },

  like: async (dishId: number): Promise<void> => {
    await AxiosInstance.post(`/menu/dishes/${dishId}/likes/like`);
  },

  dislike: async (dishId: number): Promise<void> => {
    await AxiosInstance.post(`/menu/dishes/${dishId}/likes/dislike`);
  },
};

export interface IDishBase {
  id: number;
  name: string;
  description: string;
  protein: number | null;
  fat: number | null;
  carbohydrates: number | null;
  imageUrl?: string;
  weight: number;
  price: number;
  category: {
    id: number;
  }
}

export interface IDish extends IDishBase {
  likes: IDishLikes;
}

export interface IDishLikes {
  id: number;
  likeCount: number;
  dislikeCount: number;
}
