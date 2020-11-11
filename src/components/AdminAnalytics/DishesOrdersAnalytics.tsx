import React from 'react';
import { PieChart, Pie, Cell, PieLabelRenderProps } from 'recharts';
import { IDishOrdersStatistic } from '../../api/analytics';
import { Plate } from '../Plate';
import { ColorDot } from './ColorDot';

interface IDishesOrdersAnalyticsProps {
  dishesOrderStatistic: IDishOrdersStatistic[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export const DishesOrdersAnalytics: React.FC<IDishesOrdersAnalyticsProps> = ({ dishesOrderStatistic }) => {
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
    <Plate className="py-4 px-5 d-flex">
      <div>
        <p className="ro-font-medium-base mb-2">{`Топ ${dishesOrderStatistic.length} блюд`}</p>
        <PieChart width={160} height={160}>
          <Pie
            data={dishesOrderStatistic}
            dataKey="numberOfOrders"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
          >
            {dishesOrderStatistic.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </div>
      <div className="ml-5 d-flex">
        <div>
          <p className="ro-font-medium-base">Блюдо</p>
          {dishesOrderStatistic.map((e, index) => (
            <div key={e.minimalDish.id}>
              <ColorDot
                color={COLORS[index % COLORS.length]}
              />
              <span className="ml-2">{e.minimalDish.name}</span>
            </div>
          ))}
        </div>
        <div className="ml-5">
          <p className="ro-font-medium-base">Количество заказов</p>
          {dishesOrderStatistic.map((e) => (
            <span key={e.minimalDish.id}>{e.numberOfOrders}</span>
          ))}
        </div>
      </div>
    </Plate>
  );
};
