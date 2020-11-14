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

interface IMinimalDish extends Pick<IDish, 'id' | 'name'> {
  categoryId: number;
}

export interface IDishOrdersStatistic {
  minimalDish: IMinimalDish;
  ordersCount: number;
}

export interface IDishEmotionsStatistic {
  minimalDish: IMinimalDish;
  likesCount: number;
  dislikesCount: number;
}

export const AnalyticsApi = new AnalyticsApiClass();
