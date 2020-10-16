import { AxiosInstance } from '../helpers/axios-instance';
import { WithoutId } from '../types/utils';

export const OrdersApi = {
  makeOrder: async (makeOrderRequest: WithoutId<IOrderDto>): Promise<IOrderDto> => {
    const { data } = await AxiosInstance.post<IOrderDto>('/orders', makeOrderRequest);
    return {
      ...data,
      createdAt: new Date(data.createdAt as unknown as number),
    };
  },
};

export interface IOrderDto {
  id: number;
  paymentMethod: PaymentMethod;
  phone: string;
  spentBonuses?: number;
  receivedBonuses?: number;
  isApproved?: boolean;
  orderParts: {
    dishId: number;
    count: number;
  }[];
  address: {
    street: string;
    homeNumber: number;
    entranceNumber: number;
    floorNumber: number;
    apartmentNumber: number;
  },
  createdAt?: Date;
}

export enum PaymentMethod {
  BY_CASH_TO_THE_COURIER = 0,
  BY_CARD_TO_THE_COURIER = 1,
  BY_CARD_ONLINE = 2,
}
