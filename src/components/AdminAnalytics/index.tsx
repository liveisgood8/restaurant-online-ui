import './styles.scss';

import React from 'react';
import { IDishEmotionsStatistic, IDishOrdersStatistic } from '../../api/analytics';
import { DishesOrdersAnalytics } from './DishesOrdersAnalytics';
import { DishesEmotionsAnalytics } from './DishesEmotionsAnalytics';

interface IAdminAnalyticsProps {
  topCount: number;
  dishesOrderStatisticLoading: boolean;
  dishesEmotionsStatisticLoading: boolean;
  dishesOrderStatistic: IDishOrdersStatistic[];
  dishesEmotionsStatistic: IDishEmotionsStatistic[];
}

export const AdminAnalytics: React.FC<IAdminAnalyticsProps> = (props) => {
  return (
    <div>
      <div>
        <DishesOrdersAnalytics
          topCount={props.topCount}
          loading={props.dishesOrderStatisticLoading}
          dishesOrderStatistic={props.dishesOrderStatistic}
        />
      </div>
      <div className="mt-4">
        <DishesEmotionsAnalytics
          topCount={props.topCount}
          loading={props.dishesEmotionsStatisticLoading}
          dishesEmotionsStatistic={props.dishesEmotionsStatistic}
        />
      </div>
    </div>
  );
};
