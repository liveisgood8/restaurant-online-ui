import React from 'react';
import { IOrderDto } from '../../../api/orders';
import { Button } from '../../../components/core/Button';

interface INonApprovedOrderProps {
  order: IOrderDto;
  onApprove: () => void;
}

export const NonApprovedOrder: React.FC<INonApprovedOrderProps> = ({ order, onApprove }) => {
  return (
    <div>
      <span>{order.id}</span>
      <Button
        text="Подтвердить"
        variant="success"
        onClick={onApprove}
      />
    </div>
  );
};
