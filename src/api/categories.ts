import { AxiosInstance } from '../helpers/axios-instance';
import { WithoutId, DeepPartialWithId } from '../types/utils';

export const CategoriesApi = {
  add: async (newCategory: INewCategory, image?: File): Promise<ICategory> => {
    const { data } = await AxiosInstance.post<ICategory>('/menu/categories', newCategory);
    if (image) {
      await CategoriesApi.uploadImage(data.id, image);
    }
    return data;
  },

  update: async (category: DeepPartialWithId<ICategory>, image?: File): Promise<DeepPartialWithId<ICategory>> => {
    let imageUrl;
    if (image) {
      imageUrl = await CategoriesApi.uploadImage(category.id, image);
    }

    if (imageUrl) {
      category.imageUrl = imageUrl;
    }

    await AxiosInstance.patch(`/menu/categories/${category.id}`, {
      ...category,
      imageUrl,
      dishes: undefined,
    });
    return category;
  },

  uploadImage: async (categoryId: number, file: File): Promise<string> => {
    const data = new FormData();
    data.append('file', file, file.name);

    const response = await AxiosInstance.post(`/menu/categories/${categoryId}/image`, data, {
      headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data`,
      },
    });
    return response.data;
  },

};

export interface ICategory {
  id: number;
  name: string;
  imageUrl?: string;
}

export type INewCategory = Omit<WithoutId<ICategory>, 'imageUrl'>;
