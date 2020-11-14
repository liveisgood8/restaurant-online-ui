import React, { Fragment, useEffect, useState } from 'react';
import { PieChart, Pie, Cell, PieLabelRenderProps } from 'recharts';
import { IDishOrdersStatistic } from '../../api/analytics';
import { Loading } from '../core/Loading';
import { TextTooltip } from '../core/TextTooltip';
import { Plate } from '../Plate';
import { ColorDot } from './ColorDot';
import { Empty } from './Empty';

interface IDishesOrdersAnalyticsProps {
  topCount: number;
  loading?: boolean;
  dishesOrderStatistic: IDishOrdersStatistic[];
}

function getRandomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

export const DishesOrdersAnalytics: React.FC<IDishesOrdersAnalyticsProps> = ({
  topCount,
  loading,
  dishesOrderStatistic,
}) => {
  const [colorizedStatistic, setColorizedStatistic] = useState<(IDishOrdersStatistic & { color: string })[]>([]);

  useEffect(() => {
    setColorizedStatistic(dishesOrderStatistic.map((statistic) => ({
      ...statistic,
      color: getRandomColor(),
    })));
  }, [dishesOrderStatistic]);

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = (props: PieLabelRenderProps) => {
    const innerRadius = props.innerRadius as number;
    const outerRadius = props.outerRadius as number;
    const midAngle = props.midAngle as number;
    const cx = props.cx as number;
    const cy = props.cy as number;
    const numberOfOrders = props['numberOfOrders'] as number;

    const radius = (innerRadius as number) + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {numberOfOrders}
      </text>
    );
  };

  return (
    <Plate className="py-4 px-3 px-md-5">
      <p className="ro-font-medium-base mb-4">{`Статистика заказов по топ ${topCount} блюдам`}</p>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          {colorizedStatistic.length > 0 ? (
            <div className="d-flex flex-column flex-md-row justify-content-center align-items-center">
              <div>
                <PieChart width={160} height={160}>
                  <Pie
                    animationBegin={0}
                    data={colorizedStatistic}
                    dataKey="ordersCount"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                  >
                    {colorizedStatistic.map((e, index) => (
                      <Cell
                        key={index}
                        fill={e.color}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </div>
              <div className="mt-3 mt-md-0 ml-md-5 d-flex">
                <div className="dish-orders-analytics__dishes-column">
                  <p className="ro-font-medium-base">Блюдо</p>
                  {colorizedStatistic.map((e) => (
                    <TextTooltip key={e.minimalDish.id} placement="bottom" text={e.minimalDish.name}>
                      <div className="dishes-column__label">
                        <ColorDot
                          color={e.color}
                        />
                        <span className="ml-2">{e.minimalDish.name}</span>
                      </div>
                    </TextTooltip>
                  ))}
                </div>
                <div className="ml-2 ml-md-5">
                  <p className="ro-font-medium-base">Количество заказов</p>
                  {dishesOrderStatistic.map((e) => (
                    <span className="d-block" key={e.minimalDish.id}>{e.ordersCount}</span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <Empty />
          )}
        </Fragment>
      )}
    </Plate>
  );
};
