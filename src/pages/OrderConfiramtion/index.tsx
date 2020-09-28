import React, { useState } from 'react';
import { IOrderWithBonuses } from '../../api/orders';
import { OrderForm } from './OrderForm';

export const OrderConfirmationPage: React.FC = () => {
  const [orderWithBonuses, setOrderWithBonuses] = useState<IOrderWithBonuses>();

  // TODO Отправка информации о заказе на сервер
  return (
    <OrderForm
      onSubmit={console.log}
    />
  );
};
