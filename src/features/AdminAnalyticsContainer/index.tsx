import React, { Fragment } from 'react';
import { useQuery } from 'react-query';
import { AnalyticsApi } from '../../api/analytics';
import { AdminAnalytics } from '../../components/AdminAnalytics';
import { handleError } from '../../errors/handler';

const topCount = 5;

export const AdminAnalyticsContainer: React.FC = () => {
  const {
    isLoading: dishesOrdersLoading,
    data: dishOrders,
  } = useQuery('analytics/dish-orders', () => {
    return AnalyticsApi.getDishOrdersAnalytics(topCount);
  }, {
    onError: (err) => handleError(err as Error, 'Упс, не удалось загрузить аналитику блюд по заказам'),
  });

  const {
    isLoading: dishesEmotionsLoading,
    data: dishEmotions,
  } = useQuery('analytics/dish-emotions', () => {
    return AnalyticsApi.getDishEmotionsAnalytics(topCount);
  }, {
    onError: (err) => handleError(err as Error, 'Упс, не удалось загрузить аналитику блюд по лайкам'),
  });

  return (
    <Fragment>
      <AdminAnalytics
        topCount={topCount}
        dishesOrderStatisticLoading={dishesOrdersLoading}
        dishesEmotionsStatisticLoading={dishesEmotionsLoading}
        dishesOrderStatistic={dishOrders || []}
        dishesEmotionsStatistic={dishEmotions || []}
      />
    </Fragment>
  );
};
