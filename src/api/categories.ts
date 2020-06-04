import { AxiosInstance } from '../helpers/axios-instance';
import { WithoutId } from '../types/utils';

export const CategoriesApi = {
  add: async (category: INewCategoryWithFile): Promise<ICategory> => {
    // TODO upload category image

    delete category.image;

    const newCategory: INewCategory = { ...category };

    const response = await AxiosInstance.post('/menu/categories', newCategory);
    return response.data;
  },
};

export interface ICategory {
  id: number;
  name: string;
  imageUrl?: string;
}

type INewCategory = WithoutId<ICategory>; 

export interface INewCategoryWithFile extends Omit<WithoutId<ICategory>, 'imageUrl'> {
  image?: File;
}
