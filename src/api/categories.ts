import { AxiosInstance } from '../helpers/axios-instance';
import { relativeUrlToAbsolute } from '../helpers/utils';
import { WithoutId, DeepPartialWithId } from '../types/utils';
import { IImageUploadResponse } from './payloads/general';

export const CategoriesApi = {
  get: async (): Promise<ICategory[]> => {
    const { data } = await AxiosInstance.get<ICategory[]>('/menu/categories');
    return data.map((c) => ({
      ...c,
      imageUrl: c.imageUrl ? relativeUrlToAbsolute(c.imageUrl) : undefined,
    }));
  },

  add: async (newCategory: WithoutId<ICategory>, image?: File): Promise<ICategory> => {
    const { data } = await AxiosInstance.post<ICategory>('/menu/categories', newCategory);

    let imageUrl;
    if (image) {
      imageUrl = await CategoriesApi.uploadImage(data.id, image);
    }

    return {
      ...data,
      imageUrl,
    };
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
    return relativeUrlToAbsolute(data.imageUrl);
  },

};

export interface ICategory {
  id: number;
  name: string;
  imageUrl?: string;
}

export type INewCategory = Omit<WithoutId<ICategory>, 'imageUrl'>;
