import { AxiosInstance } from '../helpers/axios-instance';
import { WithoutId, DeepPartialWithId } from '../types/utils';

export const CategoriesApi = {
  add: async (newCategory: INewCategory, image?: File): Promise<ICategory> => {
    // TODO upload category image

    const response = await AxiosInstance.post('/menu/categories', newCategory);
    return response.data;
  },

  update: async (category: DeepPartialWithId<ICategory>, image?: File): Promise<DeepPartialWithId<ICategory>> => {
    // TODO upload category image

    await AxiosInstance.patch(`/menu/categories/${category.id}`, {
      ...category,
      dishes: undefined,
      imageUrl: undefined,
    });
    return category;
  }
};

export interface ICategory {
  id: number;
  name: string;
  imageUrl?: string;
}

export type INewCategory = Omit<WithoutId<ICategory>, 'imageUrl'>; 
