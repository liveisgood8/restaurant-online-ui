import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IOrderDto } from '../../api/orders';
import { RootState } from '../../app/store';
import { approveOrder, getNonApprovedOrders } from './actions';
import { NonApprovedOrder } from './NonApprovedOrder';

export const AdminOrdersApprovalContainer: React.FC = () => {
  const dispatch = useDispatch();
  const nonApprovedOrders = useSelector((state: RootState) => state.adminNonApprovedOrders);

  useEffect(() => {
    dispatch(getNonApprovedOrders());
  }, [dispatch]);

  const handleOrderApprove = (order: IOrderDto): void => {
    dispatch(approveOrder(order.id));
  };

  return (
    <div>
      {nonApprovedOrders.map((o) => (
        <NonApprovedOrder
          key={o.id}
          order={o}
          onApprove={() => handleOrderApprove(o)}
        />
      ))}
    </div>
  );
};
