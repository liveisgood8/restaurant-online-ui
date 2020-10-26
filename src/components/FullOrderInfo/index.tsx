import './styles.scss';

import React from 'react';
import { IOrderDto } from '../../api/orders';
import { OrderMeta } from './OrderMeta';
import { CartDish } from '../../features/CartContainer/CartDish';
import { IDish } from '../../api/dishes';

interface IFullOrderInfoProps {
  order: IOrderDto;
  isApproving?: boolean;
  onApprove: () => void;
  onDishCountIncrease: (dish: IDish) => void;
  onDishCountDecrease: (dish: IDish) => void;
  onDishRemove: (dish: IDish) => void;
}

export const FullOrderInfo: React.FC<IFullOrderInfoProps> = ({
  order,
  isApproving,
  onApprove,
  onDishCountIncrease,
  onDishCountDecrease,
  onDishRemove,
}) => {
  return (
    <div>
      <OrderMeta
        isApproving={isApproving}
        order={order}
        onApprove={onApprove}
      />
      {order.orderParts.map((part) => (
        <div className="mt-2" key={part.dish.id}>
          <CartDish
            key={part.dish.id}
            dish={part.dish}
            count={part.count}
            onIncrease={() => onDishCountIncrease(part.dish)}
            onDecrease={() => onDishCountDecrease(part.dish)}
            onRemove={() => onDishRemove(part.dish)}
          />
        </div>
      ))}
    </div>
  );
};
