import React from 'react';
import { IOrder } from '../../../api/orders';
import { CenteredContainer } from '../../../components/core/CenteredContainer';

interface IOrderInfoProps {
  order: IOrder;
}

export const OrderConfirmation: React.SFC<IOrderInfoProps> = ({ order }) => {
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
          {order.createdAt.getHours() + ":" + order.createdAt.getMinutes()}
        </span>
      </div>
    </CenteredContainer>
  )
};