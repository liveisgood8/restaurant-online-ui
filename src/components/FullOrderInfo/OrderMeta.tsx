import React from 'react';
import { IOrderDto, PaymentMethod } from '../../api/orders';
import { bonusify, monetize } from '../../helpers/money';
import { Button } from '../core/Button';
import { Icon } from '../core/icons/Icon';
import { Icons } from '../core/icons/icons';

interface IOrderMetaProps {
  isApproving?: boolean;
  order: IOrderDto;
  onApprove: () => void;
}

const addressToString = (address: IOrderDto['address']) => {
  return `ул. ${address.street}, д. ${address.homeNumber}, п. ${address.entranceNumber}, ` +
    `э. ${address.floorNumber}, кв. ${address.apartmentNumber}`;
};

const paymentMethodToString = (method: PaymentMethod) => {
  switch (method) {
    case PaymentMethod.BY_CASH_TO_THE_COURIER:
      return 'Наличными курьеру';
    case PaymentMethod.BY_CARD_TO_THE_COURIER:
      return 'По карте курьеру';
    case PaymentMethod.BY_CARD_ONLINE:
      return 'По карте онлайн';
  }
};

const getTotalPrice = (order: IOrderDto) => {
  let price = 0;
  order.orderParts.forEach((p) => price += p.sellingPrice * p.count);

  price -= order.spentBonuses || 0;
  if (price < 0) {
    price = 0;
  }

  return price;
};

export const OrderMeta: React.FC<IOrderMetaProps> = ({ isApproving, order, onApprove }) => {
  return (
    <div className="order-meta d-flex flex-column flex-md-row">
      <div>
        <div className="ro-font-regular-big">
          <span>Заказ </span>
          <span className="order-meta__order-id-label">№{order.id}</span>
        </div>
        <div className="mt-2">
          <div>
            <Icon className="order-meta__prop-icon" icon={Icons.PHONE} />
            <span>{order.phone}</span>
          </div>
          <div className="mt-1">
            <Icon className="order-meta__prop-icon" icon={Icons.GEO} />
            <span>{addressToString(order.address)}</span>
          </div>
          <div className="mt-1">
            <Icon className="order-meta__prop-icon" icon={Icons.RECEIPT} />
            <span>{paymentMethodToString(order.paymentMethod)}</span>
          </div>
          <div className="mt-1">
            <span>Итоговая стоимость:</span>
            <span className="ml-1 ro-font-medium-base">{monetize(getTotalPrice(order))}</span>
          </div>
          <div className="mt-1">
            <span>Оплачено бонусами:</span>
            <span className="ml-1 ro-font-medium-base">{bonusify(order.spentBonuses)}</span>
          </div>
        </div>
      </div>
      <Button
        className="flex-grow-1 mt-2 flex-md-grow-0 mt-md-0 ml-md-auto align-self-md-center"
        variant="success"
        disableShadow={true}
        leftIcon={Icons.CHECK}
        onClick={onApprove}
        isLoading={isApproving}
      />
    </div>
  );
};
