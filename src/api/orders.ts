import { AxiosInstance } from '../helpers/axios-instance';
import { relativeUrlToAbsolute } from '../helpers/utils';
import { IDish } from './dishes';
import { MsSinceEpoch } from './types';

export const OrdersApi = {
  getAll: async (isApproved?: boolean): Promise<IOrderDto[]> => {
    const { data } = await AxiosInstance.get<IOrderDto[]>('/orders', {
      params: {
        isApproved,
      },
    });
    return data;
  },

  get: async (id: number): Promise<IOrderDto> => {
    const { data } = await AxiosInstance.get<IOrderDto>(`/orders/${id}`);
    return {
      ...data,
      orderParts: data.orderParts.map((p) => ({
        ...p,
        dish: {
          ...p.dish,
          imageUrl: p.dish.imageUrl ? relativeUrlToAbsolute(p.dish.imageUrl) : undefined,
        },
      })),
    };
  },

  makeOrder: async (makeOrderRequest: IMakeOrderDto): Promise<IOrderDto> => {
    const { data } = await AxiosInstance.post<IOrderDto>('/orders', makeOrderRequest);
    return data;
  },

  approveOrder: async (id: number): Promise<void> => {
    return AxiosInstance.post(`/orders/${id}/approve`);
  },
};

export interface IBaseOrderDto {
  paymentMethod: PaymentMethod;
  phone: string;
  spentBonuses?: number;
  address: {
    street: string;
    homeNumber: number;
    entranceNumber: number;
    floorNumber: number;
    apartmentNumber: number;
  },
}

export interface IMakeOrderDto extends IBaseOrderDto {
  orderParts: {
    dishId: number;
    count: number;
  }[];
}

export interface IOrderDto extends IBaseOrderDto {
  id: number;
  receivedBonuses?: number;
  isApproved?: boolean;
  orderParts: {
    dish: IDish;
    count: number;
    totalPrice: number;
  }[];
  createdAt?: MsSinceEpoch;
}

export enum PaymentMethod {
  BY_CASH_TO_THE_COURIER = 'BY_CASH_TO_THE_COURIER',
  BY_CARD_TO_THE_COURIER = 'BY_CARD_TO_THE_COURIER',
  BY_CARD_ONLINE = 'BY_CARD_ONLINE',
}
