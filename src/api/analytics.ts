import { AxiosInstance } from '../helpers/axios-instance';
import { IDish } from './dishes';

class AnalyticsApiClass {
  public async getTopOrderedDishes(topCount: number): Promise<IDishOrdersStatistic[]> {
    const { data } = await AxiosInstance.get<IDishOrdersStatistic[]>(`/analytics/orders?topCount=${topCount}`);
    return data;
  }
}

export interface IDishOrdersStatistic {
  minimalDish: Pick<IDish, 'id' | 'name'>;
  numberOfOrders: number;
}

export const AnalyticsApi = new AnalyticsApiClass();
