import { IDish } from './dishes';
import { AxiosInstance } from '../helpers/axios-instance';

export const OrdersApi = {
  makeOrder: async (makeOrderRequest: IMakeOrderRequest): Promise<IOrderWithBonuses> => {
    const { data } = await AxiosInstance.post<IOrderWithBonuses>('/orders', makeOrderRequest);
    return {
      ...data,
      order: {
        ...data.order,
        createdAt: new Date(data.order.createdAt),
      },
    };
  },
};

interface IMakeOrderRequest {
  street: string;
  homeNumber: number;
  entranceNumber: number;
  floorNumber: number;
  apartmentNumber: number;
  paymentMethod: PaymentMethod;
  entries: {
    dish: IDish;
    count: number;
  }[];
}

interface IOrderInfo {
  dish: IDish;
}

export interface IOrder {
  id: number;
  isApproved: boolean;
  createdAt: Date;
  orderInfos: IOrderInfo[];
}

export interface IOrderWithBonuses {
  order: IOrder;
  bonuses: number;
}

export enum PaymentMethod {
  BY_CASH_TO_THE_COURIER = 0,
  BY_CARD_TO_THE_COURIER = 1,
  BY_CARD_ONLINE = 2,
}
