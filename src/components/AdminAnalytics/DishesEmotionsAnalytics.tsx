import React, { Fragment } from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar, Tooltip, ResponsiveContainer } from 'recharts';
import { IDishEmotionsStatistic } from '../../api/analytics';
import { Loading } from '../core/Loading';
import { Plate } from '../Plate';
import { Empty } from './Empty';

interface IDishesEmotionsAnalyticsProps {
  topCount: number;
  loading?: boolean;
  dishesEmotionsStatistic: IDishEmotionsStatistic[];
}

export const DishesEmotionsAnalytics: React.FC<IDishesEmotionsAnalyticsProps> = ({
  topCount,
  loading,
  dishesEmotionsStatistic,
}) => {
  return (
    <Plate className="py-4 px-3 px-md-5 d-flex flex-column">
      <p className="ro-font-medium-base mb-4">{`Статистика лайков по топ ${topCount} блюдам`}</p>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          {dishesEmotionsStatistic.length > 0 ? (
            <ResponsiveContainer width="95%" height={300}>
              <BarChart
                className="align-self-center"
                data={dishesEmotionsStatistic}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="minimalDish.name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar name="Лайки" dataKey="likesCount" fill="#8bc34a" />
                <Bar name="Дизлайки" dataKey="dislikesCount" fill="#f44336" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <Empty />
          )}
        </Fragment>
      )}

    </Plate>
  );
};
