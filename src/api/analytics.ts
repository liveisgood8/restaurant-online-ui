import { AxiosInstance } from '../helpers/axios-instance';
import { IDish } from './dishes';

class AnalyticsApiClass {
  public async getDishOrdersAnalytics(topCount: number): Promise<IDishOrdersStatistic[]> {
    const { data } = await AxiosInstance.get<IDishOrdersStatistic[]>(`/analytics/dish-orders?topCount=${topCount}`);
    return data;
  }

  public async getDishEmotionsAnalytics(topCount: number): Promise<IDishEmotionsStatistic[]> {
    const { data } = await AxiosInstance.get<IDishEmotionsStatistic[]>(`/analytics/dish-emotions?topCount=${topCount}`);
    return data;
  }
}

export interface IDishOrdersStatistic {
  minimalDish: Pick<IDish, 'id' | 'name'>;
  ordersCount: number;
}

export interface IDishEmotionsStatistic {
  minimalDish: Pick<IDish, 'id' | 'name'>;
  likesCount: number;
  dislikesCount: number;
}

export const AnalyticsApi = new AnalyticsApiClass();
