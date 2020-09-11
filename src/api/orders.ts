import { ICartDish } from '../features/CartContainer/types';
import { IDish } from './dishes';
import { AxiosInstance } from '../helpers/axios-instance';

export const OrdersApi = {
  makeOrder: async (dishes: ICartDish[]): Promise<IOrder> => {
    const { data } = await AxiosInstance.post<IOrderWithoutDate & { createdAt: string }>('/orders', {
      entries: dishes,
    });
    return {
      ...data,
      createdAt: new Date(data.createdAt),
    };
  }
};

interface IOrderInfo {
  dish: IDish;
}

interface IOrderWithoutDate {
  id: number;
  orderInfos: IOrderInfo[];
}

export interface IOrder extends IOrderWithoutDate {
  createdAt: Date;
}
