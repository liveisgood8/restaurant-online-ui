import React from 'react';
import { IOrderWithBonuses } from '../../../api/orders';
import { CenteredContainer } from '../../../components/core/CenteredContainer';
import { Link } from 'react-router-dom';
import { RoutePath } from '../../../routes/paths';

interface IOrderInfoProps {
  orderWithBonuses: IOrderWithBonuses;
}

export const OrderConfirmation: React.FC<IOrderInfoProps> = ({ orderWithBonuses }) => {
  const order = orderWithBonuses.order;
  const bonuses = orderWithBonuses.bonuses;

  return (
    <CenteredContainer centerVertically className="text-center">
      <div>
        <span className="h3 font-weight-bold">Ваш заказ</span>
        <span className="h3 font-weight-light text-primary"> #{order.id} </span>
        <span className="h3 font-weight-bold">успешно оформлен!</span>
      </div>

      <div className="mt-3">
        <span className="h3 font-weight-bold">Время заказа: </span>
        <span className="h3 font-weight-light text-primary">
          {order.createdAt.getHours() + ':' + order.createdAt.getMinutes()}
        </span>
      </div>

      <div className="mt-3">
        <span className="h3 font-weight-bold">Полученные бонусы: </span>
        <span className="h3 font-weight-light text-primary">
          {bonuses}
        </span>
      </div>

      <div className="mt-5">
        <Link to={RoutePath.HOME}>Вернуться на главную страницу</Link>
      </div>
    </CenteredContainer>
  );
};