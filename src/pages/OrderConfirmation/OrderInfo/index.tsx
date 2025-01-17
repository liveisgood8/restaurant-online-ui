import deliveryImage from './DeliveryImage.png';

import React from 'react';
import { Link } from 'react-router-dom';
import { IOrderDto } from '../../../api/orders';
import { CenteredContainer } from '../../../components/core/CenteredContainer';
import { RoutePath } from '../../../routes/paths';
import { Button } from '../../../components/core/Button';
import { bonusify } from '../../../helpers/money';

interface IOrderInfoProps {
  orderData: IOrderDto;
}

export const OrderInfo: React.FC<IOrderInfoProps> = ({ orderData }) => {
  return (
    <CenteredContainer
      mdColumns={6}
      lgColumns={4}
      centerVertically
      className="text-center d-flex flex-column align-items-center"
    >
      <img className="mb-4 w-100" src={deliveryImage} alt="delivery" />

      <div className="ro-bg-base-element ro-rounded p-4 mb-4">
        <div>
          <span className="ro-font-light-big">Ваш заказ </span>
          <span className="ro-font-medium-big ro-text-primary">#{orderData.id}</span>
          <span className="ro-font-light-big"> {orderData.isApproved ? 'уже в пути' : 'ждет подтверждения'}!</span>
        </div>
        {orderData.createdAt && (
          <div className="mt-4">
            <span className="ro-font-light-big">Вы сделали заказ:</span>
            <span className="ro-font-medium-big ro-text-primary d-block">
              {new Date(orderData.createdAt).toLocaleDateString()}
            </span>
          </div>
        )}
        {orderData.receivedBonuses != null && orderData.receivedBonuses > 0 && (
          <div className="mt-4">
            <span className="ro-font-light-big">Вам начислено бонусов:</span>
            <span className="ro-font-medium-big ro-text-primary d-block">{bonusify(orderData.receivedBonuses)}</span>
          </div>
        )}
      </div>

      <Link to={RoutePath.HOME}>
        <Button
          text="Вернуться в меню"
        />
      </Link>
    </CenteredContainer>
  );
};
