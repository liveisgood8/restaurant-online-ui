import { ICartDish } from '../features/CartContainer/types';
import { IDish } from './dishes';
import { AxiosInstance } from '../helpers/axios-instance';

export const OrdersApi = {
  makeOrder: async (dishes: ICartDish[]): Promise<IOrderWithBonuses> => {
    const { data } = await AxiosInstance.post<IOrderWithBonuses>('/orders', {
      entries: dishes,
    });
    return {
      ...data,
      order: {
        ...data.order,
        createdAt: new Date(data.order.createdAt),
      },
    };
  },
};

interface IOrderInfo {
  dish: IDish;
}

export interface IOrder {
  id: number;
  createdAt: Date;
  orderInfos: IOrderInfo[];
}

export interface IOrderWithBonuses {
  order: IOrder;
  bonuses: number;
}

export enum PaymentMethod {
  OFFLINE = 0,
  ONLINE = 1,
}
