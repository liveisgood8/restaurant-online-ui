import { apiUrl } from '../config';
import { AxiosInstance } from '../helpers/axios-instance';
import { WithoutId, DeepPartialWithId } from '../types/utils';
import { IImageUploadResponse } from './payloads/general';

export const CategoriesApi = {
  add: async (newCategory: WithoutId<ICategory>, image?: File): Promise<ICategory> => {
    const { data } = await AxiosInstance.post<ICategory>('/menu/categories', newCategory);
    if (image) {
      await CategoriesApi.uploadImage(data.id, image);
    }
    return data;
  },

  update: async (category: DeepPartialWithId<ICategory>, image?: File): Promise<DeepPartialWithId<ICategory>> => {
    let imageUrl = category.imageUrl;
    if (image) {
      imageUrl = await CategoriesApi.uploadImage(category.id, image);
    }

    await AxiosInstance.patch(`/menu/categories/${category.id}`, {
      ...category,
      imageUrl,
      dishes: undefined,
    });
    return {
      ...category,
      imageUrl,
    };
  },

  delete: async (id: number): Promise<void> => {
    return AxiosInstance.delete(`/menu/categories/${id}`);
  },

  uploadImage: async (categoryId: number, file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file, file.name);

    const { data } = await AxiosInstance.post<IImageUploadResponse>(`/menu/categories/${categoryId}/image`, formData, {
      headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data`,
      },
    });
    return apiUrl + data.imageUrl;
  },

};

export interface ICategory {
  id: number;
  name: string;
  imageUrl?: string;
}

export type INewCategory = Omit<WithoutId<ICategory>, 'imageUrl'>;
