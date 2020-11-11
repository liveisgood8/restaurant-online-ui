import './styles.scss';

import React from 'react';
import { IDishOrdersStatistic } from '../../api/analytics';
import { DishesOrdersAnalytics } from './DishesOrdersAnalytics';

interface IAdminAnalyticsProps {
  dishesOrderStatistic: IDishOrdersStatistic[];
}

export const AdminAnalytics: React.FC<IAdminAnalyticsProps> = (props) => {
  return (
    <div>
      <DishesOrdersAnalytics
        dishesOrderStatistic={props.dishesOrderStatistic}
      />
    </div>
  );
};
