import './styles.scss';

import React from 'react';
import cn from 'classnames';
import { IOrderDto } from '../../api/orders';
import { Button } from '../core/Button';
import { Icon } from '../core/icons/Icon';
import { Icons } from '../core/icons/icons';

interface IShortOrderInfoProps {
  order: IOrderDto;
  isActive?: boolean;
  onExpand?: () => void;
  onCollapse?: () => void;
}

export const ShortOrderInfo: React.FC<IShortOrderInfoProps> = ({ order, isActive, onExpand, onCollapse }) => {
  return (
    <div className={cn('short-order-info d-flex flex-column flex-md-row align-items-center', { 'short-order-info_active': isActive })}>
      <div>
        <div className="ro-font-regular-base">
          <span className="short-order-info__order-label">Заказ </span>
          <span className="short-order-info__order-id-label">№{order.id}</span>
        </div>
        <div className="d-flex align-items-center">
          <Icon className="short-order-info__clock-icon mr-2" icon={Icons.CLOCK} />
          <span className="short-order-info__time-label">{new Date(order.createdAt as number).toLocaleString()}</span>
        </div>
      </div>
      <Button
        className="mt-2 ml-md-auto mt-md-0"
        disableShadow={true}
        rightIcon={isActive ? Icons.DOUBLE_LEFT_ARROW : Icons.DOUBLE_RIGHT_ARROW}
        onClick={() => isActive ? onCollapse?.() : onExpand?.()}
      />
    </div>
  );
};
