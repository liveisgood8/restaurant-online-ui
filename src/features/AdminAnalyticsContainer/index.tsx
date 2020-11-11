import React, { Fragment } from 'react';
import { useQuery } from 'react-query';
import { AnalyticsApi } from '../../api/analytics';
import { AdminAnalytics } from '../../components/AdminAnalytics';

export const AdminAnalyticsContainer: React.FC = () => {
  const { isLoading, error, data } = useQuery('analytics/orders', () =>
    AnalyticsApi.getTopOrderedDishes(5),
  );

  return (
    <Fragment>
      {data && (
        <AdminAnalytics
          dishesOrderStatistic={data}
        />
      )}
    </Fragment>
  );
};
