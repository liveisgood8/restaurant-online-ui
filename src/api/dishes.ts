import { AxiosInstance } from '../helpers/axios-instance';
import { IDish, IDishWithCategory } from '../types/menu';

export class DishesApi {
  static async uploadImage(file: File): Promise<string> {
    const data = new FormData();
    data.append('file', file, file.name);

    const response = await AxiosInstance.post('/dishes/upload-image', data, {
      headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data`,
      }
    })
    return response.data;
  }

  static async add(dish: Omit<IDishWithCategory, 'id'>): Promise<IDish> {
    const response = await AxiosInstance.post('/dishes', dish);
    return response.data;
  }
}